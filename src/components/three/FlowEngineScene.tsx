import { useMemo, useRef } from 'react'
import type { MutableRefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'
import { FlowCameraController, getFlowPointer } from './FlowCameraController'
import { FlowParticles } from './FlowParticles'
import { FieldMotes } from './FieldMotes'
import { ContentScreen3D } from './ContentScreen3D'
import {
  channelScreens,
  contentScreens,
  createCardLinkCurve,
  createFlowCurves,
  type MutableProgress,
} from './flowPaths'

type FlowEngineSceneProps = {
  progressRef: MutableRefObject<MutableProgress>
  reduced: boolean
  isMobile: boolean
}

const RIBBON_LOOK = [
  { radius: 0.022, color: '#ff6a00', opacity: 0.9 },
  { radius: 0.02, color: '#f04400', opacity: 0.85 },
  { radius: 0.015, color: '#ff9400', opacity: 0.5 },
  { radius: 0.017, color: '#ff6a00', opacity: 0.55 },
  { radius: 0.017, color: '#f04400', opacity: 0.5 },
] as const

export function FlowEngineScene({ progressRef, reduced, isMobile }: FlowEngineSceneProps) {
  const ambientRef = useRef<Group>(null)
  const worldRef = useRef<Group>(null)
  const sway = useRef({ x: 0, y: 0 })
  const spine = useMemo(() => createCardLinkCurve(), [])
  const ribbons = useMemo(() => createFlowCurves(), [])
  const segments = isMobile ? 28 : 48
  const moteCount = isMobile ? 12 : 22

  useFrame((state, delta) => {
    const pointer = getFlowPointer()
    const follow = Math.min(1, delta * 1.15)
    sway.current.x += (pointer.x - sway.current.x) * follow
    sway.current.y += (pointer.y - sway.current.y) * follow

    const world = worldRef.current
    if (world) {
      world.position.x = sway.current.x * 0.38
      world.position.y = -sway.current.y * 0.22
      world.rotation.y = sway.current.x * 0.08
      world.rotation.x = -sway.current.y * 0.05
    }

    const ambient = ambientRef.current
    if (!ambient) return
    const t = state.clock.elapsedTime
    ambient.position.y = Math.sin(t * 0.35) * 0.08 + sway.current.y * -0.12
    ambient.rotation.y = Math.sin(t * 0.2) * 0.02 + sway.current.x * 0.06
  })

  return (
    <>
      <color attach="background" args={['#160e0c']} />
      <fog attach="fog" args={['#160e0c', 24, 62]} />
      <ambientLight intensity={0.8} />
      <pointLight position={[-2.2, 2.4, 2]} color="#ff6a00" intensity={40} distance={34} />
      <FlowCameraController progressRef={progressRef} reduced={reduced} />

      <group ref={worldRef}>
        <group>
          {contentScreens.map((screen, index) => (
            <ContentScreen3D
              key={screen.label}
              label={screen.label}
              position={screen.position}
              size={screen.size}
              kind="stage"
              stageIndex={index}
              progressRef={progressRef}
            />
          ))}

          <mesh>
            <tubeGeometry args={[spine, isMobile ? 36 : 64, 0.028, 6, false]} />
            <meshBasicMaterial color="#ff6a00" />
          </mesh>
          <FlowParticles curves={[spine]} count={isMobile ? 10 : 16} />
        </group>

        <group ref={ambientRef}>
          {ribbons.map((curve, index) => {
            const look = RIBBON_LOOK[index] ?? RIBBON_LOOK[0]
            return (
              <mesh key={index}>
                <tubeGeometry args={[curve, segments, look.radius, 5, false]} />
                <meshBasicMaterial
                  color={look.color}
                  transparent
                  opacity={look.opacity}
                  depthWrite={false}
                />
              </mesh>
            )
          })}
          <FieldMotes count={moteCount} />
          {channelScreens.map((screen, index) => (
            <ContentScreen3D
              key={`${screen.platform}-${screen.label}-${index}`}
              label={screen.label}
              kicker={screen.platform}
              position={screen.position}
              size={[1.8, 1.08]}
            />
          ))}
        </group>
      </group>
    </>
  )
}
