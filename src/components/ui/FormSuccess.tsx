import { MagneticButton } from '../animation/MagneticButton'

type FormSuccessProps = {
  title: string
  body: string
  actionLabel: string
  onReset: () => void
}

export function FormSuccess({ title, body, actionLabel, onReset }: FormSuccessProps) {
  return (
    <div className="form-success" role="status">
      <h2>{title}</h2>
      <p>{body}</p>
      <MagneticButton className="btn btn--primary" onClick={onReset}>
        {actionLabel}
      </MagneticButton>
    </div>
  )
}
