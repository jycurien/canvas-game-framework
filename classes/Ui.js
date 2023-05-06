import { lifeImage, bombIconImage } from '../images/images'

bombIconImage.width = 12
bombIconImage.style.marginRight = '2px'
lifeImage.style.marginLeft = '2px'

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
    this.playerBombsNumberCache = null
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

    this.messageContainer.innerHTML = this.message
    if (this.playerBombsNumberCache !== player.bombsNumber) {
      this.playerBombsNumberCache = player.bombsNumber
      this.topRightContainer.innerHTML = ''
      for (let i = 0; i < player.bombsNumber; i++) {
        this.topRightContainer.appendChild(bombIconImage.cloneNode())
      }
    }
  }
}
