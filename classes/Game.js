import shipImageSrc from '../assets/img/ship-a1.png'
import enemySmallImageSrc from '../assets/img/enemy-small.png'
import Player from './Player'
import Enemy from './Enemy'

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
    this.score = 0
  }

  init() {
    const shipImage = new Image()
    shipImage.src = shipImageSrc

    this.player = new Player({
      canvas: this.canvas,
      image: shipImage,
    })

    const enemySmallImage = new Image()
    enemySmallImage.src = enemySmallImageSrc

    this.enemies = []
    for (let column = 0; column < 12; column++) {
      for (let row = 0; row < 2; row++) {
        this.enemies.push(
          new Enemy({
            canvas: this.canvas,
            image: enemySmallImage,
            column,
            row,
          })
        )
      }
    }

    this.main()
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
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.drawRect(0, 0, this.canvas.width, this.canvas.height, '#000')
    this.player.render(this.tick)
    this.enemies.forEach((enemy) => enemy.render(this.tick, 4))
  }

  update() {
    this.player.update()
  }
}

export default Game
