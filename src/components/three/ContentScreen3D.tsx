import { useMemo, useRef } from 'react'
import type { MutableRefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import { DoubleSide, Mesh, Quaternion, Vector3 } from 'three'
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
  const look = useMemo(() => new Quaternion(), [])
  const target = useMemo(() => new Quaternion(), [])
  const toward = useMemo(() => new Vector3(), [])

  useFrame((state) => {
    const mesh = meshRef.current
    if (!mesh) return
    const time = state.clock.elapsedTime
    const dist = state.camera.position.distanceTo(mesh.position)
    const near = 1 / (1 + Math.max(0, dist - 4.2) * 0.22)
    const lit = Math.min(1, near + (emphasized ? 0.22 : 0))

    mesh.position.x = position[0] + Math.sin(time * 0.55 + seed) * 0.16
    mesh.position.y = position[1] + Math.sin(time * 1.05 + seed) * 0.22
    mesh.position.z = position[2] + Math.cos(time * 0.42 + seed) * 0.12

    toward.copy(state.camera.position)
    mesh.lookAt(toward)
    target.copy(mesh.quaternion)
    mesh.quaternion.copy(look.slerp(target, 0.08))
    look.copy(mesh.quaternion)
    mesh.rotateZ(Math.sin(time * 0.7 + seed) * 0.07)
    mesh.rotateX(Math.sin(time * 0.5 + seed) * 0.045)

    const scale = 0.95 + lit * 0.16 + Math.sin(time * 1.8 + seed) * 0.012
    mesh.scale.setScalar(scale)

    const material = mesh.material
    if (material && 'emissiveIntensity' in material) {
      material.emissiveIntensity = 0.2 + lit * 0.42 + Math.sin(time * 2.1 + seed) * 0.08 * lit
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[size[0], size[1]]} />
      <meshStandardMaterial
        map={texture}
        emissive="#ff6a00"
        emissiveIntensity={emphasized ? 0.5 : 0.24}
        side={DoubleSide}
      />
    </mesh>
  )
}
