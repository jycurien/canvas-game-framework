import RectangularElement from './RectangularElement'

class Brick extends RectangularElement {
  constructor({
    canvas,
    column,
    row,
    width,
    height,
    fillStyle = null,
    lineWidth = null,
    strokeStyle = null,
  }) {
    const position = {
      x: 30 + column * (width + 10),
      y: 30 + row * (height + 10),
    }

    super({
      canvas,
      position,
      velocity: null,
      width,
      height,
      fillStyle,
      lineWidth,
      strokeStyle,
    })
  }
}

export default Brick
