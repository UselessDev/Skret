import { useEffect, useState } from 'react'

const items = [
  { id: 'hero', label: 'Hello' },
  { id: 'memories', label: 'Memories' },
  { id: 'letter', label: 'Letter' },
  { id: 'cake', label: 'Cake' },
]

export default function SideNav() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.5 },
    )
    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <nav className="sidenav" aria-label="Sections">
      {items.map((it) => (
        <a
          key={it.id}
          href={`#${it.id}`}
          className={active === it.id ? 'active' : ''}
          aria-label={it.label}
          data-label={it.label}
        />
      ))}
    </nav>
  )
}