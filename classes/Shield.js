import CircularElement from './CircularElement'

export class Shield extends CircularElement {
  constructor({ canvas, parentElement }) {
    super({
      canvas,
      position: {
        x: parentElement.position.x + parentElement.width / 2,
        y: parentElement.position.y + parentElement.height / 2,
      },
      radius: Math.max(parentElement.width / 2, parentElement.height / 2) + 10,
      fillStyle: 'hsla(240, 100%, 75%, 0.3)',
      lineWidth: '1',
      strokeStyle: 'hsla(240, 100%, 75%, 0.6)',
    })
    this.parentElement = parentElement
    this.lifePoints = 3
  }

  render(ctx, tick) {
    if (tick % (4 - this.lifePoints) === 0) {
      super.render(ctx, tick)
    }
  }

  update() {
    this.position = {
      x: this.parentElement.position.x + this.parentElement.width / 2,
      y: this.parentElement.position.y + this.parentElement.height / 2,
    }
  }
}
