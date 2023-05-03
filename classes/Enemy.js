import {
  enemyBigImage,
  explosionBigImage,
  enemyMediumImage,
  explosionMediumImage,
  enemySmallImage,
  explosionSmallImage,
} from '../images/images'
import playAudio from '../audio/audio'
import EnemyBolt from './EnemyBolt'
import SpriteElement from './SpriteElement'

const enemyPoints = {
  small: 10,
  medium: 20,
  big: 30,
}

export default class Enemy extends SpriteElement {
  constructor({ canvas, position, velocity, type = 'small' }) {
    let width = 32
    let height = 32
    let image = enemySmallImage
    let explosionImage = explosionSmallImage
    let maxLifePoints = 1

    if (type === 'medium') {
      width = 64
      image = enemyMediumImage
      explosionImage = explosionMediumImage
      maxLifePoints = 2
    } else if (type === 'big') {
      width = 50
      height = 58
      image = enemyBigImage
      explosionImage = explosionBigImage
      maxLifePoints = 4
    }

    super({
      canvas,
      position,
      velocity,
      image,
      nbFrames: 2,
      tickDivider: 4,
      frameWidth: width,
      frameHeight: height,
      scale: 1,
    })

    this.type = type
    this.maxLifePoints = maxLifePoints
    this.lifePoints = maxLifePoints
    this.explosionImage = explosionImage
    this.laserBolt = null
    this.opacity = 1
    this.points = enemyPoints[type]
    this.hit = false
    this.explosionSoundSrc = '../assets/audio/explosion.wav'
  }

  render(ctx, tick) {
    // Draw shadow
    if (tick % 3 === 0 && this.deleteTimeout === null) {
      let offset = {
        x: 0,
        y: 0,
      }
      if (this.type === 'big') {
        offset = {
          x: 0,
          y: 10,
        }
      }
      ctx.drawShadow({
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
      playAudio({ src: this.explosionSoundSrc, volume: 0.01, loop: false })
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
