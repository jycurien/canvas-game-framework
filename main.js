import './style.css'
import './utils/drawingFunctions'

const canvas = document.querySelector('canvas')
canvas.width = 800
canvas.height = 600
const ctx = canvas.getContext('2d')

if (canvas.getContext) {
  ctx.drawRect(10, 10, 50, 50, 'rgb(200, 0, 0)')

  ctx.drawRect(30, 30, 50, 50, 'rgba(0, 0, 200, 0.5)')

  ctx.drawCircle(100, 20, 10, null, 2, 'black')

  ctx.drawPolygon(
    [
      { x: 200, y: canvas.height - 20 },
      { x: 245, y: canvas.height - 20 },
      { x: 245, y: canvas.height - 40 },
      { x: 235, y: canvas.height - 40 },
      { x: 235, y: canvas.height - 50 },
      { x: 210, y: canvas.height - 50 },
      { x: 210, y: canvas.height - 40 },
      { x: 200, y: canvas.height - 40 },
    ],
    'green'
  )
}
