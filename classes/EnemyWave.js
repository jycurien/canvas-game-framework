import Element from './Element'
import Enemy from './Enemy'

class EnemyWave extends Element {
  constructor({ canvas, position, velocity, formation, horizontalBoundaries }) {
    super({ canvas, position, velocity })

    this.enemyBoltDelay = Math.floor(Math.random() * 50) + 30
    this.enemies = []
    this.horizontalBoundaries = horizontalBoundaries
    formation.forEach((row, rowIndex) => {
      row.forEach((enemyType, columnIndex) => {
        if (enemyType) {
          let width = 32
          let height = 32
          let colGap = 10

          if (enemyType === 'medium') {
            width = 64
            colGap = 20
          } else if (enemyType === 'big') {
            width = 50
            height = 58
            colGap = 13
          }

          const enemyPosition = {
            x: position.x + colGap / 2 + columnIndex * (width + colGap),
            y:
              (enemyType !== 'big' ? position.y + 26 : position.y) +
              rowIndex * (height + 10),
          }

          this.enemies.push(
            new Enemy({
              canvas: this.canvas,
              position: enemyPosition,
              velocity,
              type: enemyType,
            })
          )
        }
      })
    })
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

  getTop() {
    const sortedEnemies = [
      ...this.enemies.sort(
        (enemy1, enemy2) => enemy1.getTop() - enemy2.getTop()
      ),
    ]
    return sortedEnemies[0].getTop()
  }

  getBottom() {
    const sortedEnemies = [
      ...this.enemies.sort(
        (enemy1, enemy2) => enemy2.getBottom() - enemy1.getBottom()
      ),
    ]
    return sortedEnemies[0].getBottom()
  }

  render(tick) {
    if (this.enemies.length > 0) {
      this.enemies.forEach((enemy) => enemy.render(tick))
    }
  }

  update() {
    if (this.enemies.length > 0) {
      if (this.getLeft() < this.horizontalBoundaries.left) {
        this.enemies.forEach((enemy) => {
          enemy.velocity.x = 3
        })
      } else if (this.getRight() > this.horizontalBoundaries.right) {
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

export default EnemyWave
