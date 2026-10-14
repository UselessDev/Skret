import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import config from '../../data/config'
import SectionTitle from '../common/SectionTitle'
import './BirthdayCake.css'

const CONFETTI = ['#ff8fb4', '#ffd98e', '#fff', '#c77dff', '#7fe0ff', '#f0568a']

/** drips of frosting along the top edge of a tier */
function Frosting({ x, y, w, count }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="14" rx="7" fill="#fff" />
      {Array.from({ length: count }, (_, j) => (
        <rect
          key={j}
          x={x + ((j + 0.5) * w) / count - 6}
          y={y + 6}
          width="12"
          height={12 + ((j * 7) % 14)}
          rx="6"
          fill="#fff"
        />
      ))}
    </g>
  )
}

export default function BirthdayCake() {
  const n = Math.min(7, Math.max(1, config.candles))
  const [lit, setLit] = useState(true)
  const [round, setRound] = useState(0)

  const xs = useMemo(
    () => Array.from({ length: n }, (_, i) => (n === 1 ? 160 : 112 + (i * 96) / (n - 1))),
    [n],
  )
  const confetti = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 6 + Math.random() * 8,
        color: CONFETTI[i % CONFETTI.length],
        dur: 2.8 + Math.random() * 2.4,
        delay: Math.random() * 0.8,
        drift: (Math.random() - 0.5) * 160,
        round: i % 3 === 0,
      })),
    [round],
  )

  const blow = () => {
    if (!lit) return
    setLit(false)
    setRound((r) => r + 1)
  }

  return (
    <section id="cake" className={`cake-section ${lit ? 'is-lit' : 'is-out'}`}>
      <div className="cake-bg" />
      <div className="cake-glow" />

      <div className="cake-inner">
        <SectionTitle
          eyebrow="the final chapter"
          title="Make a Wish"
          subtitle="Close your eyes, think of something wonderful, then tap the cake to blow out the candles."
        />

        <div className="cake-stage">
          <svg
            className={`cake ${lit ? 'lit' : 'out'}`}
            viewBox="0 0 320 310"
            role="button"
            tabIndex={0}
            aria-label="Birthday cake. Tap to blow out the candles"
            onClick={blow}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && blow()}
          >
            <defs>
              <radialGradient id="flameGlow">
                <stop offset="0%" stopColor="#ffd98e" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#ffd98e" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="tierA" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ff9fbd" />
                <stop offset="1" stopColor="#f0709a" />
              </linearGradient>
              <linearGradient id="tierB" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ffc2d6" />
                <stop offset="1" stopColor="#ff9fbd" />
              </linearGradient>
              <linearGradient id="tierC" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ffe6ef" />
                <stop offset="1" stopColor="#ffc2d6" />
              </linearGradient>
            </defs>

            {/* plate */}
            <ellipse cx="160" cy="272" rx="148" ry="18" fill="#000" opacity="0.25" />
            <ellipse cx="160" cy="268" rx="144" ry="17" fill="#fff0f5" />
            <ellipse cx="160" cy="265" rx="122" ry="11" fill="#ffd6e4" />

            {/* tiers */}
            <rect x="38" y="200" width="244" height="68" rx="14" fill="url(#tierA)" />
            <Frosting x={38} y={200} w={244} count={10} />
            <rect x="68" y="145" width="184" height="60" rx="12" fill="url(#tierB)" />
            <Frosting x={68} y={145} w={184} count={8} />
            <rect x="98" y="100" width="124" height="50" rx="10" fill="url(#tierC)" />
            <Frosting x={98} y={100} w={124} count={5} />

            {/* decorations */}
            {Array.from({ length: 11 }, (_, i) => (
              <circle key={i} cx={52 + i * 21.6} cy="258" r="4.5" fill="#ffd98e" />
            ))}
            {[0, 1, 2, 3].map((i) => (
              <text key={i} x={92 + i * 46} y="236" fontSize="20" fill="#fff" opacity="0.85" textAnchor="middle">
                ♥
              </text>
            ))}
            {[0, 1, 2].map((i) => (
              <text key={i} x={110 + i * 50} y="187" fontSize="15" fill="#f0568a" opacity="0.8" textAnchor="middle">
                ✦
              </text>
            ))}

            {/* candles */}
            {xs.map((x, i) => {
              const d = `${i * 0.12}s`
              return (
                <g key={i} className="candle" style={{ '--d': d }}>
                  <circle className="aura" cx={x} cy="62" r="26" fill="url(#flameGlow)" />
                  <rect x={x - 4.5} y="72" width="9" height="30" rx="2" fill={i % 2 ? '#7fe0ff' : '#ffd98e'} />
                  <path
                    d={`M${x - 4.5} 80 L${x + 4.5} 76 M${x - 4.5} 88 L${x + 4.5} 84 M${x - 4.5} 96 L${x + 4.5} 92`}
                    stroke="#fff"
                    strokeWidth="2.5"
                    opacity="0.8"
                  />
                  <rect x={x - 0.8} y="66" width="1.6" height="7" fill="#5b2a45" />
                  <g className="flame" style={{ transformOrigin: `${x}px 68px` }}>
                    <path
                      d={`M${x} 44 C${x + 8} 54 ${x + 7} 63 ${x} 68 C${x - 7} 63 ${x - 8} 54 ${x} 44 Z`}
                      fill="#ffa63d"
                    />
                    <path
                      d={`M${x} 52 C${x + 4} 58 ${x + 4} 63 ${x} 67 C${x - 4} 63 ${x - 4} 58 ${x} 52 Z`}
                      fill="#fff3b0"
                    />
                  </g>
                  <g className="smoke">
                    <circle cx={x} cy="62" r="3" />
                    <circle cx={x + 3} cy="62" r="2.4" />
                    <circle cx={x - 3} cy="62" r="2" />
                  </g>
                </g>
              )
            })}
          </svg>
        </div>

        <div className="cake-message">
          <AnimatePresence mode="wait">
            {lit ? (
              <motion.p
                key="hint"
                className="cake-hint"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                tap the cake ♥
              </motion.p>
            ) : (
              <motion.div
                key="wish"
                className="cake-wish"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
              >
                <h3>Happy Birthday!</h3>
                <p>{config.wishMessage}</p>
                <button onClick={() => setLit(true)}>light them again ✨</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {!lit && (
        <div className="confetti" key={round} aria-hidden="true">
          {confetti.map((c) => (
            <i
              key={c.id}
              style={{
                left: `${c.left}%`,
                width: c.size,
                height: c.round ? c.size : c.size * 0.5,
                borderRadius: c.round ? '50%' : 2,
                background: c.color,
                animationDuration: `${c.dur}s`,
                animationDelay: `${c.delay}s`,
                '--drift': `${c.drift}px`,
              }}
            />
          ))}
        </div>
      )}
    </section>
  )
}