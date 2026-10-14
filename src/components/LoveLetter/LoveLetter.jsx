import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import config from '../../data/config'
import SectionTitle from '../common/SectionTitle'
import FloatingHearts from '../common/FloatingHearts'
import './LoveLetter.css'

export default function LoveLetter() {
  const { letter, fromName, herName } = config
  const [stage, setStage] = useState('closed') // closed -> opening -> reading

  const openEnvelope = () => {
    if (stage !== 'closed') return
    setStage('opening')
    setTimeout(() => setStage('reading'), 2200)
  }

  return (
    <section id="letter" className="letter">
      <div className="letter-bg" />
      <FloatingHearts count={14} color="rgba(240, 86, 138, 0.35)" />

      <div className="letter-inner">
        <SectionTitle
          eyebrow="chapter two"
          title="A Letter for Your Birthday"
          subtitle="I wrote this with you in my heart. Open it when you are ready."
        />

        <AnimatePresence mode="wait">
          {stage !== 'reading' ? (
            <motion.div
              key="envelope"
              className="env-wrap"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              exit={{ opacity: 0, y: 80, scale: 0.8, transition: { duration: 0.7 } }}
              transition={{ duration: 1 }}
            >
              <button
                className={`env ${stage}`}
                onClick={openEnvelope}
                aria-label="Open the love letter"
              >
                <span className="env-back" />
                <span className="env-paper">
                  <i />
                  <i />
                  <i />
                  <i className="short" />
                </span>
                <span className="env-front" />
                <span className="env-flap" />
                <span className="env-seal">♥</span>
                <span className="env-to">To: {herName}</span>
              </button>
              <p className="env-hint">{stage === 'closed' ? 'tap the envelope ♥' : '…'}</p>
            </motion.div>
          ) : (
            <motion.article
              key="paper"
              className="paper"
              initial={{ opacity: 0, y: 120, scale: 0.7, rotate: -4 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, y: 60, scale: 0.8 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="corner tl">❀</span>
              <span className="corner tr">❀</span>
              <span className="corner bl">❀</span>
              <span className="corner br">❀</span>

              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.9 }}
              >
                {letter.greeting}
              </motion.h3>

              {letter.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 1.2 + i * 0.9, duration: 1 }}
                >
                  {p}
                </motion.p>
              ))}

              <motion.div
                className="paper-sign"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 + letter.paragraphs.length * 0.9, duration: 1.2 }}
              >
                <span>{letter.closing}</span>
                <strong>{fromName}</strong>
                <i className="wax">♥</i>
              </motion.div>

              <button className="fold" onClick={() => setStage('closed')}>
                fold it back ✉
              </button>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}