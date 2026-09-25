import { MaskTitle } from '../animation/MaskTitle'

type SectionHeadingProps = {
  kicker?: string
  title: string
  body?: string
  as?: 'h1' | 'h2'
}

export function SectionHeading({ kicker, title, body, as = 'h2' }: SectionHeadingProps) {
  return (
    <header className="section-heading">
      <div>
        {kicker ? <p className="section-heading__kicker">{kicker}</p> : null}
        <MaskTitle text={title} as={as} />
      </div>
      {body ? <p>{body}</p> : <div className="heading-mark" aria-hidden="true" />}
    </header>
  )
}
