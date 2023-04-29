import '../utils/drawingFunctions'
import Element from './Element'

class CircularElement extends Element {
  constructor({
    canvas,
    position,
    velocity,
    radius,
    fillStyle = null,
    lineWidth = null,
    strokeStyle = null,
  }) {
    super({ canvas, position, velocity })
    this.radius = radius
    this.fillStyle = fillStyle
    this.lineWidth = lineWidth
    this.strokeStyle = strokeStyle
  }

  render() {
    this.ctx.drawCircle(
      this.position.x,
      this.position.y,
      this.radius,
      this.fillStyle,
      this.lineWidth,
      this.strokeStyle
    )
  }

  getLeft() {
    return this.position.x - this.radius
  }

  getRight() {
    return this.position.x + this.radius
  }

  getTop() {
    return this.position.y - this.radius
  }

  getBottom() {
    return this.position.y + this.radius
  }
}

export default CircularElement
