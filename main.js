import './style.css'
import './utils/drawingFunctions'
import Game from './classes/Game'

const canvas = document.querySelector('canvas')
canvas.width = 1024
canvas.height = 576

let game = new Game(canvas)

game.init()
