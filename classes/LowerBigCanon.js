import { fixedPosition } from '../utils/relativePositionFunctions'
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
  }

  update() {
    this.position = fixedPosition({
      parentElement: this.parentElement,
      relativePosition: this.relativePosition,
    })
    super.update()
    if (this.parentElement.lifePoints <= 0) {
      this.lifePoints = 0
    }
  }
}
