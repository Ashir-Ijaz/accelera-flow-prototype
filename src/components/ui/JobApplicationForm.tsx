import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { MagneticButton } from '../animation/MagneticButton'
import { jobRoles } from '../../data/jobs'
import { submitInbox } from '../../lib/submitInbox'
import { FormSuccess } from './FormSuccess'

const schema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.'),
  email: z.email('Please enter a valid email address.'),
  city: z.string().trim().min(2, 'Add your city or country.'),
  role: z.enum(jobRoles, { message: 'Choose a desk.' }),
  link: z.string().trim().min(4, 'Add a portfolio, GitHub, or social link.'),
  note: z.string().trim().min(20, 'Tell us a little about the work you want to do.'),
})

type Values = z.infer<typeof schema>

export function JobApplicationForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [sendError, setSendError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      city: '',
      role: 'Short-form video',
      link: '',
      note: '',
    },
  })

  const onSubmit = async (values: Values) => {
    setSendError('')
    setStatus('sending')
    try {
      await submitInbox({
        subject: `Job application — ${values.name} (${values.role})`,
        kind: 'job',
        fields: {
          name: values.name,
          email: values.email,
          city: values.city,
          role: values.role,
          portfolio: values.link,
          note: values.note,
        },
      })
      setStatus('sent')
    } catch (error) {
      setStatus('idle')
      setSendError(error instanceof Error ? error.message : 'The application could not be sent.')
    }
  }

  if (status === 'sent') {
    return (
      <FormSuccess
        title="Application received"
        body="You will receive an email with the next steps if there is a desk that fits."
        actionLabel="Submit another application"
        onReset={() => {
          reset()
          setStatus('idle')
        }}
      />
    )
  }

  return (
    <form className="form jobs__form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="field">
        <label htmlFor="job-name">Your name</label>
        <input id="job-name" autoComplete="name" {...register('name')} />
        {errors.name ? <p className="field-error">{errors.name.message}</p> : null}
      </div>
      <div className="field">
        <label htmlFor="job-email">Email address</label>
        <input id="job-email" type="email" autoComplete="email" {...register('email')} />
        {errors.email ? <p className="field-error">{errors.email.message}</p> : null}
      </div>
      <div className="jobs__pair">
        <div className="field">
          <label htmlFor="job-city">City or country</label>
          <input id="job-city" autoComplete="address-level2" {...register('city')} />
          {errors.city ? <p className="field-error">{errors.city.message}</p> : null}
        </div>
        <div className="field">
          <label htmlFor="job-role">Desk you want to join</label>
          <select id="job-role" {...register('role')}>
            {jobRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          {errors.role ? <p className="field-error">{errors.role.message}</p> : null}
        </div>
      </div>
      <div className="field">
        <label htmlFor="job-link">Portfolio or social link</label>
        <input id="job-link" {...register('link')} />
        {errors.link ? <p className="field-error">{errors.link.message}</p> : null}
      </div>
      <div className="field">
        <label htmlFor="job-note">What you want to work on</label>
        <textarea id="job-note" {...register('note')} />
        {errors.note ? <p className="field-error">{errors.note.message}</p> : null}
      </div>
      {sendError ? <p className="field-error">{sendError}</p> : null}
      <MagneticButton type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Submit application'}
      </MagneticButton>
    </form>
  )
}
