import { detectRectCollision } from '../utils/collisionDetection'

import Player from './Player'
import EnemyWave from './EnemyWave'
import getLevels from '../levels/getLevels'

class Game {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.over = false
    this.active = true
    this.win = false
    this.stopMain = null
    this.lastFrameTime = 0
    this.tick = 0
    this.score = 0
    this.enemyBoltDelay = Math.floor(Math.random() * 50) + 30
    // this.inactiveTimeout = 30
    this.player = new Player({
      canvas: this.canvas,
    })
    this.enemyWaves = []
    this.enemySpawnDelay = 60
    this.levels = getLevels(canvas)
    this.levelIndex = 0
  }

  main(tFrame) {
    this.render()

    if (!this.active) {
      cancelAnimationFrame(this.stopMain)
      return
    }

    this.update()

    this.tick++

    this.stopMain = requestAnimationFrame(this.main.bind(this))

    // const fps = 1 / ((tFrame - this.lastFrameTime) / 1000)
    // this.lastFrameTime = tFrame
    // console.log(fps)
  }

  render() {
    if (this.over && !this.active) {
      this.drawEndScreen()
      return
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.levels[this.levelIndex].render(this.tick)
    this.player.render(this.tick)
    this.enemyWaves.forEach((enemyWave) => enemyWave.render(this.tick))
    this.drawScore()
  }

  update() {
    // if (this.over) {
    //   this.inactiveTimeout--
    // }

    // if (this.inactiveTimeout <= 0) {
    //   this.active = false
    // }

    this.player.update()
    this.levels[this.levelIndex].update()

    // Background horizontal scroll
    if (
      (this.player.position.x >
        this.levels[this.levelIndex].background.offCanvasWidth / 2 &&
        this.player.velocity.x < 0 &&
        this.levels[this.levelIndex].background.getLeft() <
          this.player.velocity.x) ||
      (this.player.position.x <
        this.canvas.width -
          this.levels[this.levelIndex].background.offCanvasWidth / 2 &&
        this.player.velocity.x > 0 &&
        this.levels[this.levelIndex].background.getRight() > this.canvas.width)
    ) {
      this.levels[this.levelIndex].background.velocity.x =
        -this.player.velocity.x /
        this.levels[this.levelIndex].background.hSpeedScrollDivider
    } else {
      this.levels[this.levelIndex].background.velocity.x = 0
    }

    this.enemyWaves.forEach((enemyWave, enemyWaveIndex) => {
      enemyWave.update()
      enemyWave.enemies.forEach((enemy, enemyIndex) => {
        if (this.player.laserBolts.length > 0 && enemy.deleteTimeout === null) {
          this.player.laserBolts.forEach((laserBolt, laserBoltIndex) => {
            if (detectRectCollision(laserBolt, enemy)) {
              this.player.laserBolts.splice(laserBoltIndex, 1)
              enemy.image = enemy.explosionImage
              enemy.nbFrames = 5
              enemy.deleteTimeout = 20
              this.score += enemy.points
            }
          })
        }

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
          this.score += enemy.points
        }

        if (enemy.deleteTimeout !== null && enemy.deleteTimeout === 0) {
          enemy.opacity = 0
          if (enemy.laserBolt === null) {
            enemyWave.enemies.splice(enemyIndex, 1)
            if (enemyWave.enemies.length === 0) {
              this.levels[this.levelIndex].nbFormationsToNextLevel--
              if (this.levels[this.levelIndex].nbFormationsToNextLevel <= 0) {
                if (this.levelIndex >= this.levels.length - 1) {
                  this.over = true
                  this.active = false
                  this.win = true
                } else {
                  this.levelIndex++
                }
              }
            }
          }
        }

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

    if (this.enemySpawnDelay > 0 && this.enemyWaves.length > 0) {
      this.enemySpawnDelay--
    } else if (!this.over) {
      const formation =
        this.levels[this.levelIndex].enemyFormations[
          Math.floor(
            Math.random() * this.levels[this.levelIndex].enemyFormations.length
          )
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
      this.enemySpawnDelay = Math.floor(Math.random() * 500) + 300
    }

    if (this.player.deleteTimeout !== null && this.player.deleteTimeout === 0) {
      this.player.opacity = 0
      if (this.player.lives > 0) {
        this.player.lives--
        this.player.reset()
      } else {
        this.over = true
        this.active = false
      }
    }
  }

  drawScore() {
    const txt = `Score: ${this.score.toString().padStart(5, '0')}`

    this.ctx.font = '14px Arial'
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7'
    this.ctx.fillText(
      txt,
      this.canvas.width / 2 - this.ctx.measureText(txt).width / 2,
      24
    )
  }

  drawEndScreen() {
    this.ctx.drawRect(0, 0, this.canvas.width, this.canvas.height, '#000')
    this.drawScore()
    const txt = this.win ? 'Congratulations! You Win!' : 'Game Over'
    this.ctx.font = '30px Arial'
    this.ctx.fillStyle = '#fff'
    this.ctx.fillText(
      txt,
      this.canvas.width / 2 - this.ctx.measureText(txt).width / 2,
      this.canvas.height / 2
    )
  }
}

export default Game
