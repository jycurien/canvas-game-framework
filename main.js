import './style.css'
import './utils/drawingFunctions'
import Game from './classes/Game'

const canvas = document.querySelector('canvas')
canvas.width = 480
canvas.height = 320

let game = new Game(canvas)

game.main()
