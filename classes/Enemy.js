import EnemyBolt from './EnemyBolt'
import SpriteElement from './SpriteElement'

class Enemy extends SpriteElement {
  constructor({
    canvas,
    image,
    explosionImage,
    boltImage,
    column,
    row,
    size = 'small',
  }) {
    let width = 32
    let height = 32
    let colGap = 10

    if (size === 'medium') {
      width = 64
      colGap = 20
    } else if (size === 'big') {
      width = 50
      height = 58
      colGap = 13
    }

    const position = {
      x: 260 + colGap / 2 + column * (width + colGap),
      y: (size !== 'big' ? 46 : 20) + row * (height + 10),
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
      frameWidth: width,
      frameHeight: height,
      scale: 1,
    })

    this.size = size
    this.explosionImage = explosionImage
    this.boltImage = boltImage
    this.laserBolt = null
  }

  render(tick, tickDivider = 1) {
    super.render(tick, tickDivider)
    this.laserBolt && this.laserBolt.render()
  }

  update() {
    super.update()

    // if (this.getLeft() < 0) {
    //   this.position.x = 0
    // }

    // if (this.getRight() > this.canvas.width) {
    //   this.position.x = this.canvas.width - this.width
    // }

    this.laserBolt && this.laserBolt.update()
  }

  shoot() {
    if (this.laserBolt === null) {
      this.laserBolt = new EnemyBolt({
        canvas: this.canvas,
        image: this.boltImage,
        position: {
          x: this.position.x + this.width / 2,
          y: this.position.y + this.height,
        },
      })
    }
  }
}

export default Enemy
