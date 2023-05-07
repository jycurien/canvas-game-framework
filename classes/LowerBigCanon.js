import { fixedPosition } from '../utils/relativePositionFunctions'
import BigCanonBolt from './BigCanonBolt'
import Enemy from './Enemy'

export default class LowerBigCanon extends Enemy {
  constructor({ canvas, parentElement, data }) {
    const position = fixedPosition({
      parentElement,
      relativePosition: data.relativePosition,
    })
    const velocity = {
      x: 0,
      y: 0,
    }
    super({ canvas, position, velocity, data })
    this.parentElement = parentElement
    this.relativePosition = data.relativePosition
    this.shootInterval = 60
  }

  update(tick) {
    this.position = fixedPosition({
      parentElement: this.parentElement,
      relativePosition: this.relativePosition,
    })
    super.update(tick)
    if (this.parentElement.lifePoints <= 0) {
      this.lifePoints = 0
    }
    if (tick % this.shootInterval === 0) {
      this.shoot()
    }
  }

  shoot() {
    if (
      this.boltData !== null &&
      this.boltWave.length < this.maxBoltWaveLength &&
      this.deleteTimeout === null
    ) {
      this.boltData.forEach((boltData) =>
        this.boltWave.push(
          new BigCanonBolt({
            canvas: this.canvas,
            position: {
              x: this.position.x + this.width * boltData.positionX,
              y: this.position.y + this.height - 5,
            },
            velocity: {
              x: boltData.velocityX,
              y: 5,
            },
          })
        )
      )
    }
  }
}
