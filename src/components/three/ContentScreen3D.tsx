import { useMemo, useRef } from 'react'
import type { MutableRefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import { DoubleSide, Group, Mesh } from 'three'
import { useScreenTexture } from './screenTexture'
import type { MutableProgress } from './flowPaths'

type ContentScreen3DProps = {
  label: string
  kicker?: string
  position: readonly [number, number, number]
  size?: readonly [number, number]
  emphasized?: boolean
  progressRef?: MutableRefObject<MutableProgress>
}

export function ContentScreen3D({
  label,
  kicker,
  position,
  size = [2.2, 1.32],
  emphasized = false,
}: ContentScreen3DProps) {
  const groupRef = useRef<Group>(null)
  const glowRef = useRef<Mesh>(null)
  const screenRef = useRef<Mesh>(null)
  const { texture } = useScreenTexture(label, kicker)
  const seed = useMemo(() => position[0] * 1.7 + position[2] * 0.6, [position])

  useFrame((state) => {
    const group = groupRef.current
    if (!group) return
    const time = state.clock.elapsedTime
    const lit = emphasized ? 1 : 0

    group.position.x = position[0] + Math.sin(time * 0.55 + seed) * 0.1
    group.position.y = position[1] + Math.sin(time * 1.05 + seed) * 0.14
    group.position.z = position[2] + Math.cos(time * 0.42 + seed) * 0.08
    group.lookAt(state.camera.position)
    group.rotateZ(Math.sin(time * 0.7 + seed) * 0.05)
    group.rotateX(Math.sin(time * 0.5 + seed) * 0.03)
    group.scale.setScalar(0.94 + lit * 0.22)

    const glow = glowRef.current
    if (glow) {
      glow.visible = emphasized
      glow.scale.setScalar(1.08 + Math.sin(time * 3.2) * 0.04)
      const material = glow.material
      if (material && 'opacity' in material) {
        material.opacity = 0.28 + Math.sin(time * 3.2) * 0.1
      }
    }

    const screen = screenRef.current
    const material = screen?.material
    if (material && 'emissiveIntensity' in material) {
      material.emissiveIntensity = emphasized ? 1.45 : 0.32
    }
  })

  return (
    <group ref={groupRef} position={position}>
      <mesh ref={glowRef} visible={emphasized} position={[0, 0, -0.04]}>
        <planeGeometry args={[size[0] + 0.28, size[1] + 0.28]} />
        <meshBasicMaterial
          color="#ff6a00"
          transparent
          opacity={0.32}
          side={DoubleSide}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={screenRef}>
        <planeGeometry args={[size[0], size[1]]} />
        <meshStandardMaterial
          map={texture}
          emissive="#ff6a00"
          emissiveIntensity={emphasized ? 1.45 : 0.32}
          side={DoubleSide}
        />
      </mesh>
    </group>
  )
}
