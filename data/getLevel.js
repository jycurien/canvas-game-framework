import {
  desertBackgroundImage,
  riverBackgroundImage,
  spaceBackgroundImage,
} from '../images/images'
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
        y: 1,
      },
      image: desertBackgroundImage,
      frameWidth: 753,
      frameHeight: 800,
    },
    enemyFormations: [
      [
        [null, 3, 3, null],
        [2, null, 2],
        [1, 1, 1, 1, 1, 1],
      ],
      [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
      ],
      [
        [2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2],
      ],
      [[3, 3, 3, 3, 3]],
    ],
    scoreToBoss: 100,
    bossType: 'boss1',
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
        y: 1,
      },
      image: riverBackgroundImage,
      frameWidth: 640,
      frameHeight: 800,
    },
    enemyFormations: [
      [
        [null, 3, 3, null],
        [2, null, 2],
        [null, 3, 3, null],
      ],
      [
        [2, 2],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [2, 2],
      ],
      [
        [2, 2, null, 2, 2],
        [2, null, 2, null, 2],
      ],
      [[3, 3, 3, 3, 3]],
      [
        [3, null, 3],
        [null, 4, null],
        [3, null, 3],
      ],
    ],
    scoreToBoss: 2000,
    bossType: 'boss1',
  },
  {
    number: 3,
    background: {
      position: {
        x: -50,
        y: 0,
      },
      velocity: {
        x: 0,
        y: 0.5,
      },
      image: spaceBackgroundImage,
      frameWidth: 700,
      frameHeight: 800,
    },
    enemyFormations: [
      [
        [null, 3, 3, null],
        [2, null, 2],
        [null, 3, 3, null],
      ],
      [
        [2, 2],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [2, 2],
      ],
      [[3, 3, 3, 3, 3]],
      [
        [4, null, 4],
        [null, 4, null],
        [4, null, 4],
      ],
      [
        [null, 5, 5, null],
        [5, 5, 5, 5],
        [null, 5, 5, null],
      ],
      [
        [6, 6, 6],
        [6, 6, 6],
      ],
    ],
    scoreToBoss: 3000,
    bossType: 'boss1',
  },
]

const getLevel = (index, ui, canvas, player) => {
  if (index > levels.length - 1) {
    return null
  }

  const { number, background, enemyFormations, scoreToBoss, bossType } =
    levels[index]

  return new Level({
    ui,
    canvas,
    player,
    number,
    background: new Background({
      canvas,
      position: { ...background.position },
      velocity: { ...background.velocity },
      image: background.image,
      frameWidth: background.frameWidth,
      frameHeight: background.frameHeight,
    }),
    enemyFormations,
    scoreToBoss,
    bossType,
  })
}

export default getLevel
