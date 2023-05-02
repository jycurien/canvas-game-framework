export default class Level {
  constructor({
    number,
    background,
    enemyFormations,
    nbFormationsToNextLevel,
  }) {
    this.number = number
    this.background = background
    this.enemyFormations = enemyFormations
    this.nbFormationsToNextLevel = nbFormationsToNextLevel
  }

  render(tick) {
    this.background.render(tick)
  }

  update() {
    this.background.update()
  }
}
