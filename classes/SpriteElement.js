import RectangularElement from './RectangularElement'

class SpriteElement extends RectangularElement {
  constructor({
    canvas,
    position,
    velocity,
    image,
    nbFrames = 1,
    frameWidth,
    frameHeight,
    scale,
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
    this.frameWidth = frameWidth
    this.frameHeight = frameHeight
    this.scale = scale
  }

  render(tick) {
    const frame = tick % this.nbFrames
    const x = frame * this.frameWidth
    this.ctx.drawImage(
      this.image,
      x,
      0,
      this.frameWidth,
      this.frameHeight,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
  }
}

export default SpriteElement
