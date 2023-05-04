import { drawShadow } from '../utils/drawingFunctions'
import EnemyBolt from './EnemyBolt'
import SpriteElement from './SpriteElement'

export default class Enemy extends SpriteElement {
  constructor({ canvas, position, velocity, data }) {
    super({
      canvas,
      position,
      velocity,
      image: data.image,
      nbFrames: 2,
      tickDivider: 4,
      frameWidth: data.width,
      frameHeight: data.height,
      scale: 1,
    })

    this.type = data.type
    this.maxLifePoints = data.maxLifePoints
    this.lifePoints = this.maxLifePoints
    this.explosionImage = data.explosionImage
    this.laserBolt = null
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

    this.laserBolt && this.laserBolt.render(ctx, tick)

    if (this.hit) {
      this.hit = false
      return
    }
    super.render(ctx, tick)
  }

  update() {
    super.update()

    if (this.lifePoints === 0 && this.deleteTimeout === null) {
      this.image = this.explosionImage
      this.nbFrames = 5
      this.deleteTimeout = 20
      this.explosionSound.currentTime = 0
      this.explosionSound.play()
    }

    if (this.laserBolt !== null) {
      this.laserBolt.update()
      if (this.laserBolt.getTop() > this.canvas.height) {
        this.laserBolt = null
      }
    }
  }

  shoot() {
    if (this.laserBolt === null) {
      this.laserBolt = new EnemyBolt({
        canvas: this.canvas,
        position: {
          x: this.position.x + this.width / 2,
          y: this.position.y + this.height,
        },
      })
    }
  }
}
