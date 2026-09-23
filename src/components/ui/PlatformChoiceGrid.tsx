import { Link } from 'react-router-dom'
import { DummyImage } from './DummyImage'
import { brandBanners } from '../../data/media'

export function PlatformChoiceGrid() {
  return (
    <div className="choice-grid">
      <Link to="/promote/youtube" className="choice-card choice-card--yt">
        <div className="choice-card__screen">
          <DummyImage
            src={brandBanners.cyzmify.stage}
            width={brandBanners.cyzmify.width}
            height={brandBanners.cyzmify.height}
            className="choice-card__shot"
          />
          <span className="choice-card__play" aria-hidden="true" />
          <em>On air</em>
        </div>
        <div className="choice-card__copy">
          <p>YouTube</p>
          <h2>A slot on a channel already playing.</h2>
          <span>Send the brief. We reply with pricing for a placement on the watch side.</span>
        </div>
      </Link>
      <Link to="/promote/instagram" className="choice-card choice-card--ig">
        <div className="choice-card__phones" aria-hidden="true">
          <figure>
            <DummyImage
              src={brandBanners.wealthWhizz.stage}
              width={brandBanners.wealthWhizz.width}
              height={brandBanners.wealthWhizz.height}
            />
          </figure>
          <figure>
            <DummyImage
              src={brandBanners.neuromatrix.src}
              width={brandBanners.neuromatrix.width}
              height={brandBanners.neuromatrix.height}
            />
          </figure>
          <figure>
            <DummyImage
              src={brandBanners.anonhabit.stage}
              width={brandBanners.anonhabit.width}
              height={brandBanners.anonhabit.height}
            />
          </figure>
        </div>
        <div className="choice-card__copy">
          <p>Instagram</p>
          <h2>Stories, reels, and a post that stays.</h2>
          <span>Pick the formats. We reply with charges for each surface you want.</span>
        </div>
      </Link>
    </div>
  )
}
