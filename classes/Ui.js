import { lifeImage } from '../images/images'

export default class Ui {
  constructor() {
    this.uiContainer = document.querySelector('#ui')
    this.topLeftContainer = document.querySelector('#topLeft')
    this.topCenterContainer = document.querySelector('#topCenter')
    this.topRightContainer = document.querySelector('#topRight')
    this.messageContainer = document.querySelector('#message')
    this.bottomLeftContainer = document.querySelector('#bottomLeft')
    this.bottomCenterContainer = document.querySelector('#bottomCenter')
    this.bottomRightContainer = document.querySelector('#bottomRight')
    this.message = ''
    this.backgroundColor = 'transparent'
    this.opacity = 0.8
    this.playerLivesCache = null
  }

  render(player) {
    this.uiContainer.style.backgroundColor = this.backgroundColor
    this.uiContainer.style.opacity = this.opacity
    if (this.playerLivesCache !== player.lives) {
      this.playerLivesCache = player.lives
      this.topRightContainer.innerHTML = ''
      for (let i = 0; i < player.lives; i++) {
        this.topRightContainer.appendChild(lifeImage.cloneNode())
      }
    }
    this.topCenterContainer.textContent = `Score: ${player.score
      .toString()
      .padStart(5, '0')}`
    if (player.shield !== null) {
      this.topLeftContainer.innerHTML = `<div style="width: ${
        ((player.shield?.lifePoints ?? 0) * 100) / 3
      }%; height:8px; background-color:hsla(240, 100%, 75%, 0.5)"></div>`
    }
    this.messageContainer.innerHTML = this.message
  }
}
