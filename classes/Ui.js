import { lifeImage } from '../images/images'

export default class Ui {
  constructor() {
    this.uiContainer = document.querySelector('#ui')
    this.topLeftContainer = document.querySelector('#topLeft')
    this.topCenterContainer = document.querySelector('#topCenter')
    this.topRightContainer = document.querySelector('#topRight')
    this.messageContainer = document.querySelector('#message')
    this.message = null
    this.backgroundColor = 'transparent'
    this.opacity = 0.8
    this.playerLivesCache = null
  }

  render(player) {
    this.uiContainer.style.backgroundColor = this.backgroundColor
    this.uiContainer.style.opacity = this.opacity
    if (this.playerLivesCache !== player.lives) {
      this.playerLivesCache = player.lives
      this.topLeftContainer.innerHTML = ''
      for (let i = 0; i < player.lives; i++) {
        this.topLeftContainer.appendChild(lifeImage.cloneNode())
      }
    }
    this.topCenterContainer.textContent = `Score: ${player.score
      .toString()
      .padStart(5, '0')}`
    if (this.message !== null) {
      this.messageContainer.textContent = this.message
    }
  }
}
