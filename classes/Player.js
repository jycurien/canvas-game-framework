import laserBoltImageSrc from '../assets/img/laser-bolts.png'

import LaserBolt from './LaserBolt'
import SpriteElement from './SpriteElement'

class Player extends SpriteElement {
  constructor({ canvas, image, boltImage }) {
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
      image,
      nbFrames: 3,
      frameWidth: 34,
      frameHeight: 37,
      scale,
    })

    this.rotation = 0
    this.rightPressed = false
    this.leftPressed = false
    this.spacePressed = false
    this.laserBolts = []
    this.laserBoltImage = boltImage
    this.boltBaseDelay = 10
    this.newBoltTimeout = 0

    document.addEventListener('keydown', this.keyDownHandler.bind(this), false)
    document.addEventListener('keyup', this.keyUpHandler.bind(this), false)
  }

  keyDownHandler({ key }) {
    switch (key) {
      case 'ArrowRight':
      case 'Right':
        this.rightPressed = true
        break
      case 'ArrowLeft':
      case 'Left':
        this.leftPressed = true
        break
      case ' ':
        this.spacePressed = true
        break
      default:
        break
    }
  }

  keyUpHandler({ key }) {
    switch (key) {
      case 'ArrowRight':
      case 'Right':
        this.rightPressed = false
        break
      case 'ArrowLeft':
      case 'Left':
        this.leftPressed = false
        break
      case ' ':
        this.spacePressed = false
        break
      default:
        break
    }
  }

  render(tick, tickDivider = 1) {
    this.ctx.rotateDrawing(
      {
        x: this.position.x + this.width / 2,
        y: this.position.y + this.height / 2,
      },
      this.rotation,
      () => super.render(tick, tickDivider)
    )

    if (this.laserBolts.length > 0) {
      this.laserBolts.forEach((laserBolt) => laserBolt.render(tick, 2))
    }
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

    this.spacePressed && this.shoot()

    this.laserBolts.forEach((laserBolt, index) => {
      laserBolt.update()
      if (laserBolt.getTop() < 0) {
        this.laserBolts.splice(index, 1)
      }
    })

    if (this.newBoltTimeout > 0) {
      this.newBoltTimeout--
    }
  }

  shoot() {
    console.log('enemy shoot')
    if (this.newBoltTimeout === 0) {
      this.laserBolts.push(
        new LaserBolt({
          canvas: this.canvas,
          image: this.laserBoltImage,
          position: {
            x: this.position.x + this.width / 2,
            y: this.position.y,
          },
        })
      )
      this.newBoltTimeout = this.boltBaseDelay
    }
  }
}

export default Player
