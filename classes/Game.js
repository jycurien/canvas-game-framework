import '../utils/drawingFunctions'
import Ball from './Ball'
import Brick from './Brick'
import Paddle from './Paddle'
import { detectRectCollision } from '../utils/collisionDetection'

class Game {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.score = 0
    this.over = false
    this.active = true
    this.win = false
    this.stopMain = null
    this.frame = 0
    this.lastFrameTime = 0
    this.ball = new Ball({
      canvas,
      position: {
        x: canvas.width / 2,
        y: canvas.height - 30,
      },
      velocity: {
        x: 2,
        y: -2,
      },
      radius: 10,
      fillStyle: '#0095DD',
    })
    this.paddle = new Paddle({
      canvas,
      velocity: {
        x: 0,
        y: 0,
      },
      width: 75,
      height: 10,
      fillStyle: '#0095DD',
    })

    const bricks = []
    for (let column = 0; column < 5; column++) {
      for (let row = 0; row < 1; row++) {
        bricks.push(
          new Brick({
            canvas,
            column,
            row,
            width: 75,
            height: 20,
            fillStyle: '#0095DD',
          })
        )
      }
    }

    this.bricks = bricks
  }

  main(tFrame) {
    this.render()

    if (!this.active) {
      cancelAnimationFrame(this.stopMain)
      return
    }

    this.update()

    this.frame++

    this.stopMain = requestAnimationFrame(this.main.bind(this))

    // const fps = 1 / ((tFrame - this.lastFrameTime) / 1000)
    // this.lastFrameTime = tFrame
    // console.log(fps)
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.drawRect(0, 0, this.canvas.width, this.canvas.height, '#000')
    this.drawScore()
    if (this.over) {
      const txt = this.win ? `You Win!` : `Game Over`
      this.ctx.font = '30px Arial'
      this.ctx.fillStyle = '#0095DD'
      this.ctx.fillText(
        txt,
        (this.canvas.width - this.ctx.measureText(txt).width) / 2,
        this.canvas.height / 2
      )
      return
    }

    this.ball.render()
    this.paddle.render()
    this.bricks.forEach((brick) => brick.render())
  }

  update() {
    this.ball.update()
    this.paddle.update()

    if (this.ball.getBottom() === this.paddle.getTop()) {
      if (
        this.ball.getRight() > this.paddle.getLeft() &&
        this.ball.getLeft() < this.paddle.getRight()
      ) {
        this.ball.velocity.y = -this.ball.velocity.y
      } else {
        this.over = true
        setTimeout(() => {
          this.active = false
          cancelAnimationFrame(this.stopMain)
        }, 500)
      }
    }

    this.bricks.forEach((brick, index) => {
      if (detectRectCollision(this.ball, brick)) {
        this.ball.velocity.y = -this.ball.velocity.y
        this.bricks.splice(index, 1)
        this.score++

        if (this.bricks.length === 0) {
          this.over = true
          this.active = false
          this.win = true
        }
      }
    })
  }

  drawScore() {
    this.ctx.font = '16px Arial'
    this.ctx.fillStyle = '#0095DD'
    this.ctx.fillText(`Score: ${this.score}`, 8, 20)
  }
}

export default Game
