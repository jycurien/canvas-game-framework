import './style.css'
import Game from './classes/Game'

const canvas = document.querySelector('canvas')
canvas.width = 600
canvas.height = 800

const game = new Game(canvas)

const listener = ({ key }) => {
  if (game.over && key === 'Enter') {
    game.init()
  }
}

document.addEventListener('keypress', listener)
