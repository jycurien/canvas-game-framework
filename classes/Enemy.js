import {
  enemyBigImage,
  explosionBigImage,
  enemyMediumImage,
  explosionMediumImage,
  enemySmallImage,
  explosionSmallImage,
} from '../images/images'
import EnemyBolt from './EnemyBolt'
import SpriteElement from './SpriteElement'

class Enemy extends SpriteElement {
  constructor({ canvas, position, velocity, type = 'small' }) {
    let width = 32
    let height = 32
    let image = enemySmallImage
    let explosionImage = explosionSmallImage

    if (type === 'medium') {
      width = 64
      image = enemyMediumImage
      explosionImage = explosionMediumImage
    } else if (type === 'big') {
      width = 50
      height = 58
      image = enemyBigImage
      explosionImage = explosionBigImage
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
    this.explosionImage = explosionImage
    this.laserBolt = null
    this.opacity = 1
  }

  render(tick) {
    this.ctx.save()
    this.ctx.globalAlpha = this.opacity
    super.render(tick)
    this.ctx.restore()

    this.laserBolt && this.laserBolt.render(tick)
  }

  update() {
    super.update()

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

export default Enemy
