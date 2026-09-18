import { useNavigate, useParams } from 'react-router-dom'
import { pageMeta } from '../data/meta'
import { promotionCopy } from '../data/promotion'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { PageHero } from '../components/layout/PageHero'
import { PlatformChoiceGrid } from '../components/ui/PlatformChoiceGrid'
import { YoutubePromoteForm } from '../components/ui/YoutubePromoteForm'
import { InstagramPromoteForm } from '../components/ui/InstagramPromoteForm'

export default function PromotePage() {
  const { platform } = useParams()
  const navigate = useNavigate()
  const choice = platform === 'youtube' || platform === 'instagram' ? platform : null

  useDocumentMeta(choice ? pageMeta[choice === 'youtube' ? 'promoteYoutube' : 'promoteInstagram'] : pageMeta.promote)

  const back = () => navigate('/promote')

  if (choice === 'youtube') {
    return <YoutubePromoteForm onBack={back} />
  }

  if (choice === 'instagram') {
    return <InstagramPromoteForm onBack={back} />
  }

  return (
    <PageHero
      kicker={promotionCopy.picker.kicker}
      title={promotionCopy.picker.title}
      body={promotionCopy.picker.body}
      asideLabel="Promote"
      tone="signal"
    >
      <PlatformChoiceGrid />
    </PageHero>
  )
}
