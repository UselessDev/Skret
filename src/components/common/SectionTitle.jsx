import Reveal from './Reveal'

export default function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <Reveal className="section-title">
      <span className="section-eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <div className="section-divider" aria-hidden="true">
        <i />
        <b>♥</b>
        <i />
      </div>
      {subtitle && <p>{subtitle}</p>}
    </Reveal>
  )
}