CanvasRenderingContext2D.prototype.drawCircle = function (
  x,
  y,
  radius,
  fillStyle = null,
  lineWidth = null,
  strokeStyle = null
) {
  this.beginPath()
  this.arc(x, y, radius, 0, 2 * Math.PI)
  this.fillStyle = fillStyle ?? this.fillStyle
  this.fill()

  if (lineWidth) {
    this.lineWidth = lineWidth
    this.strokeStyle = strokeStyle ?? this.strokeStyle
    this.stroke()
  }
}

CanvasRenderingContext2D.prototype.drawRect = function (
  x,
  y,
  width,
  height,
  fillStyle = null,
  lineWidth = null,
  strokeStyle = null
) {
  this.fillStyle = fillStyle ?? this.fillStyle
  this.fillRect(x, y, width, height)

  if (lineWidth) {
    this.lineWidth = lineWidth
    this.strokeStyle = strokeStyle ?? this.strokeStyle
    this.stroke()
  }
}

CanvasRenderingContext2D.prototype.drawText = function (
  text,
  x,
  y,
  font,
  fillStyle
) {
  this.font = font
  this.fillStyle = fillStyle
  this.fillText(text, x, y)
}

CanvasRenderingContext2D.prototype.drawPolygon = function (
  points = [{ x: 0, y: 0 }],
  fillStyle = null,
  lineWidth = null,
  strokeStyle = null
) {
  this.beginPath()
  this.moveTo(points[0].x, points[0].y)
  for (let i = 1; i < points.length; i++) {
    this.lineTo(points[i].x, points[i].y)
  }
  this.closePath()

  this.fillStyle = fillStyle ?? this.fillStyle
  this.fill()

  if (lineWidth) {
    this.lineWidth = lineWidth
    this.strokeStyle = strokeStyle ?? this.strokeStyle
    this.stroke()
  }
}

CanvasRenderingContext2D.prototype.drawPath2d = function (
  path,
  fillStyle = null,
  lineWidth = null,
  strokeStyle = null
) {
  const p = new Path2D(path)
  this.fillStyle = fillStyle ?? this.fillStyle
  this.fill(p)

  if (lineWidth) {
    this.lineWidth = lineWidth
    this.strokeStyle = strokeStyle ?? this.strokeStyle
    this.stroke(p)
  }
}

CanvasRenderingContext2D.prototype.rotateDrawing = function (
  origin = { x: 0, y: 0 },
  rotation = 0,
  drawingFn
) {
  this.save()
  this.translate(origin.x, origin.y)

  this.rotate(rotation)

  this.translate(-origin.x, -origin.y)

  drawingFn()

  this.restore()
}
