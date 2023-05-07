export default class Element {
  constructor({
    canvas,
    position = { x: 0, y: 0 },
    velocity = { x: 0, y: 0 },
  }) {
    this.canvas = canvas
    this.position = position
    this.velocity = velocity
  }

  render(ctx, tick) {}

  update(tick) {
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}
