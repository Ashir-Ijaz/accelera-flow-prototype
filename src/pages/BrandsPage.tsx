import { useMemo, useState } from 'react'
import { channels, channelsForPlatform, platformLabels, platformOrder } from '../data/channels'
import { pageMeta } from '../data/meta'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { ChannelCard } from '../components/ui/ChannelCard'
import { MagneticButton } from '../components/animation/MagneticButton'
import { PageHero } from '../components/layout/PageHero'
import { Reveal } from '../components/animation/Reveal'
import type { ChannelPlatform } from '../types'

export default function BrandsPage() {
  useDocumentMeta(pageMeta.brands)
  const [filter, setFilter] = useState<'all' | ChannelPlatform>('all')

  const groups = useMemo(
    () => platformOrder.filter((platform) => filter === 'all' || filter === platform),
    [filter],
  )

  return (
    <PageHero kicker="Owned channels" title="Owned pages. One faceless system." asideLabel="Channels" tone="ember">
      <div className="search-row">
        {(['all', ...platformOrder] as const).map((value) => (
          <button
            key={value}
            type="button"
            className={`filter-btn${filter === value ? ' is-active' : ''}`}
            onClick={() => setFilter(value)}
          >
            {value === 'all' ? 'all' : platformLabels[value]}
          </button>
        ))}
      </div>
      {groups.map((platform) => {
        const items = filter === 'all' ? channelsForPlatform(platform) : channels.filter((channel) => channel.platform === platform)
        return (
          <Reveal key={platform} className="channel-platform">
            <p className="channel-platform__kicker">
              {platformLabels[platform]}
              <span>{items.length}</span>
            </p>
            <div className="channel-grid">
              {items.map((channel) => (
                <ChannelCard key={channel.id} channel={channel} />
              ))}
            </div>
          </Reveal>
        )
      })}
      <div className="split page-close">
        <p>Start a project around an owned channel, or a new brief.</p>
        <MagneticButton to="/contact">Start a project</MagneticButton>
      </div>
    </PageHero>
  )
}
