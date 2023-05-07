import { fixedPosition } from '../utils/relativePositionFunctions'
import { rotateDrawing } from '../utils/drawingFunctions'
import Enemy from './Enemy'

export default class Mandible extends Enemy {
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
    this.rotation = data.rotation
    this.rotationOrigin = data.rotationOrigin
  }

  render(ctx, tick) {
    const rotation = (this.rotation * (tick % 30)) / 30 // TODO voir comment faire aller retour fluide...

    rotateDrawing(
      ctx,
      {
        x: this.position.x + this.rotationOrigin.x * this.width,
        y: this.position.y + this.rotationOrigin.y * this.height,
      },
      rotation,
      () => super.render(ctx, tick)
    )
  }

  update() {
    this.position = fixedPosition({
      parentElement: this.parentElement,
      relativePosition: this.relativePosition,
    })
    super.update()
  }
}