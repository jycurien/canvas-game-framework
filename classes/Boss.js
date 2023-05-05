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
    if (this.getLeft() < 0 || this.getRight() > this.canvas.width) {
      this.velocity.x = -this.velocity.x
    }
    if (this.getTop() > 10) {
      this.velocity.y = 0
    }
    if (this.deleteTimeout !== null && this.deleteTimeout < 100) {
      this.explosionSound.volume -= 0.0001
      if (this.deleteTimeout === 0) {
        this.explosionSound.pause()
      }
    }
  }
}
