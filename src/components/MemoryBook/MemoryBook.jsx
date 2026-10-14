import { useMemo, useState } from 'react'
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

/* Floating hearts + photos that appear behind the book once it is open */
function BookBackdrop() {
  const items = useMemo(() => {
    const photos = config.memories.map((m, i) => ({
      type: 'img',
      src: m.image,
      left: 4 + ((i * 17) % 86),
      top: 8 + ((i * 29) % 70),
      size: 70 + (i % 3) * 22,
      dur: 9 + (i % 4) * 2.5,
      rot: (i % 2 ? 1 : -1) * (6 + i * 2),
    }))
    const hearts = Array.from({ length: 22 }, (_, i) => ({
      type: 'heart',
      sym: ['♥', '♡', '❤'][i % 3],
      left: Math.random() * 96,
      top: Math.random() * 92,
      size: 14 + Math.random() * 30,
      dur: 4 + Math.random() * 6,
      delay: Math.random() * 3,
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
      transition={{ duration: 1.4 }}
    >
      {items.map((it, i) =>
        it.type === 'img' ? (
          <div
            key={i}
            className="bd-photo"
            style={{
              left: `${it.left}%`,
              top: `${it.top}%`,
              width: it.size,
              height: it.size * 1.15,
              '--rot': `${it.rot}deg`,
              animationDuration: `${it.dur}s`,
            }}
          >
            <img src={it.src} alt="" />
          </div>
        ) : (
          <span
            key={i}
            className="bd-heart"
            style={{
              left: `${it.left}%`,
              top: `${it.top}%`,
              fontSize: it.size,
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