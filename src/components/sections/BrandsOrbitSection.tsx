import { channels } from '../../data/channels'
import { SectionHeading } from '../layout/SectionHeading'
import { ChannelCard } from '../ui/ChannelCard'
import { Coverflow } from '../ui/Coverflow'
import { MagneticButton } from '../animation/MagneticButton'

export function BrandsOrbitSection() {
  return (
    <section className="section orbit" aria-labelledby="brands-title">
      <div className="section__inner">
        <SectionHeading kicker="Owned brands" title="Channels already in the flow." />
        <Coverflow
          items={channels}
          getKey={(channel) => channel.id}
          ariaLabel="Owned brand cards"
          render={(channel, active) => <ChannelCard channel={channel} active={active} compact />}
        />
        <div className="section-link">
          <MagneticButton to="/brands" className="btn btn--ghost">
            All brands
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
