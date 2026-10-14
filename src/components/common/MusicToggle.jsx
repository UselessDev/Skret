import { useEffect, useRef, useState } from 'react'
import config from '../../data/config'

/** Appears only when `music` is set in config.js. */
export default function MusicToggle({ autoPlay = false }) {
  const audio = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!config.music || !autoPlay || !audio.current) return
    audio.current.volume = 0.5
    audio.current.play().then(() => setPlaying(true)).catch(() => {})
  }, [autoPlay])

  if (!config.music) return null

  const toggle = () => {
    if (!audio.current) return
    if (playing) {
      audio.current.pause()
      setPlaying(false)
    } else {
      audio.current.play().then(() => setPlaying(true)).catch(() => {})
    }
  }

  return (
    <>
      <audio ref={audio} src={config.music} loop preload="auto" />
      <button className={`music ${playing ? 'on' : ''}`} onClick={toggle} aria-label="Toggle music">
        {playing ? '♫' : '♪'}
      </button>
    </>
  )
}