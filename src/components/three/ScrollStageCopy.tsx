import { AnimatePresence, motion } from 'framer-motion'
import { chipMatchesScreen, flowStages } from '../../data/flowStages'
import { MagneticButton } from '../animation/MagneticButton'
import type { FlowStage } from '../../types'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type ScrollStageCopyProps = {
  stage: FlowStage
  focusIndex?: number
  activeScreen?: string
}

const ease = [0.22, 1, 0.36, 1] as const

export function ScrollStageCopy({ stage, focusIndex = 0, activeScreen }: ScrollStageCopyProps) {
  const reduced = usePrefersReducedMotion()
  const flip = stage.alignment === 'right' || stage.alignment === 'right-centre'
  const enterX = flip ? 32 : -32

  return (
    <div className={`flow-engine__copy${flip ? ' is-flip' : ''}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={stage.key}
          className="stage-copy"
          initial={reduced ? false : { opacity: 0, y: 24, x: enterX * 0.4 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: -16, x: enterX * -0.25 }}
          transition={{ duration: 0.42, ease }}
        >
          <motion.span
            className="stage-copy__kicker"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, delay: 0.04, ease }}
          >
            {stage.kicker}
          </motion.span>
          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08, ease }}
          >
            {stage.title}
          </motion.h2>
          {stage.key === 'arrival' || stage.key === 'resolution' ? (
            <motion.div
              className="stage-copy__actions"
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.34, delay: 0.16, ease }}
            >
              {stage.key === 'arrival' ? (
                <MagneticButton to="/promote" className="btn btn--promote">
                  Promotion
                </MagneticButton>
              ) : null}
              <MagneticButton to="/contact">Start a project</MagneticButton>
            </motion.div>
          ) : null}
        </motion.div>
      </AnimatePresence>
      <aside className="board-rail" aria-hidden="true">
        <div className="board-rail__stack">
          <AnimatePresence>
            {stage.boards.slice(0, 4).map((board, index) => {
              const isOn = activeScreen ? chipMatchesScreen(board, activeScreen) : index === focusIndex
              return (
                <motion.article
                  key={`${stage.key}-${board}`}
                  className={`board-chip${isOn ? ' is-on' : ''}`}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.96 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: isOn ? 1.05 : 1,
                  }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.96 }}
                  transition={{
                    duration: reduced ? 0.18 : 0.36,
                    delay: reduced ? 0 : index * 0.05,
                    ease,
                  }}
                >
                  <div className="board-chip__face">
                    <span className="board-chip__index">{String(index + 1).padStart(2, '0')}</span>
                    <span className="board-chip__label">{board}</span>
                    <i className="board-chip__live" aria-hidden="true" />
                    <b className="board-chip__sheen" aria-hidden="true" />
                  </div>
                </motion.article>
              )
            })}
          </AnimatePresence>
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
