import { shipImage, explosionShipImage } from '../images/images'
import LaserBolt from './LaserBolt'
import SpriteElement from './SpriteElement'
import playAudio from '../audio/audio'

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
    this.shootSoundSrc = '../assets/audio/laser-shoot.wav'
    this.explosionSoundSrc = '../assets/audio/explosion.wav'
    this.boltBaseDelay = 10
    this.newBoltTimeout = 0
    this.score = 0
    this.lives = 3
    this.maxLifePoints = 1
    this.lifePoints = this.maxLifePoints
    this.invicibleTimeout = 0

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

  render(ctx, tick) {
    this.nbFrames = this.invicibleTimeout > 0 ? 6 : 3
    ctx.rotateDrawing(
      {
        x: this.position.x + this.width / 2,
        y: this.position.y + this.height / 2,
      },
      this.rotation,
      () => {
        if (tick % 3 === 0 && this.deleteTimeout === null) {
          ctx.drawShadow({
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
        super.render(ctx, tick)
      }
    )

    if (this.laserBolts.length > 0) {
      this.laserBolts.forEach((laserBolt) => laserBolt.render(ctx, tick))
    }
  }

  update() {
    if (this.deleteTimeout !== null && this.deleteTimeout === 0) {
      this.opacity = 0
      if (this.lives > 0) {
        this.lives--
        this.reset()
        return
      }
    }

    if (this.lifePoints === 0 && this.deleteTimeout === null) {
      this.image = this.explosionImage
      this.nbFrames = 5
      this.tickDivider = 2
      this.deleteTimeout = 20
      playAudio({ src: this.explosionSoundSrc, volume: 0.01, loop: false })
    }

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

    if (this.newBoltTimeout > 0) {
      this.newBoltTimeout--
    }

    if (this.invicibleTimeout > 0) {
      this.invicibleTimeout--
    }

    this.laserBolts.forEach((laserBolt, index) => {
      laserBolt.update()
      if (laserBolt.getBottom() < 0) {
        this.laserBolts.splice(index, 1)
      }
    })
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
      playAudio({ src: this.shootSoundSrc, volume: 0.01, loop: false })
      this.newBoltTimeout = this.boltBaseDelay
    }
  }

  reset() {
    if (this.lives <= 0) {
      return
    }
    this.lifePoints = this.maxLifePoints
    this.opacity = 1
    this.image = shipImage
    this.nbFrames = 6
    this.tickDivider = 1
    this.position.x = (this.canvas.width - this.width) / 2
    this.position.y = this.canvas.height - this.height - 20
    this.velocity.x = 0
    this.velocity.y = 0
    this.deleteTimeout = null
    this.invicibleTimeout = 120
  }
}
