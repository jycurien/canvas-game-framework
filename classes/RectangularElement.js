import { drawRect } from '../utils/drawingFunctions'
import Element from './Element'

export default class RectangularElement extends Element {
  constructor({
    canvas,
    position,
    velocity,
    width,
    height,
    fillStyle = null,
    lineWidth = null,
    strokeStyle = null,
  }) {
    super({ canvas, position, velocity })
    this.width = width
    this.height = height
    this.fillStyle = fillStyle
    this.lineWidth = lineWidth
    this.strokeStyle = strokeStyle
  }

  render(ctx, tick) {
    drawRect(
      ctx,
      this.position.x,
      this.position.y,
      this.width,
      this.height,
      this.fillStyle,
      this.lineWidth,
      this.strokeStyle
    )
  }

  getLeft() {
    return this.position.x
  }

  getRight() {
    return this.position.x + this.width
  }

  getTop() {
    return this.position.y
  }

  getBottom() {
    return this.position.y + this.height
  }

  getCenter() {
    return {
      x: this.position.x + 0.5 * this.width,
      y: this.position.y + 0.5 * this.height,
    }
  }
}
