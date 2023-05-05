import { boltImage } from '../images/images'
import SpriteElement from './SpriteElement'

export default class EnemyBolt extends SpriteElement {
  constructor({ canvas, position, velocity }) {
    const scale = 2
    const width = 5

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
