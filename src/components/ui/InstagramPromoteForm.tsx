import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { MagneticButton } from '../animation/MagneticButton'
import { DummyImage } from './DummyImage'
import { brandBanners } from '../../data/media'
import { instagramPlacements, promotionCopy, type InstagramPlacementId } from '../../data/promotion'
import { submitInbox } from '../../lib/submitInbox'
import { inboxConfirm } from '../../data/inbox'
import { FormSuccess } from './FormSuccess'

const placementIds = instagramPlacements.map((item) => item.id) as [InstagramPlacementId, ...InstagramPlacementId[]]

const schema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.'),
  email: z.email('Please enter a valid email address.'),
  handle: z.string().trim().min(2, 'Add an Instagram handle or profile link.'),
  placements: z.array(z.enum(placementIds)).min(1, 'Choose at least one placement.'),
  notes: z.string().trim(),
})

type Values = z.infer<typeof schema>

type InstagramPromoteFormProps = {
  onBack: () => void
}

const tileVisual: Record<InstagramPlacementId, string> = {
  'story-24': brandBanners.wealthWhizz.stage,
  'feed-24': brandBanners.neuromatrix.src,
  reel: brandBanners.anonhabit.stage,
  'feed-permanent': brandBanners.rebootWithAsh.stage,
}

export function InstagramPromoteForm({ onBack }: InstagramPromoteFormProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [mailed, setMailed] = useState(false)
  const [sendError, setSendError] = useState('')
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', handle: '', placements: [], notes: '' },
  })

  const selected = watch('placements')

  const toggle = (id: InstagramPlacementId) => {
    const next = selected.includes(id) ? selected.filter((item) => item !== id) : [...selected, id]
    setValue('placements', next, { shouldValidate: true, shouldDirty: true })
  }

  const onSubmit = async (values: Values) => {
    setSendError('')
    setStatus('sending')
    try {
      const labels = values.placements.map(
        (id) => instagramPlacements.find((item) => item.id === id)?.title ?? id,
      )
      const result = await submitInbox({
        subject: `Instagram promotion — ${values.name}`,
        kind: 'instagram-promotion',
        fields: {
          name: values.name,
          email: values.email,
          instagram: values.handle,
          placements: labels.join(', '),
          notes: values.notes || 'None',
        },
      })
      setMailed(result.mailed)
      setStatus('sent')
    } catch (error) {
      setStatus('idle')
      setSendError(error instanceof Error ? error.message : 'The request could not be sent.')
    }
  }

  return (
    <section className="ig-studio" aria-labelledby="ig-studio-title">
      <div className="ig-studio__inner">
        <button type="button" className="studio-back" onClick={onBack}>
          All promotion
        </button>
        <header className="ig-studio__intro">
          <p className="section-heading__kicker">Instagram promotion</p>
          <h1 id="ig-studio-title">{promotionCopy.instagram.title}</h1>
          <p className="lede">{promotionCopy.instagram.body}</p>
        </header>
        {status === 'sent' ? (
          <FormSuccess
            title="Request received"
            body={inboxConfirm(mailed, promotionCopy.confirm)}
            actionLabel="Send another Instagram brief"
            onReset={() => {
              reset()
              setStatus('idle')
            }}
          />
        ) : (
          <form className="ig-studio__form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <aside className="ig-phone" aria-hidden="true">
              <div className="ig-phone__rings">
                {instagramPlacements.map((item) => (
                  <i key={item.id} className={selected.includes(item.id) ? 'is-on' : undefined} />
                ))}
              </div>
              <div className="ig-phone__screen">
                <DummyImage
                  src={brandBanners.wealthWhizz.stage}
                  width={brandBanners.wealthWhizz.width}
                  height={brandBanners.wealthWhizz.height}
                />
              </div>
            </aside>
            <div className="ig-studio__fields">
              <div className="ig-studio__pair">
                <div className="field">
                  <label htmlFor="ig-name">Your name</label>
                  <input id="ig-name" autoComplete="name" {...register('name')} />
                  {errors.name ? <p className="field-error">{errors.name.message}</p> : null}
                </div>
                <div className="field">
                  <label htmlFor="ig-email">Email address</label>
                  <input id="ig-email" type="email" autoComplete="email" {...register('email')} />
                  {errors.email ? <p className="field-error">{errors.email.message}</p> : null}
                </div>
              </div>
              <div className="field">
                <label htmlFor="ig-handle">Instagram handle or profile link</label>
                <input id="ig-handle" {...register('handle')} />
                {errors.handle ? <p className="field-error">{errors.handle.message}</p> : null}
              </div>
              <fieldset className="field option-field">
                <legend>Tap the surfaces you want</legend>
                <div className="ig-tiles">
                  {instagramPlacements.map((item) => {
                    const on = selected.includes(item.id)
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={`ig-tile ig-tile--${item.id}${on ? ' is-on' : ''}`}
                        aria-pressed={on}
                        onClick={() => toggle(item.id)}
                      >
                        <DummyImage src={tileVisual[item.id]} />
                        <strong>{item.title}</strong>
                        <span>{item.detail}</span>
                      </button>
                    )
                  })}
                </div>
                {errors.placements ? <p className="field-error">{errors.placements.message}</p> : null}
              </fieldset>
              <div className="field">
                <label htmlFor="ig-notes">Anything else we should know</label>
                <textarea id="ig-notes" {...register('notes')} />
              </div>
              {sendError ? <p className="field-error">{sendError}</p> : null}
              <MagneticButton type="submit" className="btn btn--promote" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Email this request'}
              </MagneticButton>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
