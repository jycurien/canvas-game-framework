import RectangularElement from './RectangularElement'

class Player extends RectangularElement {
  constructor({ canvas }) {
    const width = 60
    const height = 40

    const position = {
      x: (canvas.width - width) / 2,
      y: canvas.height - height - 20,
    }

    const velocity = {
      x: 0,
      y: 0,
    }

    super({
      canvas,
      position,
      velocity,
      width,
      height,
      fillStyle: 'red',
    })

    this.rotation = 0
    this.rightPressed = false
    this.leftPressed = false

    document.addEventListener('keydown', this.keyDownHandler.bind(this), false)
    document.addEventListener('keyup', this.keyUpHandler.bind(this), false)
  }

  keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.rightPressed = true
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.leftPressed = true
    }
  }

  keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.rightPressed = false
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.leftPressed = false
    }
  }

  render() {
    this.ctx.rotateDrawing(
      {
        x: this.position.x + this.width / 2,
        y: this.position.y + this.height / 2,
      },
      this.rotation,
      super.render.bind(this)
    )
  }

  update() {
    if (this.rightPressed) {
      this.velocity.x = 7
      this.rotation = 0.1
    } else if (this.leftPressed) {
      this.velocity.x = -7
      this.rotation = -0.1
    } else {
      this.velocity.x = 0
      this.rotation = 0
    }

    super.update()

    if (this.getLeft() < 0) {
      this.position.x = 0
    }

    if (this.getRight() > this.canvas.width) {
      this.position.x = this.canvas.width - this.width
    }
  }
}

export default Player
