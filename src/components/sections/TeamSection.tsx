import { motion } from 'framer-motion'
import { teamMembers } from '../../data/team'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { SectionHeading } from '../layout/SectionHeading'
import { DummyImage } from '../ui/DummyImage'

const ease = [0.22, 1, 0.36, 1] as const

export function TeamSection() {
  const reduced = usePrefersReducedMotion()

  return (
    <section className="section team" aria-label="Team">
      <div className="section__inner">
        <SectionHeading
          kicker="Team"
          title="Who sits at those desks."
          body="A student team behind faceless brands. Names and desks, not public faces. No personal inboxes are listed here."
        />
        <ul className="team-grid">
          {teamMembers.map((member, index) => (
            <motion.li
              key={member.id}
              initial={reduced ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.05, ease }}
            >
              <article className="team-card">
                <div className="team-card__visual">
                  <DummyImage src={member.visual} alt="" />
                  <span aria-hidden="true">{member.name.slice(0, 1)}</span>
                </div>
                <p className="team-card__role">{member.role}</p>
                <h3>{member.name}</h3>
                <p className="team-card__desk">{member.desk}</p>
                <p>{member.focus}</p>
              </article>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
