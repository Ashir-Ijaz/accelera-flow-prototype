import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { flowStages } from '../../data/flowStages'
import { MagneticButton } from '../animation/MagneticButton'
import type { FlowStage } from '../../types'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type ScrollStageCopyProps = {
  stage: FlowStage
}

const ease = [0.22, 1, 0.36, 1] as const

const stackVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
  leave: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

function chipVariants(flip: boolean, reduced: boolean): Variants {
  if (reduced) {
    return {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.2 } },
      leave: { opacity: 0, transition: { duration: 0.15 } },
    }
  }

  const enterX = flip ? -42 : 42
  const leaveX = flip ? 28 : -28

  return {
    hidden: {
      opacity: 0,
      x: enterX,
      y: 14,
      rotateY: flip ? 58 : -58,
      rotateX: 10,
      scale: 0.82,
      filter: 'blur(10px)',
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.46, ease },
    },
    leave: {
      opacity: 0,
      x: leaveX,
      y: -12,
      rotateY: flip ? -38 : 38,
      scale: 0.88,
      filter: 'blur(8px)',
      transition: { duration: 0.32, ease },
    },
  }
}

export function ScrollStageCopy({ stage }: ScrollStageCopyProps) {
  const reduced = usePrefersReducedMotion()
  const flip = stage.alignment === 'right' || stage.alignment === 'right-centre'
  const enterX = flip ? 28 : -28
  const chips = chipVariants(flip, reduced)

  return (
    <div className={`flow-engine__copy${flip ? ' is-flip' : ''}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={stage.key}
          className="stage-copy"
          initial={reduced ? false : { opacity: 0, y: 22, x: enterX * 0.35 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: -18, x: enterX * -0.2 }}
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
        <AnimatePresence mode="wait">
          <motion.div
            key={stage.key}
            className="board-rail__stack"
            variants={stackVariants}
            initial="hidden"
            animate="show"
            exit="leave"
          >
            {stage.boards.slice(0, 4).map((board) => (
              <motion.span key={board} variants={chips}>
                {board}
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>
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
