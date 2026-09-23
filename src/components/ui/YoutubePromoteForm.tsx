import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { MagneticButton } from '../animation/MagneticButton'
import { DummyImage } from './DummyImage'
import { brandBanners } from '../../data/media'
import { submitInbox } from '../../lib/submitInbox'
import { inboxConfirm } from '../../data/inbox'
import { promotionCopy } from '../../data/promotion'
import { FormSuccess } from './FormSuccess'

const schema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.'),
  email: z.email('Please enter a valid email address.'),
  channel: z.string().trim().min(4, 'Add a YouTube channel name or link.'),
  brief: z.string().trim().min(20, 'Tell us what kind of YouTube promotion you need.'),
})

type Values = z.infer<typeof schema>

type YoutubePromoteFormProps = {
  onBack: () => void
}

export function YoutubePromoteForm({ onBack }: YoutubePromoteFormProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [mailed, setMailed] = useState(false)
  const [sendError, setSendError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', channel: '', brief: '' },
  })

  const onSubmit = async (values: Values) => {
    setSendError('')
    setStatus('sending')
    try {
      const result = await submitInbox({
        subject: `YouTube promotion — ${values.name}`,
        kind: 'youtube-promotion',
        fields: {
          name: values.name,
          email: values.email,
          youtube_channel: values.channel,
          promotion_needed: values.brief,
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
    <section className="yt-studio" aria-labelledby="yt-studio-title">
      <div className="yt-studio__inner">
        <button type="button" className="studio-back" onClick={onBack}>
          All promotion
        </button>
        <div className="yt-studio__monitor">
          <p className="section-heading__kicker">YouTube promotion</p>
          <h1 id="yt-studio-title">{promotionCopy.youtube.title}</h1>
          <p className="lede">{promotionCopy.youtube.body}</p>
          <div className="yt-studio__screen">
            <DummyImage
              src={brandBanners.cyzmify.stage}
              width={brandBanners.cyzmify.width}
              height={brandBanners.cyzmify.height}
            />
            <span className="choice-card__play" aria-hidden="true" />
            <div className="yt-studio__ticker">
              <i />
              <b>Brief in · slot priced by email</b>
            </div>
          </div>
          <ol className="yt-studio__cues">
            <li>What should the viewer watch.</li>
            <li>How long the placement should run.</li>
            <li>What they should do next.</li>
          </ol>
        </div>
        {status === 'sent' ? (
          <FormSuccess
            title="Request received"
            body={inboxConfirm(mailed, promotionCopy.confirm)}
            actionLabel="Send another YouTube brief"
            onReset={() => {
              reset()
              setStatus('idle')
            }}
          />
        ) : (
          <form className="yt-studio__slate" onSubmit={handleSubmit(onSubmit)} noValidate>
            <p>End slate</p>
            <div className="yt-studio__pair">
              <div className="field">
                <label htmlFor="yt-name">01 / Your name</label>
                <input id="yt-name" autoComplete="name" {...register('name')} />
                {errors.name ? <p className="field-error">{errors.name.message}</p> : null}
              </div>
              <div className="field">
                <label htmlFor="yt-email">02 / Email</label>
                <input id="yt-email" type="email" autoComplete="email" {...register('email')} />
                {errors.email ? <p className="field-error">{errors.email.message}</p> : null}
              </div>
            </div>
            <div className="field">
              <label htmlFor="yt-channel">03 / Channel name or link</label>
              <input id="yt-channel" {...register('channel')} />
              {errors.channel ? <p className="field-error">{errors.channel.message}</p> : null}
            </div>
            <div className="field">
              <label htmlFor="yt-brief">04 / What type of promotion do you need?</label>
              <textarea
                id="yt-brief"
                {...register('brief')}
                placeholder="The product, the video format, how long it should run, and what the viewer should do next."
              />
              {errors.brief ? <p className="field-error">{errors.brief.message}</p> : null}
            </div>
            {sendError ? <p className="field-error">{sendError}</p> : null}
            <MagneticButton type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Email this brief'}
            </MagneticButton>
          </form>
        )}
      </div>
    </section>
  )
}
