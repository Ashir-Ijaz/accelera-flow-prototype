import { AdaptiveDpr } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import type { MutableRefObject } from 'react'
import { FlowEngineScene } from './FlowEngineScene'
import type { MutableProgress } from './flowPaths'

type FlowEngineCanvasProps = {
  progressRef: MutableRefObject<MutableProgress>
  reduced: boolean
  isMobile: boolean
  active: boolean
  activeBoard: string | null
}

export function FlowEngineCanvas({
  progressRef,
  reduced,
  isMobile,
  active,
  activeBoard,
}: FlowEngineCanvasProps) {
  return (
    <div className="flow-engine__canvas" aria-hidden="true">
      <Canvas
        dpr={isMobile ? 1 : [1, 1.15]}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          toneMappingExposure: 1.45,
        }}
        camera={{ fov: 41, near: 0.1, far: 120, position: [0.16, 2.82, 16.2] }}
        frameloop={active ? 'always' : 'demand'}
        performance={{ min: 0.55, max: 1, debounce: 180 }}
        style={{ pointerEvents: 'none', width: '100%', height: '100%', display: 'block' }}
      >
        <AdaptiveDpr />
        <FlowEngineScene
          progressRef={progressRef}
          reduced={reduced}
          isMobile={isMobile}
          activeBoard={activeBoard}
        />
      </Canvas>
    </div>
  )
}

export default FlowEngineCanvas
