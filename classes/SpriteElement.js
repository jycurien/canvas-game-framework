import RectangularElement from './RectangularElement'

export default class SpriteElement extends RectangularElement {
  constructor({
    canvas,
    position,
    velocity,
    image,
    nbFrames = 1,
    tickDivider = 1,
    frameWidth,
    frameHeight,
    scale,
    origin = {
      x: 0,
      y: 0,
    },
    offset = 0,
  }) {
    super({
      canvas,
      position,
      velocity,
      width: frameWidth * scale,
      height: frameHeight * scale,
    })
    this.image = image
    this.nbFrames = nbFrames
    this.tickDivider = tickDivider
    this.frameWidth = frameWidth
    this.frameHeight = frameHeight
    this.scale = scale
    this.origin = origin
    this.offset = offset
    this.opacity = 1
    this.deleteTimeout = null
  }

  render(tick) {
    const frame = Math.floor(tick / this.tickDivider) % this.nbFrames
    const x = this.origin.x + frame * (this.frameWidth + this.offset)
    this.ctx.save()
    this.ctx.globalAlpha = this.opacity
    this.ctx.drawImage(
      this.image,
      x,
      this.origin.y,
      this.frameWidth,
      this.frameHeight,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
    this.ctx.restore()
  }

  update() {
    super.update()
    if (this.deleteTimeout > 0) {
      this.deleteTimeout--
    }
  }
}
