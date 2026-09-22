import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react'
import { useRef } from 'react'
import type { Channel } from '../../types'
import { platformLabels } from '../../data/channels'
import { channelBanners, brandBanners } from '../../data/media'
import { DummyImage } from './DummyImage'

type ChannelCardProps = {
  channel: Channel
  active?: boolean
  compact?: boolean
  style?: CSSProperties
}

export function ChannelCard({ channel, active = false, compact = false, style }: ChannelCardProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const banner = channelBanners[channel.id] ?? brandBanners.fallback

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
      <div className={compact ? undefined : 'channel-card__body'}>
        <div
          className={`channel-thumb is-${channel.platform === 'youtube' ? 'yt' : channel.platform === 'tiktok' ? 'tt' : channel.platform === 'facebook' ? 'fb' : 'ig'}`}
        >
          {compact ? (
            <>
              <DummyImage className="channel-thumb__blur" src={banner.stage} width={1400} height={933} alt="" />
              <DummyImage className="channel-thumb__art" src={banner.stage} width={1400} height={933} alt="" />
            </>
          ) : (
            <DummyImage src={banner.card} width={banner.width} height={banner.height} alt="" />
          )}
        </div>
        <div className={compact ? undefined : 'channel-card__copy'}>
          <small>{platformLabels[channel.platform]}</small>
          <h3>{channel.name}</h3>
        </div>
      </div>
      {compact ? null : <span className="btn btn--promote">View channel</span>}
    </a>
  )
}
