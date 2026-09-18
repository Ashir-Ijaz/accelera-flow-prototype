import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { AdditiveBlending, Color, InstancedMesh, Object3D } from 'three'

type FieldMotesProps = {
  count: number
}

export function FieldMotes({ count }: FieldMotesProps) {
  const meshRef = useRef<InstancedMesh>(null)
  const dummy = useMemo(() => new Object3D(), [])
  const color = useMemo(() => new Color('#ff6a00'), [])
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        x: ((index * 47) % 100) / 100 * 22 - 11,
        y: ((index * 31) % 100) / 100 * 10 - 3.5,
        z: ((index * 73) % 100) / 100 * 28 - 8,
        s: 0.018 + (index % 5) * 0.01,
        speed: 0.12 + (index % 7) * 0.04,
      })),
    [count],
  )

  const skip = useRef(false)

  useFrame((state) => {
    skip.current = !skip.current
    if (skip.current) return
    const mesh = meshRef.current
    if (!mesh) return
    const time = state.clock.elapsedTime
    seeds.forEach((seed, index) => {
      dummy.position.set(
        seed.x + Math.sin(time * seed.speed + index) * 1.4,
        seed.y + Math.cos(time * (seed.speed * 0.8) + index) * 0.9,
        seed.z + Math.sin(time * (seed.speed * 0.55) + index * 0.4) * 1.6,
      )
      dummy.scale.setScalar(seed.s * (0.7 + Math.sin(time * 1.6 + index) * 0.35))
      dummy.updateMatrix()
      mesh.setMatrixAt(index, dummy.matrix)
    })
    mesh.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color={color} blending={AdditiveBlending} transparent opacity={0.82} depthWrite={false} />
    </instancedMesh>
  )
}
