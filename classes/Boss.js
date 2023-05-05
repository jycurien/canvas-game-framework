import Enemy from './Enemy'

export default class Boss extends Enemy {
  constructor({ canvas, position, velocity, data }) {
    super({ canvas, position, velocity, data })
  }

  update() {
    super.update()
    if (this.getLeft() < 0 || this.getRight() > this.canvas.width) {
      this.velocity.x = -this.velocity.x
    }
    if (this.getTop() > 10) {
      this.velocity.y = 0
    }
  }
}
