import RectangularElement from './RectangularElement'

class Paddle extends RectangularElement {
  constructor({ canvas }) {
    const width = 75
    const height = 10

    const position = {
      x: (canvas.width - width) / 2,
      y: canvas.height - height,
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
      fillStyle: '#0095DD',
    })

    this.rightPressed = false
    this.leftPressed = false

    document.addEventListener('keydown', this.keyDownHandler.bind(this), false)
    document.addEventListener('keyup', this.keyUpHandler.bind(this), false)
    document.addEventListener(
      'mousemove',
      this.mouseMoveHandler.bind(this),
      false
    )
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

  mouseMoveHandler(e) {
    const relativeX = e.clientX - this.canvas.offsetLeft
    this.position.x = relativeX - this.width / 2

    if (this.getLeft() < 0) {
      this.position.x = 0
    }

    if (this.getRight() > this.canvas.width) {
      this.position.x = this.canvas.width - this.width
    }
  }

  update() {
    if (this.rightPressed) {
      this.velocity.x = 7
    } else if (this.leftPressed) {
      this.velocity.x = -7
    } else {
      this.velocity.x = 0
    }

    super.update()

    if (this.getLeft() < 0) {
      this.position.x = 0
    }

    if (this.getRight() > this.canvas.width) {
      this.position.x = this.canvas.width - this.width
    }
  }

  reset() {
    this.position.x = (this.canvas.width - this.width) / 2
    this.position.y = this.canvas.height - this.height
    this.velocity.x = 0
    this.velocity.y = 0
  }
}

export default Paddle
