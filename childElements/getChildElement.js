import LowerBigCanon from '../classes/LowerBigCanon'
import Mandible from '../classes/Mandible'
import MegaBolt from '../classes/MegaBolt'
import UpperBigCanon from '../classes/UpperBigCanon'

const getChildElement = ({ elementData, parentElement }) => {
  const params = {
    canvas: parentElement.canvas,
    parentElement,
    data: elementData,
  }

  switch (elementData.type) {
    case 'megabolt':
      return new MegaBolt(params)

    case 'mandible':
      return new Mandible(params)

    case 'upper-big-canon':
      return new UpperBigCanon(params)

    case 'lower-big-canon':
      return new LowerBigCanon(params)

    default:
      return null
  }
}

export default getChildElement
