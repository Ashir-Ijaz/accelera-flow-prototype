import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { AdditiveBlending, Color, InstancedMesh, Object3D, Vector3 } from 'three'
import type { CatmullRomCurve3 } from 'three'

type FlowParticlesProps = {
  curves: CatmullRomCurve3[]
  count: number
}

export function FlowParticles({ curves, count }: FlowParticlesProps) {
  const meshRef = useRef<InstancedMesh>(null)
  const dummy = useMemo(() => new Object3D(), [])
  const color = useMemo(() => new Color('#ff9400'), [])
  const sampled = useMemo(
    () =>
      curves.map((curve) => {
        const points: Vector3[] = []
        const steps = 40
        for (let i = 0; i <= steps; i += 1) {
          points.push(curve.getPoint(i / steps))
        }
        return points
      }),
    [curves],
  )

  const skip = useRef(false)

  useFrame((state) => {
    skip.current = !skip.current
    if (skip.current) return
    const mesh = meshRef.current
    if (!mesh) return
    const time = state.clock.elapsedTime
    let index = 0
    const perCurve = Math.floor(count / sampled.length)

    sampled.forEach((points) => {
      const last = points.length - 1
      for (let n = 0; n < perCurve; n += 1) {
        const u = (n / perCurve + time * 0.28) % 1
        const scaled = u * last
        const i0 = Math.floor(scaled)
        const i1 = Math.min(last, i0 + 1)
        dummy.position.lerpVectors(points[i0], points[i1], scaled - i0)
        dummy.scale.setScalar(0.035 + (n % 4) * 0.012)
        dummy.updateMatrix()
        mesh.setMatrixAt(index, dummy.matrix)
        index += 1
      }
    })

    mesh.count = index
    mesh.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color={color} blending={AdditiveBlending} transparent opacity={0.9} depthWrite={false} />
    </instancedMesh>
  )
}
