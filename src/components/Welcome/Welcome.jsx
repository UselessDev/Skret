import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import FloatingHearts from '../common/FloatingHearts'
import './Welcome.css'

export default function Welcome({ onOpen }) {
  const [stage, setStage] = useState('idle') // idle -> shake -> open

  // hearts that burst out of the box
  const burst = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => {
        const angle = (i / 16) * Math.PI * 2 + Math.random() * 0.4
        const dist = 120 + Math.random() * 160
        return {
          id: i,
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist - 90,
          size: 16 + Math.random() * 22,
          sym: ['♥', '✦', '♡'][i % 3],
          delay: Math.random() * 0.2,
        }
      }),
    [],
  )

  const handleClick = () => {
    if (stage !== 'idle') return
    setStage('shake')
    setTimeout(() => setStage('open'), 800)
    setTimeout(onOpen, 2800)
  }

  return (
    <motion.div
      className={`welcome ${stage}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.25, filter: 'blur(12px)' }}
      transition={{ duration: 1 }}
    >
      <div className="welcome-stars" aria-hidden="true" />
      <FloatingHearts count={22} />

      <motion.h1
        className="welcome-title"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: stage === 'idle' ? 1 : 0, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      >
        A Little World
        <br />
        Made for You
      </motion.h1>

      <button className="gift" onClick={handleClick} aria-label="Open your gift">
        <span className="gift-glow" />
        <span className="gift-shadow" />
        <span className="gift-lid">
          <span className="gift-bow">
            <i />
            <i />
            <b />
          </span>
        </span>
        <span className="gift-body" />
        <span className="gift-burst">
          {burst.map((h) => (
            <em
              key={h.id}
              style={{
                '--dx': `${h.dx}px`,
                '--dy': `${h.dy}px`,
                fontSize: h.size,
                animationDelay: `${h.delay}s`,
              }}
            >
              {h.sym}
            </em>
          ))}
        </span>
      </button>

      <motion.p
        className="welcome-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage === 'idle' ? 1 : 0 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        tap the gift to open it ♥
      </motion.p>

      <div className="welcome-flash" />
    </motion.div>
  )
}