import shipImageSrc from '../assets/img/ship-a1.png'
import enemySmallImageSrc from '../assets/img/enemy-small.png'
import enemyMediumImageSrc from '../assets/img/enemy-medium.png'
import enemyBigImageSrc from '../assets/img/enemy-big.png'
import explosionSmallImageSrc from '../assets/img/explosion-small.png'
import explosionMediumImageSrc from '../assets/img/explosion-medium.png'
import explosionBigImageSrc from '../assets/img/explosion-big.png'
import boltImageSrc from '../assets/img/laser-bolts.png'
import { detectRectCollision } from '../utils/collisionDetection'
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
    this.enemyBoltDelay = Math.floor(Math.random() * 50) + 50
  }

  init() {
    const shipImage = new Image()
    shipImage.src = shipImageSrc
    const boltImage = new Image()
    boltImage.src = boltImageSrc

    this.player = new Player({
      canvas: this.canvas,
      image: shipImage,
      boltImage,
    })

    const enemyBigImage = new Image()
    enemyBigImage.src = enemyBigImageSrc
    const explosionBigImage = new Image()
    explosionBigImage.src = explosionBigImageSrc
    const enemyMediumImage = new Image()
    enemyMediumImage.src = enemyMediumImageSrc
    const explosionMediumImage = new Image()
    explosionMediumImage.src = explosionMediumImageSrc
    const enemySmallImage = new Image()
    enemySmallImage.src = enemySmallImageSrc
    const explosionSmallImage = new Image()
    explosionSmallImage.src = explosionSmallImageSrc

    this.enemies = []

    for (let column = 0; column < 8; column++) {
      for (let row = 0; row < 1; row++) {
        this.enemies.push(
          new Enemy({
            canvas: this.canvas,
            image: enemyBigImage,
            explosionImage: explosionBigImage,
            boltImage,
            column,
            row,
            size: 'big',
          })
        )
      }
    }

    for (let column = 0; column < 6; column++) {
      for (let row = 1; row < 3; row++) {
        this.enemies.push(
          new Enemy({
            canvas: this.canvas,
            image: enemyMediumImage,
            explosionImage: explosionMediumImage,
            boltImage,
            column,
            row,
            size: 'medium',
          })
        )
      }
    }

    for (let column = 0; column < 12; column++) {
      for (let row = 3; row < 5; row++) {
        this.enemies.push(
          new Enemy({
            canvas: this.canvas,
            image: enemySmallImage,
            explosionImage: explosionSmallImage,
            boltImage,
            column,
            row,
            size: 'small',
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
    this.enemies.forEach((enemy, enemyIndex) => {
      enemy.update()
      if (this.player.laserBolts.length > 0 && enemy.deleteTimeout === null) {
        this.player.laserBolts.forEach((laserBolt, laserBoltIndex) => {
          if (detectRectCollision(laserBolt, enemy)) {
            this.player.laserBolts.splice(laserBoltIndex, 1)
            enemy.image = enemy.explosionImage
            enemy.nbFrames = 5
            enemy.deleteTimeout = 20
          }
        })
      }

      if (enemy.deleteTimeout !== null && enemy.deleteTimeout === 0) {
        this.enemies.splice(enemyIndex, 1)
      }
    })
    if (this.enemyBoltDelay > 0) {
      this.enemyBoltDelay--
    } else {
      const randEnemyIndex = Math.floor(Math.random() * this.enemies.length)
      this.enemies[randEnemyIndex].shoot()
      this.enemyBoltDelay = Math.floor(Math.random() * 50) + 50
    }
  }
}

export default Game
