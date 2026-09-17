import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { MagneticButton } from '../animation/MagneticButton'

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
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle')
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

  const onSubmit = (values: EnquiryValues) => {
    setStatus('saving')
    window.setTimeout(() => {
      window.localStorage.setItem('accelera-flow-enquiry', JSON.stringify(values))
      setStatus('saved')
    }, 700)
  }

  if (status === 'saved') {
    return (
      <div className="form-success" role="status">
        <h2>Stored locally for this prototype</h2>
        <p>
          This prototype form does not send externally. Your details were saved in this browser only, and no
          message was delivered to Accelera Flow.
        </p>
        <MagneticButton
          className="btn btn--primary"
          onClick={() => {
            reset()
            setStatus('idle')
          }}
        >
          Reset form
        </MagneticButton>
      </div>
    )
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <p className="note">This prototype form does not yet send externally.</p>
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
      <MagneticButton type="submit" disabled={status === 'saving'}>
        {status === 'saving' ? 'Saving locally…' : 'Submit enquiry'}
      </MagneticButton>
    </form>
  )
}
