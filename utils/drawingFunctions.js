export const drawCircle = (
  ctx,
  x,
  y,
  radius,
  fillStyle = null,
  lineWidth = null,
  strokeStyle = null
) => {
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, 2 * Math.PI)
  ctx.fillStyle = fillStyle ?? ctx.fillStyle
  ctx.fill()

  if (lineWidth) {
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = strokeStyle ?? ctx.strokeStyle
    ctx.stroke()
  }
}

export const drawRect = (
  ctx,
  x,
  y,
  width,
  height,
  fillStyle = null,
  lineWidth = null,
  strokeStyle = null
) => {
  ctx.fillStyle = fillStyle ?? ctx.fillStyle
  ctx.fillRect(x, y, width, height)

  if (lineWidth) {
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = strokeStyle ?? ctx.strokeStyle
    ctx.stroke()
  }
}

export const drawPolygon = (
  ctx,
  points = [{ x: 0, y: 0 }],
  fillStyle = null,
  lineWidth = null,
  strokeStyle = null
) => {
  ctx.beginPath()
  ctx.moveTo(points[0].x, points[0].y)
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y)
  }
  ctx.closePath()

  ctx.fillStyle = fillStyle ?? ctx.fillStyle
  ctx.fill()

  if (lineWidth) {
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = strokeStyle ?? ctx.strokeStyle
    ctx.stroke()
  }
}

export const drawPath2d = (
  ctx,
  path,
  fillStyle = null,
  lineWidth = null,
  strokeStyle = null
) => {
  const p = new Path2D(path)
  ctx.fillStyle = fillStyle ?? ctx.fillStyle
  ctx.fill(p)

  if (lineWidth) {
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = strokeStyle ?? ctx.strokeStyle
    ctx.stroke(p)
  }
}

export const rotateDrawing = (
  ctx,
  origin = { x: 0, y: 0 },
  rotation = 0,
  drawingFn
) => {
  ctx.save()
  ctx.translate(origin.x, origin.y)

  ctx.rotate(rotation)

  ctx.translate(-origin.x, -origin.y)

  drawingFn()

  ctx.restore()
}

export const drawShadow = ({ ctx, element, offset, spread, fillStyle }) => {
  ctx.fillStyle = fillStyle
  ctx.beginPath()
  ctx.ellipse(
    element.position.x + element.width / 2 + offset.x,
    element.position.y + element.height / 2 + offset.y,
    element.width / 2 + spread.x,
    element.height / 2 + spread.y,
    0,
    0,
    Math.PI * 2
  )
  ctx.fill()
}
