export const detectRectCollision = (rect1, rect2) => {
  return (
    rect1.getLeft() < rect2.getRight() &&
    rect1.getRight() > rect2.getLeft() &&
    rect1.getTop() < rect2.getBottom() &&
    rect1.getBottom() > rect2.getTop()
  )
}

export const detectCircCollision = (circle1, circle2) => {
  const dx = circle1.position.x - circle2.position.x
  const dy = circle1.position.y - circle2.position.y
  const distance = Math.sqrt(dx * dx + dy * dy)

  return distance < circle1.radius + circle2.radius
}
