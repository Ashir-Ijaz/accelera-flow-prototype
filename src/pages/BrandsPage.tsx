import { useMemo, useState } from 'react'
import { channels } from '../data/channels'
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

  const visible = useMemo(
    () => (filter === 'all' ? channels : channels.filter((channel) => channel.platform === filter)),
    [filter],
  )

  return (
    <PageHero kicker="Owned channels" title="Seven brands. One faceless system." asideLabel="Channels" tone="ember">
      <div className="search-row">
        {(['all', 'instagram', 'youtube'] as const).map((value) => (
          <button
            key={value}
            type="button"
            className={`filter-btn${filter === value ? ' is-active' : ''}`}
            onClick={() => setFilter(value)}
          >
            {value}
          </button>
        ))}
      </div>
      <Reveal className="channel-grid">
        {visible.map((channel) => (
          <ChannelCard key={channel.id} channel={channel} />
        ))}
      </Reveal>
      <div className="split page-close">
        <p>Start a project around an owned channel, or a new brief.</p>
        <MagneticButton to="/contact">Start a project</MagneticButton>
      </div>
    </PageHero>
  )
}
