import { Link } from 'react-router-dom'
import { DummyImage } from './DummyImage'
import { media } from '../../data/media'

export function PlatformChoiceGrid() {
  return (
    <div className="choice-grid">
      <Link to="/promote/youtube" className="choice-card choice-card--yt">
        <div className="choice-card__screen">
          <DummyImage src={media.film} className="choice-card__shot" />
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
            <DummyImage src={media.night} />
          </figure>
          <figure>
            <DummyImage src={media.pulse} />
          </figure>
          <figure>
            <DummyImage src={media.ember} />
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
