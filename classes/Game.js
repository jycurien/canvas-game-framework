import Player from './Player'

class Game {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.over = false
    this.active = true
    this.win = false
    this.stopMain = null
    this.frame = 0
    this.lastFrameTime = 0
    this.score = 0
    this.player = new Player({
      canvas,
    })
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
    this.player.render()
  }

  update() {
    this.player.update()
  }
}

export default Game
