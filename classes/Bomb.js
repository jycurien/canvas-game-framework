import CircularElement from './CircularElement'

export default class Bomb extends CircularElement {
  constructor({ canvas, parentElement }) {
    const radius = 10
    super({
      canvas,
      position: {
        x: parentElement.getLeft() + parentElement.width / 2,
        y: parentElement.getTop(),
      },
      velocity: {
        x: 0,
        y: -6,
      },
      radius,
      fillStyle: 'hsla(50, 100%, 75%, 0.5)',
    })
    this.explodeDelay = 30
  }

  render(ctx, tick) {
    if (tick % 2 === 0) {
      const gradient = ctx.createRadialGradient(
        this.position.x,
        this.position.y,
        0,
        this.position.x,
        this.position.y,
        this.radius
      )
      gradient.addColorStop(0, 'hsla(50, 100%, 75%, 0.5)')
      gradient.addColorStop(1, 'hsla(50, 100%, 75%, 0.9)')
      this.fillStyle = gradient
      super.render(ctx, tick)
    }
  }

  update() {
    if (this.explodeDelay > 0) {
      this.explodeDelay--
    } else {
      this.velocity.y = 0
      this.radius += 4
    }
    super.update()
  }
}
