import { boltImage } from '../images/images'
import SpriteElement from './SpriteElement'

class EnemyBolt extends SpriteElement {
  constructor({ canvas, position }) {
    const scale = 2
    const width = 5

    const velocity = {
      x: 0,
      y: 4,
    }

    const origin = {
      x: 6,
      y: 7,
    }

    position.x -= (width * scale) / 2

    super({
      canvas,
      position,
      velocity,
      image: boltImage,
      nbFrames: 2,
      tickDivider: 2,
      frameWidth: 5,
      frameHeight: 5,
      scale,
      origin,
      offset: 9,
    })
  }
}

export default EnemyBolt
