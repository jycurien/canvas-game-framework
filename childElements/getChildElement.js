import Mandible from '../classes/Mandible'
import MegaBolt from '../classes/MegaBolt'

const getChildElement = ({ elementData, parentElement }) => {
  switch (elementData.type) {
    case 'megabolt':
      return new MegaBolt({
        canvas: parentElement.canvas,
        parentElement,
        data: elementData,
      })

    case 'mandible':
      return new Mandible({
        canvas: parentElement.canvas,
        parentElement,
        data: elementData,
      })

    default:
      return null
  }
}

export default getChildElement
