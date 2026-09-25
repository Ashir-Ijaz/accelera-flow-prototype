import { useEffect, useMemo, useRef } from 'react'
import type { MutableRefObject } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import {
  activeCardLook,
  createCameraPath,
  createLookPath,
  type MutableProgress,
} from './flowPaths'

type FlowCameraControllerProps = {
  progressRef: MutableRefObject<MutableProgress>
  reduced: boolean
}

const pointer = { x: 0, y: 0 }

export function getFlowPointer() {
  return pointer
}

export function FlowCameraController({ progressRef, reduced }: FlowCameraControllerProps) {
  const camera = useThree((state) => state.camera)
  const look = useMemo(() => new Vector3(), [])
  const pathLook = useMemo(() => new Vector3(), [])
  const cardLook = useMemo(() => new Vector3(), [])
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
    // Raw scroll drives the fly-through so motion stays alive
    const u = Math.min(0.999, Math.max(0, progress))
    cameraPath.getPointAt(u, point)
    cameraPath.getTangentAt(u, tangent)
    lookPath.getPointAt(u, pathLook)
    lookPath.getPointAt(Math.min(0.999, u + 0.06), ahead)
    pathLook.lerp(ahead, 0.28)
    activeCardLook(progress, cardLook)
    // Mostly on the active card, enough path blend to keep travel feel
    look.copy(pathLook).lerp(cardLook, 0.8)

    side.crossVectors(tangent, up).normalize()
    damped.current.x += (pointer.x - damped.current.x) * Math.min(1, delta * 1.35)
    damped.current.y += (pointer.y - damped.current.y) * Math.min(1, delta * 1.35)
    const weave = Math.sin(progress * Math.PI * 2) * 0.88
    const rise = Math.sin(progress * Math.PI) * 0.5
    const breath = reduced ? 0 : Math.sin(t * 0.55) * 0.14
    // Slow, clear lean toward the cursor
    camera.position.set(
      point.x + side.x * weave + damped.current.x * 0.62,
      point.y + rise + breath - damped.current.y * 0.34,
      point.z + side.z * weave * 0.3 + damped.current.x * 0.12,
    )
    camera.up.set(0, 1, 0)
    look.x += damped.current.x * 0.45
    look.y -= damped.current.y * 0.28
    camera.lookAt(look)
    camera.rotateZ(tangent.x * 0.2 + Math.sin(t * 0.4) * 0.028)
  })

  return null
}
