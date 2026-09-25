import { Canvas } from '@react-three/fiber'
import type { MutableRefObject } from 'react'
import { FlowEngineScene } from './FlowEngineScene'
import { openingCameraPosition, type MutableProgress } from './flowPaths'

type FlowEngineCanvasProps = {
  progressRef: MutableRefObject<MutableProgress>
  reduced: boolean
  isMobile: boolean
  active: boolean
}

export function FlowEngineCanvas({
  progressRef,
  reduced,
  isMobile,
  active,
}: FlowEngineCanvasProps) {
  return (
    <div className="flow-engine__canvas" aria-hidden="true">
      <Canvas
        dpr={isMobile ? 1 : [1, 1.1]}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
          toneMappingExposure: 1.45,
        }}
        camera={{ fov: 48, near: 0.1, far: 140, position: [...openingCameraPosition] }}
        frameloop={active ? 'always' : 'never'}
        performance={{ min: 0.5, max: 1, debounce: 160 }}
        style={{ pointerEvents: 'none', width: '100%', height: '100%', display: 'block' }}
      >
        <FlowEngineScene
          progressRef={progressRef}
          reduced={reduced}
          isMobile={isMobile}
        />
      </Canvas>
    </div>
  )
}

export default FlowEngineCanvas
