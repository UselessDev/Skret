import { useEffect, useRef, useState } from 'react'

const SYMBOLS = ['♥', '♡', '✦', '❀', '✧', '❤']
const COLORS = ['#ff8fb4', '#ffd98e', '#ffb3cd', '#f0568a', '#fff0f5', '#c77dff']
const COUNT = 9

/**
 * Every click / tap spawns a ripple ring and a burst of hearts + sparkles
 * at the pointer position. Mounted once in App.jsx.
 */
export default function ClickEffects() {
  const [bursts, setBursts] = useState([])
  const idRef = useRef(0)

  useEffect(() => {
    const onDown = (e) => {
      const id = (idRef.current += 1)
      const particles = Array.from({ length: COUNT }, (_, i) => {
        const angle = (i / COUNT) * Math.PI * 2 + Math.random() * 0.6
        const dist = 45 + Math.random() * 60
        return {
          i,
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist - 25, // slight upward lift
          size: 12 + Math.random() * 14,
          rot: (Math.random() - 0.5) * 90,
          sym: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        }
      })
      setBursts((b) => [...b.slice(-6), { id, x: e.clientX, y: e.clientY, particles }])
      setTimeout(() => setBursts((b) => b.filter((x) => x.id !== id)), 1200)
    }
    window.addEventListener('pointerdown', onDown)
    return () => window.removeEventListener('pointerdown', onDown)
  }, [])

  return (
    <div className="click-fx" aria-hidden="true">
      {bursts.map((b) => (
        <div key={b.id} className="click-burst" style={{ left: b.x, top: b.y }}>
          <span className="click-ring" />
          {b.particles.map((p) => (
            <em
              key={p.i}
              style={{
                '--dx': `${p.dx}px`,
                '--dy': `${p.dy}px`,
                '--rot': `${p.rot}deg`,
                fontSize: p.size,
                color: p.color,
              }}
            >
              {p.sym}
            </em>
          ))}
        </div>
      ))}
    </div>
  )
}