import { useMemo, useRef } from 'react'
import type { MutableRefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'
import { FlowCameraController } from './FlowCameraController'
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

export function FlowEngineScene({ progressRef, reduced, isMobile }: FlowEngineSceneProps) {
  const groupRef = useRef<Group>(null)
  const curves = useMemo(() => createFlowCurves(), [])
  const cardLink = useMemo(() => createCardLinkCurve(), [])
  const segments = isMobile ? 12 : 20
  const particleCount = isMobile ? 28 : 52
  const moteCount = isMobile ? 18 : 36
  useFrame((state) => {
    const group = groupRef.current
    const p = progressRef.current.value
    if (!group) return
    const t = state.clock.elapsedTime
    group.position.x = Math.sin(t * 0.32) * 0.18
    group.position.y = Math.sin(t * 0.46) * 0.2
    group.rotation.y = p * 0.55 + Math.sin(t * 0.26) * 0.06
    group.rotation.x = Math.sin(p * Math.PI) * 0.12 + Math.sin(t * 0.18) * 0.03
    group.rotation.z = Math.sin(t * 0.2) * 0.028 + Math.sin(p * Math.PI * 2) * 0.08
  })

  return (
    <>
      <color attach="background" args={['#160e0c']} />
      <fog attach="fog" args={['#160e0c', 34, 78]} />
      <ambientLight intensity={0.78} />
      <pointLight position={[-2.4, 2.2, 1]} color="#ff6a00" intensity={42} distance={32} />
      <FlowCameraController progressRef={progressRef} reduced={reduced} />
      <group ref={groupRef}>
        <group>
          {curves.map((curve, index) => (
            <mesh key={index}>
              <tubeGeometry args={[curve, segments, index === 1 ? 0.065 : 0.085, 6, false]} />
              <meshBasicMaterial color={index === 1 ? '#f04400' : '#ff6a00'} />
            </mesh>
          ))}
          <mesh>
            <tubeGeometry args={[cardLink, isMobile ? 16 : 28, 0.055, 6, false]} />
            <meshBasicMaterial color="#ff9400" />
          </mesh>
        </group>
        <FlowParticles curves={[...curves, cardLink]} count={particleCount} />
        <FieldMotes count={moteCount} />
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.2, 0.03, 8, 28]} />
          <meshBasicMaterial color="#ff6a00" />
        </mesh>
        <mesh rotation={[Math.PI / 2.6, 0.4, 0.2]} position={[0.12, 0.16, 0]}>
          <torusGeometry args={[0.74, 0.022, 6, 24, Math.PI * 1.2]} />
          <meshBasicMaterial color="#f04400" />
        </mesh>
        <mesh position={[-6.4, 2.2, 5.2]} rotation={[0.6, 0.4, 0.2]}>
          <torusGeometry args={[1.8, 0.018, 6, 24]} />
          <meshBasicMaterial color="#ff9400" />
        </mesh>
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
        {channelScreens.map((screen, index) => (
          <ContentScreen3D
            key={`${screen.platform}-${screen.label}-${index}`}
            label={screen.label}
            kicker={screen.platform}
            position={screen.position}
            size={[2.05, 1.24]}
          />
        ))}
      </group>
    </>
  )
}
