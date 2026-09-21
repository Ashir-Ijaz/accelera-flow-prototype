import { useMemo, useRef } from 'react'
import type { MutableRefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import { Color, Group, PointLight } from 'three'
import { FlowCameraController } from './FlowCameraController'
import { FlowParticles } from './FlowParticles'
import { FieldMotes } from './FieldMotes'
import { ContentScreen3D } from './ContentScreen3D'
import {
  channelScreens,
  contentScreens,
  createFlowCurves,
  teamPositions,
  type MutableProgress,
} from './flowPaths'

type FlowEngineSceneProps = {
  progressRef: MutableRefObject<MutableProgress>
  reduced: boolean
  isMobile: boolean
  activeBoard: string | null
}

function matchesBoard(label: string, board: string | null) {
  if (!board) return false
  if (label === board) return true
  if (board === 'Video' && label === 'Short-form video') return true
  if (board === 'Publish' && label === 'Publishing') return true
  if (board === 'Engage' && label === 'Community') return true
  return false
}

export function FlowEngineScene({ progressRef, reduced, isMobile, activeBoard }: FlowEngineSceneProps) {
  const groupRef = useRef<Group>(null)
  const orangeLight = useRef<PointLight>(null)
  const amberLight = useRef<PointLight>(null)
  const curves = useMemo(() => createFlowCurves(), [])
  const segments = isMobile ? 16 : 28
  const particleCount = isMobile ? 48 : 90
  const moteCount = isMobile ? 32 : 64
  const orange = useMemo(() => new Color('#ff6a00'), [])
  const red = useMemo(() => new Color('#f04400'), [])
  const amber = useMemo(() => new Color('#ff9400'), [])

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

    if (orangeLight.current) {
      orangeLight.current.intensity = 46 + Math.sin(t * 1.7) * 10
      orangeLight.current.position.set(
        -2.4 + Math.sin(t * 0.45) * 2.4,
        2.2 + Math.cos(t * 0.38) * 1.2,
        1 + Math.sin(t * 0.3) * 2.1,
      )
    }
    if (amberLight.current) {
      amberLight.current.intensity = 22 + Math.cos(t * 1.25) * 6
      amberLight.current.position.set(
        Math.sin(t * 0.34) * 4.2,
        1.2 + Math.sin(t * 0.52) * 1.6,
        7 + Math.cos(t * 0.28) * 3.4,
      )
    }
  })

  return (
    <>
      <color attach="background" args={['#160e0c']} />
      <fog attach="fog" args={['#160e0c', 34, 78]} />
      <ambientLight intensity={0.78} />
      <pointLight ref={orangeLight} position={[-2.4, 2.2, 1]} color={orange} intensity={46} distance={32} />
      {isMobile ? null : (
        <>
          <pointLight position={[3.4, 4.2, 3]} color={red} intensity={26} distance={28} />
          <pointLight ref={amberLight} position={[0, 1.2, 7]} color={amber} intensity={22} distance={26} />
        </>
      )}
      <FlowCameraController progressRef={progressRef} reduced={reduced} />
      <group ref={groupRef}>
        <group position={[0, -3.2, -5.4]} scale={0.82}>
          {curves.map((curve, index) => (
            <mesh key={index}>
              <tubeGeometry args={[curve, segments, index === 1 ? 0.065 : 0.085, 6, false]} />
              <meshStandardMaterial
                color={index === 1 ? '#f04400' : '#ff6a00'}
                emissive={index === 2 ? '#ff9400' : '#ff6a00'}
                emissiveIntensity={1.55}
                roughness={0.22}
                metalness={0.08}
              />
            </mesh>
          ))}
          <FlowParticles curves={curves} count={particleCount} />
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <torusGeometry args={[1.2, 0.03, 10, 40]} />
            <meshStandardMaterial color="#ff6a00" emissive="#ff6a00" emissiveIntensity={1.85} />
          </mesh>
          <mesh rotation={[Math.PI / 2.6, 0.4, 0.2]} position={[0.12, 0.16, 0]}>
            <torusGeometry args={[0.74, 0.022, 8, 32, Math.PI * 1.2]} />
            <meshStandardMaterial color="#f04400" emissive="#f04400" emissiveIntensity={1.55} />
          </mesh>
          <mesh position={[-6.4, 2.2, 5.2]} rotation={[0.6, 0.4, 0.2]}>
            <torusGeometry args={[1.8, 0.018, 8, 32]} />
            <meshStandardMaterial color="#ff9400" emissive="#ff9400" emissiveIntensity={1.25} />
          </mesh>
          <mesh position={[6.8, -0.6, 2.4]} rotation={[1.2, -0.3, 0.5]}>
            <torusGeometry args={[1.45, 0.016, 8, 32]} />
            <meshStandardMaterial color="#f04400" emissive="#f04400" emissiveIntensity={1.2} />
          </mesh>
          <mesh position={[-1.2, 3.4, -4.8]} rotation={[0.2, 1.1, 0.4]}>
            <torusGeometry args={[2.2, 0.014, 8, 36]} />
            <meshStandardMaterial color="#ff6a00" emissive="#ff6a00" emissiveIntensity={1.1} />
          </mesh>
        </group>
        <FieldMotes count={moteCount} />
        {contentScreens.map((screen) => (
          <ContentScreen3D
            key={screen.label}
            label={screen.label}
            position={screen.position}
            size={screen.size}
            emphasized={matchesBoard(screen.label, activeBoard)}
            progressRef={progressRef}
          />
        ))}
        {channelScreens.map((screen) => (
          <ContentScreen3D
            key={screen.label}
            label={screen.label}
            kicker={screen.platform}
            position={screen.position}
            size={[2.05, 1.24]}
            emphasized={matchesBoard(screen.label, activeBoard)}
            progressRef={progressRef}
          />
        ))}
        {teamPositions.map((position, index) => (
          <mesh key={index} position={position}>
            <sphereGeometry args={[0.09, 8, 8]} />
            <meshBasicMaterial color={index % 2 ? '#ff9400' : '#ff6a00'} />
          </mesh>
        ))}
      </group>
    </>
  )
}
