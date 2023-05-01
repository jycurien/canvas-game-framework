import { shipImage, explosionShipImage } from '../images/images'
import LaserBolt from './LaserBolt'
import SpriteElement from './SpriteElement'
import CircularElement from './CircularElement'

export default class Player extends SpriteElement {
  constructor({ canvas }) {
    const scale = 1
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
      image: shipImage,
      nbFrames: 3,
      tickDivider: 1,
      frameWidth: 34,
      frameHeight: 37,
      scale,
    })

    this.rotation = 0
    this.rightPressed = false
    this.leftPressed = false
    this.upPressed = false
    this.downPressed = false
    this.spacePressed = false
    this.laserBolts = []
    this.explosionImage = explosionShipImage
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
      case 'ArrowUp':
      case 'Up':
        this.upPressed = true
        break
      case 'ArrowDown':
      case 'Down':
        this.downPressed = true
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
      case 'ArrowUp':
      case 'Up':
        this.upPressed = false
        break
      case 'ArrowDown':
      case 'Down':
        this.downPressed = false
        break
      case ' ':
        this.spacePressed = false
        break
      default:
        break
    }
  }

  render(tick) {
    this.ctx.rotateDrawing(
      {
        x: this.position.x + this.width / 2,
        y: this.position.y + this.height / 2,
      },
      this.rotation,
      () => {
        if (tick % 2 === 0) {
          this.ctx.drawShadow({
            element: this,
            offset: {
              x: 0,
              y: 5,
            },
            spread: {
              x: 0,
              y: 0,
            },
            fillStyle: 'rgba(0, 0, 0, 0.2)',
          })
        }

        super.render(tick)
      }
    )

    if (this.laserBolts.length > 0) {
      this.laserBolts.forEach((laserBolt) => laserBolt.render(tick))
    }
  }

  update() {
    if (this.deleteTimeout === null) {
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

      if (this.upPressed) {
        this.velocity.y = -2
      } else if (this.downPressed) {
        this.velocity.y = 2
      } else {
        this.velocity.y = 0
      }
    } else {
      this.velocity.x = 0
      this.velocity.y = 0
    }

    super.update()

    if (this.getLeft() < 0) {
      this.position.x = 0
    }

    if (this.getRight() > this.canvas.width) {
      this.position.x = this.canvas.width - this.width
    }

    if (this.getTop() < 0) {
      this.position.y = 0
    }

    if (this.getBottom() > this.canvas.height) {
      this.position.y = this.canvas.height - this.height
    }

    this.spacePressed && this.shoot()

    this.laserBolts.forEach((laserBolt, index) => {
      laserBolt.update()
      if (laserBolt.getBottom() < 0) {
        this.laserBolts.splice(index, 1)
      }
    })

    if (this.newBoltTimeout > 0) {
      this.newBoltTimeout--
    }
  }

  shoot() {
    if (this.newBoltTimeout === 0) {
      this.laserBolts.push(
        new LaserBolt({
          canvas: this.canvas,
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
