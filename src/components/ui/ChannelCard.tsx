import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react'
import { useRef } from 'react'
import type { Channel } from '../../types'
import { channelMedia, media } from '../../data/media'
import { DummyImage } from './DummyImage'

type ChannelCardProps = {
  channel: Channel
  active?: boolean
  compact?: boolean
  style?: CSSProperties
}

export function ChannelCard({ channel, active = false, compact = false, style }: ChannelCardProps) {
  const ref = useRef<HTMLAnchorElement>(null)

  const onMove = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    const node = ref.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 8
    const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -8
    node.style.setProperty('--tilt', `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`)
  }

  const onLeave = () => {
    ref.current?.style.setProperty('--tilt', 'rotateX(0deg) rotateY(0deg)')
  }

  return (
    <a
      ref={ref}
      className={`channel-card${active ? ' is-active' : ''}`}
      href={channel.url}
      target="_blank"
      rel="noopener noreferrer"
      style={style}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div>
        <div className={`channel-thumb${channel.platform === 'youtube' ? ' is-yt' : ''}`}>
          <DummyImage src={channelMedia[channel.id] ?? media.flow} alt="" />
        </div>
        <small>{channel.platform}</small>
        <h3>{channel.name}</h3>
      </div>
      {compact ? null : <span className="btn btn--ghost">View channel</span>}
    </a>
  )
}
