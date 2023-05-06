export const circularMovement = ({
  element,
  parentElement,
  startAngle = 0,
  angleSpeed = 0,
  radius,
}) => {
  const center = parentElement.getCenter()
  const angle = startAngle + angleSpeed
  return {
    x: center.x + Math.cos(angle) * radius - (element?.width ?? 0) / 2,
    y: center.y + Math.sin(angle) * radius - (element?.height ?? 0) / 2,
  }
}

export const fixedPosition = ({ parentElement, relativePosition }) => {
  return {
    x: parentElement.position.x * relativePosition.x,
    y: parentElement.position.y * relativePosition.y,
  }
}
