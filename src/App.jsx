import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import config from './data/config'
import Welcome from './components/Welcome/Welcome'
import Hero from './components/Hero/Hero'
import MemoryBook from './components/MemoryBook/MemoryBook'
import LoveLetter from './components/LoveLetter/LoveLetter'
import BirthdayCake from './components/BirthdayCake/BirthdayCake'
import SideNav from './components/common/SideNav'
import MusicToggle from './components/common/MusicToggle'

export default function App() {
  const [opened, setOpened] = useState(false)

  return (
    <AnimatePresence mode="wait">
      {!opened ? (
        <Welcome key="welcome" onOpen={() => setOpened(true)} />
      ) : (
        <motion.main
          key="main"
          className="main"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        >
          <SideNav />
          <MusicToggle autoPlay />
          <Hero />
          <MemoryBook />
          <LoveLetter />
          <BirthdayCake />
          <footer className="footer">
            <p className="footer-script">Happy Birthday, {config.herName}</p>
            <p>{config.footerNote}</p>
            <p className="footer-from">— {config.fromName} ♥</p>
          </footer>
        </motion.main>
      )}
    </AnimatePresence>
  )
}