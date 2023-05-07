import { bigCanonBoltImage } from '../images/images'
import SpriteElement from './SpriteElement'

export default class BigCanonBolt extends SpriteElement {
  constructor({ canvas, position, velocity }) {
    const scale = 1
    const width = 7

    position.x -= (width * scale) / 2

    super({
      canvas,
      position,
      velocity,
      image: bigCanonBoltImage,
      nbFrames: 3,
      tickDivider: 2,
      frameWidth: 7,
      frameHeight: 55,
      scale,
    })
  }
}
