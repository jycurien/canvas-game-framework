import './style.css'
import './utils/drawingFunctions'
import Game from './classes/Game'

const canvas = document.querySelector('canvas')
canvas.width = 600
canvas.height = 800

let game = new Game(canvas)

game.main()
