import { useMemo, useRef } from 'react'
import type { MutableRefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import { DoubleSide, Group, Mesh, Vector3 } from 'three'
import { useScreenTexture } from './screenTexture'
import { carouselVisual, chipMatchesScreen, type MutableProgress } from './flowPaths'

type ContentScreen3DProps = {
  label: string
  kicker?: string
  position: readonly [number, number, number]
  size?: readonly [number, number]
  progressRef?: MutableRefObject<MutableProgress>
  kind?: 'stage' | 'ambient'
  stageIndex?: number
}

export function ContentScreen3D({
  label,
  kicker,
  position,
  size = [2.2, 1.32],
  progressRef,
  kind = 'ambient',
  stageIndex = 0,
}: ContentScreen3DProps) {
  const groupRef = useRef<Group>(null)
  const glowRef = useRef<Mesh>(null)
  const screenRef = useRef<Mesh>(null)
  const toward = useMemo(() => new Vector3(), [])
  const right = useMemo(() => new Vector3(), [])
  const motion = useRef({ x: position[0], y: position[1], z: position[2], scale: 1, glow: 0.12, turn: false })
  const { texture } = useScreenTexture(label, kicker)
  const seed = useMemo(() => position[0] * 1.7 + position[2] * 0.6 + stageIndex, [position, stageIndex])
  const skip = useRef(0)

  useFrame((state, delta) => {
    const group = groupRef.current
    if (!group) return
    const visual = progressRef ? carouselVisual(progressRef.current.value) : null
    const neighbor = kind === 'stage' && visual ? stageIndex - visual.turn : 99
    const dist = Math.abs(neighbor)
    const isNear = kind === 'stage' && dist <= 2
    if (!isNear && kind === 'stage') {
      skip.current += 1
      if (skip.current % 3 !== 0) return
    }
    const time = state.clock.elapsedTime
    const dt = Math.min(0.05, delta)
    const follow = 1 - Math.exp(-dt * 13)
    const isTurn = kind === 'stage' && visual ? chipMatchesScreen(label, visual.screen) : false

    const floatX = position[0] + Math.sin(time * 0.55 + seed) * 0.04
    const floatY = position[1] + Math.sin(time * 1.05 + seed) * 0.06
    const floatZ = position[2] + Math.cos(time * 0.42 + seed) * 0.03

    let targetX = floatX
    let targetY = floatY
    let targetZ = floatZ
    let scaleTarget = kind === 'stage' ? 0.68 : 0.85
    let glowTarget = 0.08

    if (kind === 'stage' && visual) {
      // Camera-relative basis so hierarchy holds from any fly-through angle
      toward.set(
        state.camera.position.x - floatX,
        state.camera.position.y - floatY,
        state.camera.position.z - floatZ,
      )
      const len = toward.length() || 1
      toward.multiplyScalar(1 / len)
      right.set(-toward.z, 0, toward.x).normalize()

      if (isTurn) {
        // Bring active card forward into clear air — never buried behind neighbors
        targetX = floatX + toward.x * 1.55
        targetY = floatY + toward.y * 0.35 + 0.15
        targetZ = floatZ + toward.z * 1.55
        scaleTarget = 1.2
        glowTarget = 1
      } else if (dist === 1) {
        const dir = neighbor > 0 ? 1 : -1
        targetX = floatX + right.x * dir * 2.55 - toward.x * 0.85
        targetY = floatY - 0.12
        targetZ = floatZ + right.z * dir * 2.55 - toward.z * 0.85
        scaleTarget = 0.74
        glowTarget = 0.1
      } else if (dist === 2) {
        const dir = neighbor > 0 ? 1 : -1
        targetX = floatX + right.x * dir * 3.4 - toward.x * 1.8
        targetY = floatY - 0.28
        targetZ = floatZ + right.z * dir * 3.4 - toward.z * 1.8
        scaleTarget = 0.52
        glowTarget = 0.04
      } else {
        targetX = floatX - toward.x * 2.4
        targetY = floatY - 0.35
        targetZ = floatZ - toward.z * 2.4
        scaleTarget = 0.36
        glowTarget = 0.02
      }
    }

    const sm = motion.current
    if (isTurn && !sm.turn) sm.glow = 0.7
    if (!isTurn && sm.turn) sm.glow = 0.15
    sm.turn = isTurn
    sm.x += (targetX - sm.x) * follow
    sm.y += (targetY - sm.y) * follow
    sm.z += (targetZ - sm.z) * follow
    sm.scale += (scaleTarget - sm.scale) * follow
    sm.glow += (glowTarget - sm.glow) * (1 - Math.exp(-dt * (isTurn ? 14 : 18)))

    group.position.set(sm.x, sm.y, sm.z)
    group.lookAt(state.camera.position)
    group.rotateZ(Math.sin(time * 0.7 + seed) * 0.028)
    group.rotateX(Math.sin(time * 0.5 + seed) * 0.018)
    group.scale.setScalar(sm.scale)
    group.visible = kind !== 'stage' || dist <= 4
    group.renderOrder = isTurn ? 3 : dist <= 1 ? 1 : 0

    const glow = glowRef.current
    if (glow) {
      glow.visible = isTurn
      glow.renderOrder = 4
      glow.scale.setScalar(1.08 + Math.sin(time * 3.2) * 0.04)
      const material = glow.material
      if (material && 'opacity' in material) {
        material.opacity = isTurn ? 0.32 + Math.sin(time * 3.2) * 0.1 : 0
      }
    }

    const screen = screenRef.current
    if (screen) {
      screen.renderOrder = isTurn ? 3 : 0
      const screenMaterial = screen.material
      if (screenMaterial && 'emissiveIntensity' in screenMaterial) {
        screenMaterial.emissiveIntensity = isTurn ? 1.6 : dist <= 1 ? 0.34 : 0.12
      }
    }
  })

  return (
    <group ref={groupRef} position={position}>
      <mesh ref={glowRef} visible={false} position={[0, 0, -0.04]}>
        <planeGeometry args={[size[0] + 0.28, size[1] + 0.28]} />
        <meshBasicMaterial color="#ff6a00" transparent opacity={0} side={DoubleSide} depthWrite={false} />
      </mesh>
      <mesh ref={screenRef}>
        <planeGeometry args={[size[0], size[1]]} />
        <meshStandardMaterial
          map={texture}
          emissive="#ff6a00"
          emissiveIntensity={0.32}
          side={DoubleSide}
          polygonOffset
          polygonOffsetFactor={-2}
          polygonOffsetUnits={-2}
        />
      </mesh>
    </group>
  )
}
