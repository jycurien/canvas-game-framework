import { drawShadow } from '../utils/drawingFunctions'
import Boss from './Boss'
import EnemyBolt from './EnemyBolt'
import SpriteElement from './SpriteElement'

export default class Enemy extends SpriteElement {
  constructor({ canvas, position, velocity, data }) {
    super({
      canvas,
      position,
      velocity,
      image: data.image,
      nbFrames: data.nbFrames,
      tickDivider: 4,
      frameWidth: data.width,
      frameHeight: data.height,
      scale: data.scale ?? 1,
    })

    this.type = data.type
    this.maxLifePoints = data.maxLifePoints
    this.lifePoints = this.maxLifePoints
    this.explosionImage = data.explosionImage
    this.boltWave = []
    this.maxBoltWaveLength = data.maxBoltWaveLength ?? 1
    this.boltData = data.boltData ?? null
    this.opacity = 1
    this.points = data.scorePoints
    this.hit = false
    this.explosionSound = new Audio('../assets/audio/explosion.wav')
    this.explosionSound.volume = 0.01
  }

  render(ctx, tick) {
    // Draw shadow
    if (tick % 3 === 0 && this.deleteTimeout === null) {
      let offset = {
        x: 0,
        y: 0,
      }
      if (this.type === 3) {
        offset = {
          x: 0,
          y: 10,
        }
      } else if (this.type === 'boss1') {
        offset = {
          x: 0,
          y: -10,
        }
      }
      drawShadow({
        ctx,
        element: this,
        offset,
        spread: {
          x: 5,
          y: 0,
        },
        fillStyle: 'rgba(0, 0, 0, 0.2)',
      })
    }

    if (this.boltWave.length > 0) {
      this.boltWave.forEach((bolt) => bolt.render(ctx, tick))
    }

    if (this.hit) {
      this.hit = false
      return
    }
    super.render(ctx, tick)
  }

  update() {
    super.update()

    if (this.lifePoints <= 0 && this.deleteTimeout === null) {
      if (this instanceof Boss) {
        this.velocity = {
          x: 0,
          y: 0,
        }
        this.deleteTimeout = 300
        this.explosionSound.loop = true
      } else {
        this.image = this.explosionImage
        this.nbFrames = 5
        this.deleteTimeout = 20
      }
      this.explosionSound.currentTime = 0
      this.explosionSound.play()
    }

    if (this.boltWave.length > 0) {
      this.boltWave.forEach((bolt, index) => {
        bolt.update()
        if (bolt.getTop() > this.canvas.height) {
          this.boltWave.splice(index, 1)
        }
      })
    }
  }

  shoot() {
    if (
      this.boltData !== null &&
      this.boltWave.length < this.maxBoltWaveLength &&
      this.deleteTimeout === null
    ) {
      this.boltData.forEach((boltData) =>
        this.boltWave.push(
          new EnemyBolt({
            canvas: this.canvas,
            position: {
              x: this.position.x + this.width * boltData.positionX,
              y: this.position.y + this.height,
            },
            velocity: {
              x: boltData.velocityX,
              y: 5,
            },
          })
        )
      )
    }
  }
}
