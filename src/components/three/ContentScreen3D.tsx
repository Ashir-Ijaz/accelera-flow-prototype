import { useMemo, useRef } from 'react'
import type { MutableRefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import { DoubleSide, Mesh, Vector3 } from 'three'
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
  const meshRef = useRef<Mesh>(null)
  const { texture } = useScreenTexture(label, kicker)
  const seed = useMemo(() => position[0] * 1.7 + position[2] * 0.6, [position])
  const toward = useMemo(() => new Vector3(), [])

  useFrame((state) => {
    const mesh = meshRef.current
    if (!mesh) return
    const time = state.clock.elapsedTime
    const lit = emphasized ? 1 : 0.55

    mesh.position.x = position[0] + Math.sin(time * 0.55 + seed) * 0.1
    mesh.position.y = position[1] + Math.sin(time * 1.05 + seed) * 0.14
    mesh.position.z = position[2] + Math.cos(time * 0.42 + seed) * 0.08

    toward.copy(state.camera.position)
    mesh.lookAt(toward)
    mesh.rotateZ(Math.sin(time * 0.7 + seed) * 0.05)
    mesh.rotateX(Math.sin(time * 0.5 + seed) * 0.03)

    mesh.scale.setScalar(0.96 + lit * 0.12)

    const material = mesh.material
    if (material && 'emissiveIntensity' in material) {
      material.emissiveIntensity = 0.55 + lit * 0.5
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[size[0], size[1]]} />
      <meshStandardMaterial
        map={texture}
        emissive="#ff6a00"
        emissiveIntensity={emphasized ? 0.95 : 0.55}
        side={DoubleSide}
      />
    </mesh>
  )
}
