import { fixedPosition } from '../utils/relativePositionFunctions'
import getChildElement from '../childElements/getChildElement'
import Enemy from './Enemy'

export default class UpperBigCanon extends Enemy {
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
    this.childElements = []
    data.childElements.forEach((elementData) =>
      this.childElements.push(
        getChildElement({ elementData, parentElement: this })
      )
    )
  }

  render(ctx, tick) {
    super.render(ctx, tick)

    if (this.childElements.length > 0) {
      this.childElements.forEach((el) => {
        el.render(ctx, tick)
      })
    }
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
    if (this.childElements.length > 0) {
      this.childElements.forEach((el, elIndex) => {
        el.update()
        if (el.deleteTimeout === 0) {
          this.childElements.splice(elIndex, 1)
        }
      })
    }
  }
}
