import Enemy from './Enemy'
import SpriteElement from './SpriteElement'

export default class Boss extends Enemy {
  constructor({ canvas, position, velocity, data }) {
    super({ canvas, position, velocity, data })
    this.explosionSprite = new SpriteElement({
      canvas: this.canvas,
      position: this.position,
      velocity: this.velocity,
      image: this.explosionImage,
      nbFrames: 5,
      tickDivider: 3,
      frameWidth: this.frameWidth,
      frameHeight: this.frameHeight,
      scale: this.scale,
      origin: this.origin,
      offset: this.offset,
    })
    this.megaBolt = null
    this.megaBoltDelay = Math.floor(Math.random() * 1000) + 100
  }

  render(ctx, tick) {
    super.render(ctx, tick)
    if (this.deleteTimeout !== null && this.deleteTimeout > 0) {
      this.explosionSprite.position = this.position
      this.explosionSprite.render(ctx, tick)
    }
  }

  update() {
    super.update()
    if (
      this.getLeft() < -this.width / 2 ||
      this.getRight() > this.canvas.width + this.width / 2
    ) {
      this.velocity.x = -this.velocity.x
    }
    if (
      this.position.y > this.canvas.height / 2 ||
      (this.velocity.y < 0 && this.getTop() < 10)
    ) {
      this.velocity.y = -this.velocity.y
    }

    if (this.enemyBoltDelay > 0) {
      this.enemyBoltDelay--
    } else if (this.megaBolt === null) {
      this.shoot()
      this.enemyBoltDelay = Math.floor(Math.random() * 20)
    }

    if (this.megaBoltDelay > 0) {
      this.megaBoltDelay--
    } else if (this.boltWave.length === 0) {
      this.shootMegaBolt()
      this.megaBoltDelay = Math.floor(Math.random() * 1000) + 100
    }

    if (this.deleteTimeout !== null && this.deleteTimeout < 100) {
      this.explosionSound.volume -= 0.0001
      if (this.deleteTimeout === 0) {
        this.explosionSound.pause()
      }
    }
  }

  shootMegaBolt() {
    console.log('TODO SHOOT MEGA BOLT')
  }
}
