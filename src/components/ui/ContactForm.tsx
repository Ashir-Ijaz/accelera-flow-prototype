import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { MagneticButton } from '../animation/MagneticButton'
import { submitInbox } from '../../lib/submitInbox'
import { inboxConfirm } from '../../data/inbox'
import { FormSuccess } from './FormSuccess'

const serviceOptions = [
  'Instagram Page Management',
  'Content Creation',
  'Instagram DM Management and Sales Closing',
  'Cold Outreach',
  'Clipping',
  'Multiple Services',
] as const

const enquirySchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.'),
  email: z.email('Please enter a valid email address.'),
  brand: z.string().trim().min(2, 'Please add a brand name or social link.'),
  service: z.enum(serviceOptions, { message: 'Choose a service.' }),
  goals: z.string().trim().min(20, 'Tell us a little more about the support you need.'),
})

type EnquiryValues = z.infer<typeof enquirySchema>

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [mailed, setMailed] = useState(false)
  const [sendError, setSendError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: '',
      email: '',
      brand: '',
      service: 'Content Creation',
      goals: '',
    },
  })

  const onSubmit = async (values: EnquiryValues) => {
    setSendError('')
    setStatus('sending')
    try {
      const result = await submitInbox({
        subject: `Project enquiry — ${values.name}`,
        kind: 'project',
        fields: {
          name: values.name,
          email: values.email,
          brand: values.brand,
          service: values.service,
          goals: values.goals,
        },
      })
      setMailed(result.mailed)
      setStatus('sent')
    } catch (error) {
      setStatus('idle')
      setSendError(error instanceof Error ? error.message : 'The enquiry could not be sent.')
    }
  }

  if (status === 'sent') {
    return (
      <FormSuccess
        title="Enquiry received"
        body={inboxConfirm(mailed, 'You will receive an email with the next details for this project.')}
        actionLabel="Send another enquiry"
        onReset={() => {
          reset()
          setStatus('idle')
        }}
      />
    )
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="field">
        <label htmlFor="name">Your name</label>
        <input id="name" autoComplete="name" {...register('name')} />
        {errors.name ? <p className="field-error">{errors.name.message}</p> : null}
      </div>
      <div className="field">
        <label htmlFor="email">Email address</label>
        <input id="email" type="email" autoComplete="email" {...register('email')} />
        {errors.email ? <p className="field-error">{errors.email.message}</p> : null}
      </div>
      <div className="field">
        <label htmlFor="brand">Brand name or social media link</label>
        <input id="brand" {...register('brand')} />
        {errors.brand ? <p className="field-error">{errors.brand.message}</p> : null}
      </div>
      <div className="field">
        <label htmlFor="service">Service interested in</label>
        <select id="service" {...register('service')}>
          {serviceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.service ? <p className="field-error">{errors.service.message}</p> : null}
      </div>
      <div className="field">
        <label htmlFor="goals">Project goals and required support</label>
        <textarea id="goals" {...register('goals')} />
        {errors.goals ? <p className="field-error">{errors.goals.message}</p> : null}
      </div>
      {sendError ? <p className="field-error">{sendError}</p> : null}
      <MagneticButton type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Submit enquiry'}
      </MagneticButton>
    </form>
  )
}
