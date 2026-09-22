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
  const camLocal = useMemo(() => new Vector3(), [])
  const side = useMemo(() => new Vector3(), [])
  const motion = useRef({ x: position[0], y: position[1], z: position[2], scale: 1, glow: 0.12, turn: false })
  const { texture } = useScreenTexture(label, kicker)
  const seed = useMemo(() => position[0] * 1.7 + position[2] * 0.6 + stageIndex, [position, stageIndex])
  const skip = useRef(0)

  useFrame((state, delta) => {
    const group = groupRef.current
    if (!group) return
    const visual = progressRef ? carouselVisual(progressRef.current.value) : null
    const neighbor = kind === 'stage' && visual ? stageIndex - visual.turn : 99
    const isNear = kind === 'stage' && Math.abs(neighbor) <= 1
    if (!isNear) {
      skip.current += 1
      if (skip.current % 3 !== 0) return
    }
    const time = state.clock.elapsedTime
    const dt = Math.min(0.05, delta)
    const follow = 1 - Math.exp(-dt * 10)
    const isTurn = kind === 'stage' && visual ? chipMatchesScreen(label, visual.screen) : false

    const floatX = position[0] + Math.sin(time * 0.55 + seed) * 0.1
    const floatY = position[1] + Math.sin(time * 1.05 + seed) * 0.14
    const floatZ = position[2] + Math.cos(time * 0.42 + seed) * 0.08

    let targetX = floatX
    let targetY = floatY
    let targetZ = floatZ
    let scaleTarget = 0.94
    let glowTarget = 0.12

    if (kind === 'stage' && visual) {
      const parent = group.parent
      camLocal.copy(state.camera.position)
      if (parent) parent.worldToLocal(camLocal)
      side.set(camLocal.y - floatY, floatX - camLocal.x, 0).normalize()
      if (isTurn) {
        targetX = floatX + (camLocal.x - floatX) * 0.16
        targetY = floatY + (camLocal.y - floatY) * 0.1
        targetZ = floatZ + (camLocal.z - floatZ) * 0.16
        scaleTarget = 1.1
        glowTarget = 1
      } else if (Math.abs(neighbor) === 1) {
        targetX = floatX + side.x * neighbor * 1.15
        targetY = floatY + 0.12
        targetZ = floatZ - 0.55
        scaleTarget = 0.9
        glowTarget = 0.16
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
    group.rotateZ(Math.sin(time * 0.7 + seed) * 0.05)
    group.rotateX(Math.sin(time * 0.5 + seed) * 0.03)
    group.scale.setScalar(sm.scale)

    const glow = glowRef.current
    if (glow) {
      glow.visible = isTurn
      glow.scale.setScalar(1.08 + Math.sin(time * 3.2) * 0.04)
      const material = glow.material
      if (material && 'opacity' in material) {
        material.opacity = isTurn ? 0.28 + Math.sin(time * 3.2) * 0.1 : 0
      }
    }

    const screen = screenRef.current
    const screenMaterial = screen?.material
    if (screenMaterial && 'emissiveIntensity' in screenMaterial) {
      screenMaterial.emissiveIntensity = isTurn ? 1.45 : 0.32
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
        />
      </mesh>
    </group>
  )
}
