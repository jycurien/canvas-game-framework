import {
  enemy1Image,
  explosionEnemy1Image,
  enemy2Image,
  explosionEnemy2Image,
  enemy3Image,
  explosionEnemy3Image,
  enemy4Image,
  explosionEnemy4Image,
} from '../images/images'
import Element from './Element'
import Enemy from './Enemy'

const enemyData = {
  1: {
    type: 1,
    image: enemy1Image,
    explosionImage: explosionEnemy1Image,
    scorePoints: 10,
    maxLifePoints: 1,
    width: 32,
    height: 32,
    colGap: 10,
  },
  2: {
    type: 2,
    image: enemy2Image,
    explosionImage: explosionEnemy2Image,
    scorePoints: 20,
    maxLifePoints: 2,
    width: 64,
    height: 32,
    colGap: 10,
  },
  3: {
    type: 3,
    image: enemy3Image,
    explosionImage: explosionEnemy3Image,
    scorePoints: 30,
    maxLifePoints: 3,
    width: 50,
    height: 58,
    colGap: 13,
  },
  4: {
    type: 4,
    image: enemy4Image,
    explosionImage: explosionEnemy4Image,
    scorePoints: 40,
    maxLifePoints: 4,
    width: 40,
    height: 42,
    colGap: 23,
  },
}

export default class EnemyWave extends Element {
  constructor({ canvas, position, velocity, formation, horizontalBoundaries }) {
    super({ canvas, position, velocity })

    this.enemyBoltDelay = Math.floor(Math.random() * 50) + 30
    this.enemies = []
    this.horizontalBoundaries = horizontalBoundaries
    let rowPositionY = this.position.y
    let rowHeight = 32
    formation.forEach((row) => {
      row.forEach((enemyType, columnIndex) => {
        const data = enemyData[enemyType]
        if (enemyType) {
          rowHeight = data.height + 12
          const enemyPosition = {
            x:
              position.x +
              data.colGap / 2 +
              columnIndex * (data.width + data.colGap),
            y: rowPositionY,
          }

          this.enemies.push(
            new Enemy({
              canvas: this.canvas,
              position: enemyPosition,
              velocity,
              data,
            })
          )
        }
      })
      rowPositionY += rowHeight
    })
    this.left = this.getLeft()
    this.right = this.getRight()
  }

  getLeft() {
    const sortedEnemies = [
      ...this.enemies.sort(
        (enemy1, enemy2) => enemy1.getLeft() - enemy2.getLeft()
      ),
    ]
    return sortedEnemies[0].getLeft()
  }

  getRight() {
    const sortedEnemies = [
      ...this.enemies.sort(
        (enemy1, enemy2) => enemy2.getRight() - enemy1.getRight()
      ),
    ]
    return sortedEnemies[0].getRight()
  }

  // getTop() {
  //   const sortedEnemies = [
  //     ...this.enemies.sort(
  //       (enemy1, enemy2) => enemy1.getTop() - enemy2.getTop()
  //     ),
  //   ]
  //   return sortedEnemies[0].getTop()
  // }

  // getBottom() {
  //   const sortedEnemies = [
  //     ...this.enemies.sort(
  //       (enemy1, enemy2) => enemy2.getBottom() - enemy1.getBottom()
  //     ),
  //   ]
  //   return sortedEnemies[0].getBottom()
  // }

  render(ctx, tick) {
    if (this.enemies.length > 0) {
      this.enemies.forEach((enemy) => enemy.render(ctx, tick))
    }
  }

  update() {
    this.left += this.velocity.x
    this.right += this.velocity.x
    if (this.enemies.length > 0) {
      if (this.left < this.horizontalBoundaries.left) {
        this.enemies.forEach((enemy) => {
          enemy.velocity.x = 3
        })
      } else if (this.right > this.horizontalBoundaries.right) {
        this.enemies.forEach((enemy) => {
          enemy.velocity.x = -3
        })
      }
      this.enemies.forEach((enemy, enemyIndex) => {
        enemy.update()
        if (enemy.getTop() > this.canvas.height) {
          this.enemies.splice(enemyIndex, 1)
        }
      })
    }
    if (this.enemyBoltDelay > 0) {
      this.enemyBoltDelay--
    } else if (this.enemies.length > 0) {
      const randEnemyIndex = Math.floor(Math.random() * this.enemies.length)
      this.enemies[randEnemyIndex].shoot()
      this.enemyBoltDelay = Math.floor(Math.random() * 50) + 30
    }
  }
}
