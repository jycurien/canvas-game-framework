import Player from './Player'
import getLevel from '../data/getLevel'
import Ui from './Ui'

class Game {
  constructor(canvas) {
    this.ui = new Ui()
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.over = true
    this.isWon = false
    this.stopMain = null
    this.lastFrameTime = 0
    this.tick = 0
    this.player = new Player({
      canvas: this.canvas,
    })
    this.levelIndex = 0
    this.level = null
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
    // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.level.render(this.ctx, this.tick)

    this.ui.render(this.player)
  }

  update() {
    this.level.update(this.tick)

    if (this.level.over) {
      this.levelIndex++
      this.player.laserBolts = []
      const newLevel = getLevel(
        this.levelIndex,
        this.ui,
        this.canvas,
        this.player
      )
      if (newLevel === null) {
        this.over = true
        this.isWon = true
      } else {
        this.level = newLevel
      }
    }

    if (this.player.lives <= 0) {
      this.over = true
    }

    if (this.over) {
      this.ui.message = this.isWon
        ? '✨ CONGRATULATIONS! YOU WIN! ✨'
        : 'GAME OVER'
      this.ui.message += '<br/><br/>PRESS ENTER TO START'
      this.ui.backgroundColor = '#000'
      this.ui.opacity = 1
    }
  }

  init() {
    this.over = false
    this.player = new Player({
      canvas: this.canvas,
    })
    this.levelIndex = 0
    this.level = getLevel(0, this.ui, this.canvas, this.player)
    if (this.stopMain) {
      cancelAnimationFrame(this.stopMain)
    }
    this.main()
  }
}

export default Game
