import SpriteElement from './SpriteElement'

export default class Background extends SpriteElement {
  constructor({ canvas, position, velocity, image, frameWidth, frameHeight }) {
    super({
      canvas,
      position,
      velocity,
      image,
      nbFrames: 1,
      tickDivider: 1,
      frameWidth,
      frameHeight,
      scale: 1,
      origin: {
        x: 0,
        y: 0,
      },
      offset: 0,
    })

    this.hSpeedScrollDivider = 3
    this.offCanvasWidth = this.frameWidth - canvas.width
  }

  render(tick) {
    const positionY = this.position.y
    super.render(tick)
    this.position.y -= this.canvas.height
    super.render(tick)
    this.position.y = positionY
  }

  update() {
    super.update()
    if (this.position.y >= this.canvas.height) {
      this.position.y = 0
    }
  }
}
