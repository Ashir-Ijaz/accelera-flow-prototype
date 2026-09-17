import { MagneticButton } from '../animation/MagneticButton'

export function WebGLErrorFallback() {
  return (
    <div className="webgl-fallback">
      <p className="section-heading__kicker">Flow engine fallback</p>
      <h2>The spatial scene could not start on this device.</h2>
      <p>
        The same journey still holds: idea, create, publish, engage, opportunity. Explore the work through
        the sections below.
      </p>
      <div className="stage-copy__actions">
        <MagneticButton to="/contact">Start a project</MagneticButton>
        <MagneticButton to="/brands" className="btn btn--ghost">
          Explore our brands
        </MagneticButton>
      </div>
    </div>
  )
}
