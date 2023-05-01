export default class Element {
  constructor({
    canvas,
    position = { x: 0, y: 0 },
    velocity = { x: 0, y: 0 },
  }) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.position = position
    this.velocity = velocity
  }

  render() {}

  update() {
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}
