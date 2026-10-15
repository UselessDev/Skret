import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import config from '../../data/config'
import SectionTitle from '../common/SectionTitle'
import './MemoryBook.css'

/* ---------- page faces ---------- */
const Photo = ({ memory, n }) => (
  <div className="page photo-page">
    <div className="polaroid" style={{ '--tilt': n % 2 ? '2.5deg' : '-2.5deg' }}>
      <span className="tape" />
      <img src={memory.image} alt={memory.title} draggable="false" />
      <p>{memory.date}</p>
    </div>
    <span className="page-num">{n * 2 - 1}</span>
  </div>
)

const Text = ({ memory, n }) => (
  <div className="page text-page">
    <small>{memory.date}</small>
    <h3>{memory.title}</h3>
    <p>{memory.text}</p>
    <span className="doodle">♥</span>
    <span className="page-num">{n * 2}</span>
  </div>
)

/* Floating hearts + photos that drift around behind the book once it is open */
const SLOTS = [
  [3, 6], [78, 4], [6, 46], [82, 44], [2, 80], [80, 78], [38, 0], [44, 86],
]
const rand = (min, max) => min + Math.random() * (max - min)

function BookBackdrop() {
  const [out, setOut] = useState(false) // false = tucked behind the book
  useEffect(() => {
    const t = setTimeout(() => setOut(true), 450)
    return () => clearTimeout(t)
  }, [])

  const items = useMemo(() => {
    const photos = config.memories.map((m, i) => {
      const [left, top] = SLOTS[i % SLOTS.length]
      return {
        type: 'img',
        src: m.image,
        left,
        top,
        scale: rand(0.85, 1.25),
        // wandering path (px) – the photo glides through these points and back
        x1: rand(-90, 90), y1: rand(-70, 50),
        x2: rand(-120, 120), y2: rand(-90, 70),
        x3: rand(-80, 80), y3: rand(-60, 80),
        dur: rand(16, 26),
        bob: rand(3.5, 6),
        rot: (i % 2 ? 1 : -1) * rand(5, 12),
        delay: i * 0.35,
      }
    })
    const hearts = Array.from({ length: 24 }, (_, i) => ({
      type: 'heart',
      sym: ['♥', '♡', '❤'][i % 3],
      left: rand(0, 96),
      top: rand(0, 92),
      size: rand(14, 34),
      x1: rand(-60, 60), y1: rand(-80, -20),
      x2: rand(-60, 60), y2: rand(-120, -40),
      dur: rand(7, 14),
      delay: -rand(0, 10),
    }))
    return [...photos, ...hearts]
  }, [])

  return (
    <motion.div
      className="backdrop"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
    >
      {items.map((it, i) =>
        it.type === 'img' ? (
          <div
            key={i}
            className={`bd-photo ${out ? 'out' : ''}`}
            style={{
              // starts at the centre of the book, then flies out to its own spot
              left: out ? `${it.left}%` : 'calc(50% - var(--bd-w) / 2)',
              top: out ? `${it.top}%` : '50%',
              '--s': it.scale,
              '--x1': `${it.x1}px`, '--y1': `${it.y1}px`,
              '--x2': `${it.x2}px`, '--y2': `${it.y2}px`,
              '--x3': `${it.x3}px`, '--y3': `${it.y3}px`,
              '--rot': `${it.rot}deg`,
              '--bob': `${it.bob}s`,
              '--delay': `${it.delay}s`,
              animationDuration: `${it.dur}s`,
            }}
          >
            <div className="bd-card">
              <img src={it.src} alt="" />
              <span className="bd-tape" />
            </div>
          </div>
        ) : (
          <span
            key={i}
            className="bd-heart"
            style={{
              left: `${it.left}%`,
              top: `${it.top}%`,
              fontSize: it.size,
              '--x1': `${it.x1}px`, '--y1': `${it.y1}px`,
              '--x2': `${it.x2}px`, '--y2': `${it.y2}px`,
              animationDuration: `${it.dur}s`,
              animationDelay: `${it.delay}s`,
            }}
          >
            {it.sym}
          </span>
        ),
      )}
    </motion.div>
  )
}

export default function MemoryBook() {
  const { memories, diary, herName } = config
  const M = memories.length

  /* Leaves of the book (each has a front and a back).
     Spread after flipping leaf 1:  [photo 1 | text 1]  then [photo 2 | text 2] ... */
  const leaves = useMemo(() => {
    const list = []
    list.push({
      front: (
        <div className="cover">
          <div className="cover-frame">
            <span className="cover-heart">♥</span>
            <h3>{diary.title}</h3>
            <p>for {herName}</p>
            <em>tap to open</em>
          </div>
        </div>
      ),
      back: (
        <div className="page inside-cover">
          <span>✦ This diary belongs to ✦</span>
          <strong>{herName}</strong>
          <i>♥</i>
        </div>
      ),
    })
    list.push({
      front: (
        <div className="page dedication">
          <h3>Dear {herName},</h3>
          <p>{diary.dedication}</p>
          <em>turn the page →</em>
        </div>
      ),
      back: <Photo memory={memories[0]} n={1} />,
    })
    for (let k = 1; k < M; k += 1) {
      list.push({
        front: <Text memory={memories[k - 1]} n={k} />,
        back: <Photo memory={memories[k]} n={k + 1} />,
      })
    }
    list.push({
      front: <Text memory={memories[M - 1]} n={M} />,
      back: (
        <div className="page end-page">
          <span className="big-heart">♥</span>
          <h3>To be continued…</h3>
          <p>Because the best chapters are still ahead of us.</p>
        </div>
      ),
    })
    return list
  }, [M])

  const total = leaves.length
  const [flipped, setFlipped] = useState(0)
  const isOpen = flipped > 0
  const next = () => setFlipped((f) => Math.min(total, f + 1))
  const prev = () => setFlipped((f) => Math.max(0, f - 1))

  const onLeafClick = (i) => {
    if (i === flipped) next()
    else if (i === flipped - 1) prev()
  }

  return (
    <section id="memories" className="memories">
      <div className="memories-bg" />
      <AnimatePresence>{isOpen && <BookBackdrop key="bd" />}</AnimatePresence>

      <div className="memories-inner">
        <SectionTitle
          eyebrow="chapter one"
          title="Our Little Memories"
          subtitle="Open the diary and turn the pages. Every one is a moment I keep close."
        />

        <div className="book-stage">
          <div className={`book ${isOpen ? 'open' : 'closed'}`}>
            <div className="book-shadow" />
            {/* right-hand base page revealed once everything is flipped */}
            <div className="base-page">
              <div className="page end-page">
                <span className="big-heart">♥</span>
                <h3>Happy Birthday</h3>
                <p>I love you more than words can ever say.</p>
              </div>
            </div>

            {leaves.map((leaf, i) => {
              const isFlipped = i < flipped
              return (
                <div
                  key={i}
                  className={`leaf ${isFlipped ? 'flipped' : ''} ${i === 0 ? 'is-cover' : ''}`}
                  style={{ zIndex: isFlipped ? i + 1 : total - i }}
                  onClick={() => onLeafClick(i)}
                >
                  <div className="face front">{leaf.front}</div>
                  <div className="face back">{leaf.back}</div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="book-controls">
          <button onClick={prev} disabled={!isOpen} aria-label="Previous page">
            ‹
          </button>
          <span>
            {!isOpen ? 'closed' : flipped === total ? 'the end' : `page ${flipped} of ${total - 1}`}
          </span>
          <button onClick={next} disabled={flipped === total} aria-label="Next page">
            ›
          </button>
          {isOpen && (
            <button className="book-close" onClick={() => setFlipped(0)}>
              close book
            </button>
          )}
        </div>
      </div>
    </section>
  )
}