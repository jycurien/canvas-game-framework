import {
  enemy1Image,
  explosionEnemy1Image,
  enemy2Image,
  explosionEnemy2Image,
  enemy3Image,
  explosionEnemy3Image,
  enemy4Image,
  explosionEnemy4Image,
  enemy5Image,
  explosionEnemy5Image,
  enemy6Image,
  explosionEnemy6Image,
  boss1Image,
  explosionBoss1Image,
  megaBoltBoss1Image,
} from '../images/images'

const enemyData = {
  1: {
    type: 1,
    image: enemy1Image,
    explosionImage: explosionEnemy1Image,
    scorePoints: 10,
    maxLifePoints: 1,
    nbFrames: 2,
    width: 32,
    height: 32,
    colGap: 10,
    maxBoltWaveLength: 1,
    boltData: [
      {
        positionX: 0.5,
        velocityX: 0,
      },
    ],
  },
  2: {
    type: 2,
    image: enemy2Image,
    explosionImage: explosionEnemy2Image,
    scorePoints: 20,
    maxLifePoints: 2,
    nbFrames: 2,
    width: 64,
    height: 32,
    colGap: 20,
    maxBoltWaveLength: 2,
    boltData: [
      {
        positionX: 0.25,
        velocityX: 0,
      },
      {
        positionX: 0.75,
        velocityX: 0,
      },
    ],
  },
  3: {
    type: 3,
    image: enemy3Image,
    explosionImage: explosionEnemy3Image,
    scorePoints: 30,
    maxLifePoints: 3,
    nbFrames: 2,
    width: 50,
    height: 58,
    colGap: 13,
    maxBoltWaveLength: 2,
    boltData: [
      {
        positionX: 0.2,
        velocityX: 0,
      },
      {
        positionX: 0.8,
        velocityX: 0,
      },
    ],
  },
  4: {
    type: 4,
    image: enemy4Image,
    explosionImage: explosionEnemy4Image,
    scorePoints: 40,
    maxLifePoints: 4,
    nbFrames: 3,
    width: 40,
    height: 42,
    colGap: 23,
    maxBoltWaveLength: 3,
    boltData: [
      {
        positionX: 0.5,
        velocityX: 0,
      },
    ],
  },
  5: {
    type: 5,
    image: enemy5Image,
    explosionImage: explosionEnemy5Image,
    scorePoints: 50,
    maxLifePoints: 3,
    nbFrames: 3,
    width: 48,
    height: 38,
    colGap: 13,
    maxBoltWaveLength: 4,
    boltData: [
      {
        positionX: 0.2,
        velocityX: 0,
      },
      {
        positionX: 0.8,
        velocityX: 0,
      },
    ],
  },
  6: {
    type: 6,
    image: enemy6Image,
    explosionImage: explosionEnemy6Image,
    scorePoints: 60,
    maxLifePoints: 4,
    nbFrames: 3,
    width: 48,
    height: 38,
    colGap: 13,
    maxBoltWaveLength: 4,
    boltData: [
      {
        positionX: 0.2,
        velocityX: 0,
      },
      {
        positionX: 0.8,
        velocityX: 0,
      },
    ],
  },
  boss1: {
    type: 'boss1',
    image: boss1Image,
    explosionImage: explosionBoss1Image,
    megaBoltImage: megaBoltBoss1Image,
    scorePoints: 1000,
    maxLifePoints: 400,
    nbFrames: 3,
    width: 134,
    height: 138,
    colGap: 0,
    scale: 2,
    maxBoltWaveLength: 15,
    boltData: [
      {
        positionX: 0.5,
        velocityX: -0.5,
      },
      {
        positionX: 0.5,
        velocityX: 0,
      },
      {
        positionX: 0.5,
        velocityX: 0.5,
      },
    ],
  },
}

export default enemyData
