import { jobsCopy } from '../../data/jobs'
import { JobApplicationForm } from '../ui/JobApplicationForm'
import { Reveal } from '../animation/Reveal'

export function JobsSection() {
  return (
    <section className="section jobs" aria-label="Job application">
      <Reveal className="section__inner jobs__layout">
        <div>
          <p className="section-heading__kicker">{jobsCopy.kicker}</p>
          <h2>{jobsCopy.title}</h2>
          <p>{jobsCopy.body}</p>
        </div>
        <JobApplicationForm />
      </Reveal>
    </section>
  )
}
