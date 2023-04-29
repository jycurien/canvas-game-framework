import RectangularElement from './RectangularElement'

class Player extends RectangularElement {
  constructor({ canvas, image }) {
    const scale = 1.2
    const width = 34 * scale
    const height = 37 * scale

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

    this.scale = scale
    this.image = image
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

  render(tick) {
    const frame = tick % 3
    const x = frame * 34

    this.ctx.rotateDrawing(
      {
        x: this.position.x + this.width / 2,
        y: this.position.y + this.height / 2,
      },
      this.rotation,
      () => {
        this.ctx.drawImage(
          this.image,
          x,
          0,
          this.width / this.scale,
          this.height / this.scale,
          this.position.x,
          this.position.y,
          this.width,
          this.height
        )
      }
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
