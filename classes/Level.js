import enemyData from '../data/enemyData'
import { detectRectCollision } from '../utils/collisionDetection'
import Boss from './Boss'
import EnemyWave from './EnemyWave'

export default class Level {
  constructor({
    ui,
    canvas,
    player,
    number,
    background,
    enemyFormations,
    scoreToNextLevel,
    bossType,
  }) {
    this.ui = ui
    this.canvas = canvas
    this.player = player
    this.number = number
    this.background = background
    this.enemyFormations = enemyFormations
    this.scoreToNextLevel = this.player.score + scoreToNextLevel
    this.bossType = bossType
    this.enemySpawnDelay = 180
    this.enemyWaves = []
    this.over = false
    this.spawnBossDelay = null
    this.boss = null
    this.startDelay = 120
    this.ui.backgroundColor = 'black'
    this.ui.opacity = 0.8
    this.ui.message = `LEVEL ${this.number}`
  }

  render(ctx, tick) {
    this.background.render(ctx, tick)
    if (this.startDelay > 0) {
      return
    }
    this.player.render(ctx, tick)
    if (this.boss !== null) {
      this.boss.render(ctx, tick)
    }
    this.enemyWaves.forEach((enemyWave) => enemyWave.render(ctx, tick))
  }

  update() {
    if (this.startDelay > 0) {
      this.startDelay--
      if (this.startDelay === 0) {
        this.ui.backgroundColor = 'transparent'
        this.ui.message = ''
      }
      return
    }

    this.player.update()
    this.background.update()

    // Background horizontal scroll
    if (
      (this.player.position.x > this.background.offCanvasWidth / 2 &&
        this.player.velocity.x < 0 &&
        this.background.getLeft() < this.player.velocity.x) ||
      (this.player.position.x <
        this.canvas.width - this.background.offCanvasWidth / 2 &&
        this.player.velocity.x > 0 &&
        this.background.getRight() > this.canvas.width)
    ) {
      this.background.velocity.x =
        -this.player.velocity.x / this.background.hSpeedScrollDivider
    } else {
      this.background.velocity.x = 0
    }

    // Spawn enemies
    if (this.spawnBossDelay === null) {
      if (this.enemySpawnDelay > 0 && this.enemyWaves.length > 0) {
        this.enemySpawnDelay--
      } else if (!this.over) {
        const formation =
          this.enemyFormations[
            Math.floor(Math.random() * this.enemyFormations.length)
          ]
        const x = (Math.random() * this.canvas.width) / 2
        this.enemyWaves.push(
          new EnemyWave({
            canvas: this.canvas,
            position: {
              x: x,
              y: -10,
            },
            velocity: {
              x: Math.random() - 0.5 > 0 ? 3 : -3,
              y: Math.random() * 1.5 + 2,
            },
            formation,
            horizontalBoundaries: {
              left: Math.max(-100, x - (Math.random() * 100 + 100)),
              right: Math.min(
                this.canvas.width + 100,
                x + (Math.random() * 100 + 400)
              ),
            },
          })
        )
        this.enemySpawnDelay = Math.floor(Math.random() * 200) + 200
      }
    } else if (this.spawnBossDelay > 0) {
      this.spawnBossDelay--
      this.ui.message = 'GET READY...'
    } else if (this.boss === null) {
      this.ui.message = ''
      this.background.velocity.y = 0
      // SPAWN BOSS
      const bossData = enemyData[this.bossType]
      this.boss = new Boss({
        canvas: this.canvas,
        position: {
          x: 0,
          y: -200,
        },
        velocity: {
          x: Math.random() - 0.5 > 0 ? 1 : -1,
          y: 1,
        },
        data: bossData,
      })
    }

    if (this.boss !== null) {
      this.boss.update()
      // Player laser hits boss
      if (this.player.laserBolts.length > 0 && this.boss.lifePoints > 0) {
        this.player.laserBolts.forEach((laserBolt, laserBoltIndex) => {
          if (detectRectCollision(laserBolt, this.boss)) {
            this.player.laserBolts.splice(laserBoltIndex, 1)
            this.boss.lifePoints--
            if (this.boss.lifePoints === 0) {
              this.player.score += this.boss.points
            } else {
              this.boss.hit = true
            }
          }
        })
      }

      // Player collides with boss
      if (
        this.player.shield !== null &&
        this.player.shield.lifePoints > 0 &&
        this.player.invicibleTimeout === 0 &&
        this.boss.lifePoints > 0 &&
        detectRectCollision(this.player.shield, this.boss)
      ) {
        this.boss.lifePoints--
        if (this.boss.lifePoints === 0) {
          this.player.score += this.boss.points
        }
        this.player.shield.lifePoints--
      }

      if (
        this.player.invicibleTimeout === 0 &&
        this.player.deleteTimeout === null &&
        this.boss.lifePoints > 0 &&
        this.player.lifePoints > 0 &&
        detectRectCollision(this.player, this.boss)
      ) {
        this.boss.lifePoints--
        if (this.boss.lifePoints === 0) {
          this.player.score += this.boss.points
        }
        this.player.lifePoints--
      }

      // Boss bolt hits player
      if (this.player.invicibleTimeout === 0 && this.boss.boltWave.length > 0) {
        this.boss.boltWave.forEach((bolt, boltIndex) => {
          if (
            this.player.shield !== null &&
            this.player.shield.lifePoints > 0 &&
            detectRectCollision(bolt, this.player.shield)
          ) {
            this.player.shield.lifePoints--
            this.boss.boltWave.splice(boltIndex, 1)
          }

          if (detectRectCollision(bolt, this.player)) {
            this.player.lifePoints--
            this.boss.boltWave.splice(boltIndex, 1)
          }
        })
      }

      if (this.boss.deleteTimeout === 0) {
        this.boss = null
        this.over = true
      }
    }

    this.enemyWaves.forEach((enemyWave, enemyWaveIndex) => {
      enemyWave.update()

      enemyWave.enemies.forEach((enemy, enemyIndex) => {
        // Player laser hits enemy
        if (this.player.laserBolts.length > 0 && enemy.lifePoints > 0) {
          this.player.laserBolts.forEach((laserBolt, laserBoltIndex) => {
            if (detectRectCollision(laserBolt, enemy)) {
              this.player.laserBolts.splice(laserBoltIndex, 1)
              enemy.lifePoints--
              if (enemy.lifePoints === 0) {
                this.player.score += enemy.points
              } else {
                enemy.hit = true
              }
            }
          })
        }

        // Player collides with enemy
        if (
          this.player.shield !== null &&
          this.player.shield.lifePoints > 0 &&
          this.player.invicibleTimeout === 0 &&
          enemy.lifePoints > 0 &&
          detectRectCollision(this.player.shield, enemy)
        ) {
          enemy.lifePoints--
          if (enemy.lifePoints === 0) {
            this.player.score += enemy.points
          }
          enemy.boltWave = []
          this.player.shield.lifePoints--
        }

        if (
          this.player.invicibleTimeout === 0 &&
          this.player.deleteTimeout === null &&
          enemy.lifePoints > 0 &&
          this.player.lifePoints > 0 &&
          detectRectCollision(this.player, enemy)
        ) {
          enemy.lifePoints--
          if (enemy.lifePoints === 0) {
            this.player.score += enemy.points
          }
          enemy.boltWave = []
          this.player.lifePoints--
        }

        if (enemy.deleteTimeout !== null && enemy.deleteTimeout === 0) {
          enemy.opacity = 0
          if (enemy.boltWave.length === 0) {
            enemyWave.enemies.splice(enemyIndex, 1)

            if (this.player.score >= this.scoreToNextLevel) {
              this.spawnBossDelay = 240
            }
          }
        }

        // Enemy bolt hits player
        if (
          enemy.boltWave.length > 0 &&
          this.player.invicibleTimeout === 0 &&
          this.player.deleteTimeout === null &&
          this.player.lifePoints > 0
        ) {
          enemy.boltWave.forEach((bolt, boltIndex) => {
            if (
              this.player.shield !== null &&
              this.player.shield.lifePoints > 0 &&
              detectRectCollision(bolt, this.player.shield)
            ) {
              this.player.shield.lifePoints--
              enemy.boltWave.splice(boltIndex, 1)
            }

            if (detectRectCollision(bolt, this.player)) {
              this.player.lifePoints--
              enemy.boltWave.splice(boltIndex, 1)
            }
          })
        }
      })

      if (enemyWave.enemies.length === 0) {
        this.enemyWaves.splice(enemyWaveIndex, 1)
      }
    })
  }
}
