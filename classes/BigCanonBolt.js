import { bigCanonBoltImage } from '../images/images'
import SpriteElement from './SpriteElement'

export default class BigCanonBolt extends SpriteElement {
  constructor({ canvas, position, velocity }) {
    const scale = 1
    const width = 7
    const height = 55

    position.x -= (width * scale) / 3
    position.y -= height * scale - 6

    super({
      canvas,
      position,
      velocity,
      image: bigCanonBoltImage,
      nbFrames: 3,
      tickDivider: 2,
      frameWidth: width,
      frameHeight: height,
      scale,
    })
  }
}
