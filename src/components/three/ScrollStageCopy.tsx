import { AnimatePresence, motion } from 'framer-motion'
import { flowStages } from '../../data/flowStages'
import { MagneticButton } from '../animation/MagneticButton'
import type { FlowStage } from '../../types'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type ScrollStageCopyProps = {
  stage: FlowStage
}

export function ScrollStageCopy({ stage }: ScrollStageCopyProps) {
  const reduced = usePrefersReducedMotion()
  const flip = stage.alignment === 'right' || stage.alignment === 'right-centre'

  return (
    <div className={`flow-engine__copy${flip ? ' is-flip' : ''}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={stage.key}
          className="stage-copy"
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: reduced ? 0.2 : 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="stage-copy__kicker">{stage.kicker}</span>
          <h2>{stage.title}</h2>
          {stage.key === 'arrival' || stage.key === 'resolution' ? (
            <div className="stage-copy__actions">
              {stage.key === 'arrival' ? (
                <MagneticButton to="/promote" className="btn btn--promote">
                  Promotion
                </MagneticButton>
              ) : null}
              <MagneticButton to="/contact">Start a project</MagneticButton>
            </div>
          ) : null}
        </motion.div>
      </AnimatePresence>
      <aside className="board-rail" aria-hidden="true">
        <div className="board-rail__stack">
          {stage.boards.slice(0, 4).map((board) => (
            <span key={board}>{board}</span>
          ))}
        </div>
      </aside>
      <nav className="stage-ticker" aria-label="Flow stages">
        {flowStages.map((item) => (
          <i key={item.key} className={item.key === stage.key ? 'is-on' : undefined} />
        ))}
        {stage.key === 'arrival' ? <em className="scroll-hint-inline">Scroll</em> : null}
      </nav>
    </div>
  )
}
