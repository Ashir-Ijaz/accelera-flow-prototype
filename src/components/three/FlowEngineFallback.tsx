import { flowStages } from '../../data/flowStages'
import { media } from '../../data/media'
import { MagneticButton } from '../animation/MagneticButton'
import { DummyImage } from '../ui/DummyImage'

export function FlowEngineFallback() {
  return (
    <div className="flow-fallback">
      <div className="split">
        <div>
          <p className="section-heading__kicker">Content in motion</p>
          <h2>The Flow Engine</h2>
        </div>
        <div className="hero-visual">
          <DummyImage src={media.gradient} className="hero-visual__image" />
        </div>
      </div>
      <div className="flow-static">
        {flowStages.map((stage) => (
          <article key={stage.key} className="flow-static__stage">
            <span className="stage-copy__kicker">{stage.kicker}</span>
            <h3>{stage.title}</h3>
          </article>
        ))}
      </div>
      <MagneticButton to="/contact">Start a project</MagneticButton>
    </div>
  )
}
