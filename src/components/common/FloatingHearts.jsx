import { useMemo } from 'react'

/** Soft hearts / sparkles that drift upward. Purely decorative. */
export default function FloatingHearts({ count = 18, symbols = ['♥', '♡', '✦', '❀'], color }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 10 + Math.random() * 22,
        dur: 10 + Math.random() * 10,
        delay: -Math.random() * 20,
        sway: (Math.random() - 0.5) * 80,
        sym: symbols[i % symbols.length],
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count],
  )

  return (
    <div className="fh" aria-hidden="true" style={color ? { '--fh-color': color } : undefined}>
      {items.map((h) => (
        <span
          key={h.id}
          style={{
            left: `${h.left}%`,
            fontSize: h.size,
            animationDuration: `${h.dur}s`,
            animationDelay: `${h.delay}s`,
            '--sway': `${h.sway}px`,
          }}
        >
          {h.sym}
        </span>
      ))}
    </div>
  )
}