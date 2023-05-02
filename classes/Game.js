import Player from './Player'
import getLevels from '../levels/getLevels'
import Ui from './Ui'

class Game {
  constructor(canvas) {
    this.ui = new Ui()
    this.message = null
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.over = false
    this.isWon = false
    this.stopMain = null
    this.lastFrameTime = 0
    this.tick = 0
    // this.inactiveTimeout = 30
    this.player = new Player({
      canvas: this.canvas,
    })
    this.levelIndex = 0
    this.level = getLevels(0, canvas, this.player)
  }

  main(tFrame) {
    this.render()

    if (this.over) {
      cancelAnimationFrame(this.stopMain)
      return
    }

    this.update()

    this.tick++

    this.stopMain = requestAnimationFrame(this.main.bind(this))

    // const fps = 1 / ((tFrame - this.lastFrameTime) / 1000)
    // this.lastFrameTime = tFrame
    // console.log(fps)
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.level.render(this.ctx, this.tick)

    this.ui.render(this.player)
  }

  update() {
    this.level.update()

    if (this.level.over) {
      this.levelIndex++
      const newLevel = getLevels(this.levelIndex, this.canvas, this.player)
      if (newLevel === null) {
        this.over = true
        this.isWon = true
      } else {
        this.level = newLevel
      }
    }

    if (this.player.deleteTimeout !== null && this.player.deleteTimeout === 0) {
      this.player.opacity = 0
      if (this.player.lives > 0) {
        this.player.lives--
        this.player.reset()
      } else {
        this.over = true
      }
    }

    if (this.over) {
      this.ui.message = this.isWon
        ? '✨ Congratulations! You Win! ✨'
        : 'Game Over'
      this.ui.backgroundColor = '#000'
      this.ui.opacity = 1
    }
  }
}

export default Game
