import { useEffect, useState } from 'react'

/** Types `text` out one character at a time once `start` is true. */
export default function useTypewriter(text, { start = true, speed = 140, delay = 500 } = {}) {
  const [out, setOut] = useState('')

  useEffect(() => {
    if (!start) {
      setOut('')
      return undefined
    }
    let i = 0
    let interval
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1
        setOut(text.slice(0, i))
        if (i >= text.length) clearInterval(interval)
      }, speed)
    }, delay)
    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [text, start, speed, delay])

  return out
}