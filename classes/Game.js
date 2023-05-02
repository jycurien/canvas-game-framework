import Player from './Player'
import getLevels from '../levels/getLevels'

class Game {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.over = false
    this.active = true
    this.win = false
    this.stopMain = null
    this.lastFrameTime = 0
    this.tick = 0
    this.enemyBoltDelay = Math.floor(Math.random() * 50) + 30
    // this.inactiveTimeout = 30
    this.player = new Player({
      canvas: this.canvas,
    })
    this.levelIndex = 0
    this.level = getLevels(0, canvas, this.player)
  }

  main(tFrame) {
    this.render()

    if (!this.active) {
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
    if (this.over && !this.active) {
      this.drawEndScreen()
      return
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.level.render(this.ctx, this.tick)

    this.drawScore()
  }

  update() {
    // if (this.over) {
    //   this.inactiveTimeout--
    // }

    // if (this.inactiveTimeout <= 0) {
    //   this.active = false
    // }

    this.level.update()

    if (this.level.over) {
      this.levelIndex++
      const newLevel = getLevels(this.levelIndex, this.canvas, this.player)
      if (newLevel === null) {
        this.over = true
        this.active = false
        this.win = true
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
        this.active = false
      }
    }
  }

  drawScore() {
    const txt = `Score: ${this.player.score.toString().padStart(5, '0')}`

    this.ctx.font = '14px Arial'
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7'
    this.ctx.fillText(
      txt,
      this.canvas.width / 2 - this.ctx.measureText(txt).width / 2,
      24
    )
  }

  drawEndScreen() {
    this.ctx.drawRect(0, 0, this.canvas.width, this.canvas.height, '#000')
    this.drawScore(this.player)
    const txt = this.win ? 'Congratulations! You Win!' : 'Game Over'
    this.ctx.font = '30px Arial'
    this.ctx.fillStyle = '#fff'
    this.ctx.fillText(
      txt,
      this.canvas.width / 2 - this.ctx.measureText(txt).width / 2,
      this.canvas.height / 2
    )
  }
}

export default Game
