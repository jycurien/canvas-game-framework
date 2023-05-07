import { circularMovement } from '../utils/relativePositionFunctions'
import Enemy from './Enemy'

export default class MegaBolt extends Enemy {
  constructor({ canvas, parentElement, data }) {
    const parentElementCenter = parentElement.getCenter()
    const radius =
      Math.max(parentElement.width, parentElement.height) * data.relativeRadius
    const position = {
      x: parentElementCenter.x + radius * Math.sin(data.startAngle),
      y: parentElementCenter.y + radius * Math.cos(data.startAngle),
    }
    const velocity = {
      x: 0,
      y: 0,
    }
    super({ canvas, position, velocity, data })
    this.parentElement = parentElement
    this.angle = data.startAngle
    this.angleSpeed = data.angleSpeed
    this.radius = radius
  }

  update(tick) {
    this.position = circularMovement({
      element: this,
      parentElement: this.parentElement,
      startAngle: this.angle,
      angleSpeed: this.angleSpeed,
      radius: this.radius,
    })
    this.angle += this.angleSpeed
    super.update(tick)
    if (this.parentElement.lifePoints <= 0) {
      this.lifePoints = 0
    }
  }
}
