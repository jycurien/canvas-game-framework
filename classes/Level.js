import { detectRectCollision } from '../utils/collisionDetection'
import EnemyWave from './EnemyWave'

export default class Level {
  constructor({
    canvas,
    player,
    number,
    background,
    enemyFormations,
    scoreToNextLevel,
  }) {
    this.canvas = canvas
    this.player = player
    this.number = number
    this.background = background
    this.enemyFormations = enemyFormations
    this.scoreToNextLevel = this.player.score + scoreToNextLevel
    this.enemySpawnDelay = 60
    this.enemyWaves = []
    this.over = false
  }

  render(ctx, tick) {
    this.background.render(ctx, tick)
    this.player.render(ctx, tick)
    this.enemyWaves.forEach((enemyWave) => enemyWave.render(ctx, tick))
  }

  update() {
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
            y: Math.random() * 2 + 2,
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

    this.enemyWaves.forEach((enemyWave, enemyWaveIndex) => {
      enemyWave.update()

      enemyWave.enemies.forEach((enemy, enemyIndex) => {
        // Player laser hits enemy
        if (this.player.laserBolts.length > 0 && enemy.deleteTimeout === null) {
          this.player.laserBolts.forEach((laserBolt, laserBoltIndex) => {
            if (detectRectCollision(laserBolt, enemy)) {
              this.player.laserBolts.splice(laserBoltIndex, 1)
              enemy.image = enemy.explosionImage
              enemy.nbFrames = 5
              enemy.deleteTimeout = 20
              this.player.score += enemy.points
            }
          })
        }

        // Player collides with
        if (
          this.player.invicibleTimeout === 0 &&
          this.player.deleteTimeout === null &&
          enemy.deleteTimeout === null &&
          detectRectCollision(this.player, enemy)
        ) {
          enemy.image = enemy.explosionImage
          enemy.nbFrames = 5
          enemy.deleteTimeout = 20
          enemy.laserBolt = null
          this.player.image = this.player.explosionImage
          this.player.nbFrames = 5
          this.player.tickDivider = 2
          this.player.deleteTimeout = 20
          this.player.score += enemy.points
        }

        if (enemy.deleteTimeout !== null && enemy.deleteTimeout === 0) {
          enemy.opacity = 0
          if (enemy.laserBolt === null) {
            enemyWave.enemies.splice(enemyIndex, 1)

            if (this.player.score >= this.scoreToNextLevel) {
              this.over = true
            }
          }
        }

        // Enemy bolt hits player
        if (enemy.laserBolt !== null) {
          if (
            this.player.invicibleTimeout === 0 &&
            this.player.deleteTimeout === null &&
            detectRectCollision(enemy.laserBolt, this.player)
          ) {
            enemy.laserBolt = null
            this.player.image = this.player.explosionImage
            this.player.nbFrames = 5
            this.player.tickDivider = 2
            this.player.deleteTimeout = 20
          }
        }
      })

      if (enemyWave.enemies.length === 0) {
        this.enemyWaves.splice(enemyWaveIndex, 1)
      }
    })
  }
}
