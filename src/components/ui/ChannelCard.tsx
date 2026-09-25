import type { CSSProperties } from 'react'
import type { Channel } from '../../types'
import { platformLabels } from '../../data/channels'
import { channelBanners, brandBanners } from '../../data/media'
import { DummyImage } from './DummyImage'
import { ImageWipe } from '../animation/ImageWipe'
import { useMagnetic } from '../../hooks/useMagnetic'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type ChannelCardProps = {
  channel: Channel
  active?: boolean
  compact?: boolean
  style?: CSSProperties
}

export function ChannelCard({ channel, active = false, compact = false, style }: ChannelCardProps) {
  const reduced = usePrefersReducedMotion()
  const { ref, onPointerMove, onPointerLeave } = useMagnetic<HTMLAnchorElement>({
    strength: compact ? 12 : 18,
    tilt: true,
    tiltStrength: compact ? 5.5 : 9,
    scale: compact ? 1.02 : 1.03,
    ease: 0.14,
    enabled: !reduced,
  })
  const banner = channelBanners[channel.id] ?? brandBanners.fallback

  return (
    <a
      ref={ref}
      className={`channel-card magnetic-card${active ? ' is-active' : ''}`}
      href={channel.url}
      target="_blank"
      rel="noopener noreferrer"
      style={style}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className={compact ? undefined : 'channel-card__body'}>
        <div
          className={`channel-thumb is-${channel.platform === 'youtube' ? 'yt' : channel.platform === 'tiktok' ? 'tt' : channel.platform === 'facebook' ? 'fb' : 'ig'}`}
        >
          <ImageWipe direction={compact ? 'up' : 'left'} delay={0.04} accent={!compact}>
            {compact ? (
              <>
                <DummyImage className="channel-thumb__blur" src={banner.stage} width={1400} height={933} alt="" />
                <DummyImage className="channel-thumb__art" src={banner.stage} width={1400} height={933} alt="" />
              </>
            ) : (
              <DummyImage src={banner.card} width={banner.width} height={banner.height} alt="" />
            )}
          </ImageWipe>
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
