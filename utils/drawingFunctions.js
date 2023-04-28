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
    this.strokeStyle = strokeStyle ?? this.strokeStyle
    this.stroke()
  }
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
    this.strokeStyle = strokeStyle ?? this.strokeStyle
    this.stroke()
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
