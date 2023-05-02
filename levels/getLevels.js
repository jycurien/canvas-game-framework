import { desertBackgroundImage, riverBackgroundImage } from '../images/images'
import Background from '../classes/Background'
import Level from '../classes/Level'

const levels = [
  {
    number: 1,
    background: {
      position: {
        x: -76,
        y: 0,
      },
      velocity: {
        x: 0,
        y: 2,
      },
      image: desertBackgroundImage,
      frameWidth: 753,
      frameHeight: 800,
    },
    enemyFormations: [
      [
        [null, 'big', 'big', null],
        ['medium', null, 'medium'],
        ['small', 'small', 'small', 'small', 'small', 'small'],
      ],
      [
        [
          'small',
          'small',
          'small',
          'small',
          'small',
          'small',
          'small',
          'small',
        ],
        [
          'small',
          'small',
          'small',
          'small',
          'small',
          'small',
          'small',
          'small',
        ],
      ],
      [
        ['medium', 'medium', 'medium', 'medium', 'medium'],
        ['medium', 'medium', 'medium', 'medium', 'medium'],
      ],
      [['big', 'big', 'big', 'big', 'big']],
    ],
    nbFormationsToNextLevel: 3,
  },
  {
    number: 2,
    background: {
      position: {
        x: -20,
        y: 0,
      },
      velocity: {
        x: 0,
        y: 2,
      },
      image: riverBackgroundImage,
      frameWidth: 640,
      frameHeight: 800,
    },
    enemyFormations: [
      [
        [null, 'big', 'big', null],
        ['medium', null, 'medium'],
        [null, 'big', 'big', null],
      ],
      [
        [
          'small',
          'small',
          'small',
          'small',
          'small',
          'small',
          'small',
          'small',
        ],
        [
          'small',
          'small',
          'small',
          'small',
          'small',
          'small',
          'small',
          'small',
        ],
      ],
      [
        ['medium', 'medium', null, 'medium', 'medium'],
        ['medium', null, 'medium', null, 'medium'],
      ],
      [['big', 'big', 'big', 'big', 'big']],
    ],
    nbFormationsToNextLevel: 4,
  },
]

const getLevels = (index, canvas, player) => {
  if (index > levels.length - 1) {
    return null
  }

  const { number, background, enemyFormations, nbFormationsToNextLevel } =
    levels[index]

  return new Level({
    canvas,
    player,
    number,
    background: new Background({
      canvas,
      position: background.position,
      velocity: background.velocity,
      image: background.image,
      frameWidth: background.frameWidth,
      frameHeight: background.frameHeight,
    }),
    enemyFormations,
    nbFormationsToNextLevel,
  })
}

export default getLevels
