import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import config from '../../data/config'
import useTypewriter from '../../hooks/useTypewriter'
import FloatingHearts from '../common/FloatingHearts'
import './Hero.css'

export default function Hero() {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.4 })
  const typed = useTypewriter(config.herName, { start: inView, speed: 160, delay: 1800 })
  const letters = 'Happy Birthday'.split('')

  return (
    <section
      id="hero"
      ref={ref}
      className="hero"
      style={{ '--hero-img': config.heroImage ? `url("${config.heroImage}")` : 'none' }}
    >
      <div className="hero-bg" />
      <div className="hero-veil" />
      <FloatingHearts count={26} color="rgba(255,255,255,0.7)" />

      <div className="hero-content">
        <motion.p
          className="hero-eyebrow"
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          animate={{ opacity: 1, letterSpacing: '0.4em' }}
          transition={{ duration: 2, delay: 0.4 }}
        >
          a little world made for you
        </motion.p>

        <h1 className="hero-title" aria-label="Happy Birthday">
          {letters.map((ch, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)', rotate: -6 }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)', rotate: 0 }}
              transition={{ duration: 0.9, delay: 0.7 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              {ch === ' ' ? ' ' : ch}
            </motion.span>
          ))}
        </h1>

        <div className="hero-name" aria-label={config.herName}>
          <span>{typed}</span>
          <i className="caret" />
          {/* keeps the height stable before typing starts */}
          <span className="hero-name-ghost">{'​'}</span>
        </div>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 1.6 }}
        >
          Even miles apart, you are the closest thing to my heart.
        </motion.p>
      </div>

      <motion.a
        href="#memories"
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
      >
        <span>scroll down, a little world is waiting</span>
        <i>⌄</i>
      </motion.a>
    </section>
  )
}