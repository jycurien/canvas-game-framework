import { detectRectCollision } from '../utils/collisionDetection'
import Player from './Player'
import EnemyWave from './EnemyWave'

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
    this.inactiveTimeout = 30
    this.player = new Player({
      canvas: this.canvas,
    })
    this.enemyWaves = []
    this.enemySpawnDelay = 60
    this.enemyFormations = [
      [
        [null, 'big', 'big', null],
        ['medium', null, 'medium'],
        ['small', 'small', 'small', 'small', 'small', 'small'],
      ],
      [
        [
          'small',
          'small',
          'small',
          'small',
          'small',
          'small',
          'small',
          'small',
        ],
        [
          'small',
          'small',
          'small',
          'small',
          'small',
          'small',
          'small',
          'small',
        ],
      ],
      [
        ['medium', 'medium', 'medium', 'medium', 'medium'],
        ['medium', 'medium', 'medium', 'medium', 'medium'],
      ],
      [['big', 'big', 'big', 'big', 'big']],
    ]
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
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.drawRect(0, 0, this.canvas.width, this.canvas.height, '#000')
    this.player.render(this.tick)
    this.enemyWaves.forEach((enemyWave) => enemyWave.render(this.tick))
  }

  update() {
    if (this.over) {
      this.inactiveTimeout--
    }

    if (this.inactiveTimeout <= 0) {
      this.active = false
    }

    this.player.update()

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
            }
          })
        }

        if (detectRectCollision(this.player, enemy)) {
          enemy.image = enemy.explosionImage
          enemy.nbFrames = 5
          enemy.deleteTimeout = 20
          enemy.laserBolt = null
          this.player.image = this.player.explosionImage
          this.player.nbFrames = 5
          this.player.tickDivider = 2
          this.over = true
        }

        if (enemy.deleteTimeout !== null && enemy.deleteTimeout === 0) {
          enemy.opacity = 0
          if (enemy.laserBolt === null) {
            enemyWave.enemies.splice(enemyIndex, 1)
          }
        }

        if (enemy.laserBolt !== null) {
          if (detectRectCollision(enemy.laserBolt, this.player)) {
            enemy.laserBolt = null
            this.player.image = this.player.explosionImage
            this.player.nbFrames = 5
            this.player.tickDivider = 2
            this.over = true
          }
        }
      })

      if (enemyWave.enemies.length === 0) {
        this.enemyWaves.splice(enemyWaveIndex, 1)
      }
    })
    if (this.enemySpawnDelay > 0 && this.enemyWaves.length > 0) {
      this.enemySpawnDelay--
    } else {
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
            y: Math.random() * 0.3 + 0.7,
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
  }
}

export default Game
