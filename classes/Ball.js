import CircularElement from './CircularElement'

class Ball extends CircularElement {
  constructor({ canvas }) {
    const position = {
      x: canvas.width / 2,
      y: canvas.height - 30,
    }
    const velocity = {
      x: 2,
      y: -2,
    }
    super({
      canvas,
      position,
      velocity,
      radius: 10,
      fillStyle: '#0095DD',
    })
  }

  update() {
    super.update()

    if (this.getTop() < 0) {
      this.velocity.y = -this.velocity.y
    }

    if (this.getRight() > this.canvas.width || this.getLeft() < 0) {
      this.velocity.x = -this.velocity.x
    }
  }

  reset() {
    this.position.x = this.canvas.width / 2
    this.position.y = this.canvas.height - 30
    this.velocity.x = 2
    this.velocity.y = -2
  }
}

export default Ball
