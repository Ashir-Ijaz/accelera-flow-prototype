import { useEffect, useMemo, useRef } from 'react'
import type { MutableRefObject } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import { createCameraPath, createLookPath } from './flowPaths'
import type { MutableProgress } from './flowPaths'

type FlowCameraControllerProps = {
  progressRef: MutableRefObject<MutableProgress>
  reduced: boolean
}

const pointer = { x: 0, y: 0 }

export function FlowCameraController({ progressRef, reduced }: FlowCameraControllerProps) {
  const camera = useThree((state) => state.camera)
  const look = useMemo(() => new Vector3(), [])
  const ahead = useMemo(() => new Vector3(), [])
  const point = useMemo(() => new Vector3(), [])
  const tangent = useMemo(() => new Vector3(), [])
  const side = useMemo(() => new Vector3(), [])
  const up = useMemo(() => new Vector3(0, 1, 0), [])
  const cameraPath = useMemo(() => createCameraPath(), [])
  const lookPath = useMemo(() => createLookPath(), [])
  const damped = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame((state, delta) => {
    const progress = reduced ? 0 : Math.min(1, Math.max(0, progressRef.current.value))
    const t = state.clock.elapsedTime
    cameraPath.getPointAt(progress, point)
    cameraPath.getTangentAt(progress, tangent)
    lookPath.getPointAt(progress, look)
    lookPath.getPointAt(Math.min(1, progress + 0.08), ahead)
    look.lerp(ahead, 0.35)
    side.crossVectors(tangent, up).normalize()
    damped.current.x += (pointer.x - damped.current.x) * Math.min(1, delta * 3.4)
    damped.current.y += (pointer.y - damped.current.y) * Math.min(1, delta * 3.4)
    const weave = Math.sin(progress * Math.PI * 2) * 1.65
    const rise = Math.sin(progress * Math.PI) * 0.85
    const breath = reduced ? 0 : Math.sin(t * 0.55) * 0.22
    camera.position.set(
      point.x + side.x * weave + damped.current.x * 0.42,
      point.y + rise + breath - damped.current.y * 0.24,
      point.z + side.z * weave * 0.4,
    )
    camera.up.set(0, 1, 0)
    camera.lookAt(look)
    camera.rotateZ(tangent.x * 0.38 + Math.sin(t * 0.4) * 0.04)
  })

  return null
}
