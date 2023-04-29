import CircularElement from './CircularElement'

class Ball extends CircularElement {
  update() {
    super.update()

    if (this.getTop() < 0) {
      this.velocity.y = -this.velocity.y
    }

    if (this.getRight() > this.canvas.width || this.getLeft() < 0) {
      this.velocity.x = -this.velocity.x
    }
  }
}

export default Ball
