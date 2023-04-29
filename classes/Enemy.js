import SpriteElement from './SpriteElement'

class Enemy extends SpriteElement {
  constructor({ canvas, image, column, row }) {
    const scale = 1
    const width = 32 * scale
    const height = 32 * scale

    const position = {
      x: 265 + column * (width * scale + 10),
      y: 30 + row * (height * scale + 10),
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
      nbFrames: 2,
      frameWidth: 32,
      frameHeight: 32,
      scale,
    })
  }

  // update() {
  //   if (this.rightPressed) {
  //     this.velocity.x = 7
  //     this.rotation = 0.1
  //   } else if (this.leftPressed) {
  //     this.velocity.x = -7
  //     this.rotation = -0.1
  //   } else {
  //     this.velocity.x = 0
  //     this.rotation = 0
  //   }

  //   super.update()

  //   if (this.getLeft() < 0) {
  //     this.position.x = 0
  //   }

  //   if (this.getRight() > this.canvas.width) {
  //     this.position.x = this.canvas.width - this.width
  //   }
  // }
}

export default Enemy
