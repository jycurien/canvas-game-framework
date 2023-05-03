const playAudio = ({ src, volume, loop = false }) => {
  const sound = new Audio(src)
  sound.volume = volume
  sound.loop = loop
  sound.play()
}

export default playAudio
