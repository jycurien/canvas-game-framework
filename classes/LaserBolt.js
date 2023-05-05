import { boltImage } from '../images/images'
import SpriteElement from './SpriteElement'

export default class LaserBolt extends SpriteElement {
  // TODO refactor to use parentElement
  constructor({ canvas, position }) {
    const scale = 2
    const width = 5

    const velocity = {
      x: 0,
      y: -5,
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
      image: boltImage,
      nbFrames: 2,
      tickDivider: 2,
      frameWidth: 5,
      frameHeight: 12,
      scale,
      origin,
      offset: 9,
    })
  }
}
