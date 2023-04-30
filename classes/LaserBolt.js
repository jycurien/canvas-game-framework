import SpriteElement from './SpriteElement'

class LaserBolt extends SpriteElement {
  constructor({ canvas, image, position }) {
    const scale = 2
    const width = 5

    const velocity = {
      x: 0,
      y: -4,
    }

    const origin = {
      x: 6,
      y: 18,
    }

    position.x -= (width * scale) / 2

    super({
      canvas,
      position,
      velocity,
      image,
      nbFrames: 2,
      frameWidth: 5,
      frameHeight: 12,
      scale,
      origin,
      offset: 9,
    })
  }
}

export default LaserBolt
