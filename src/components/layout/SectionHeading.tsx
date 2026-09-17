type SectionHeadingProps = {
  kicker?: string
  title: string
  body?: string
  as?: 'h1' | 'h2'
}

export function SectionHeading({ kicker, title, body, as = 'h2' }: SectionHeadingProps) {
  const Heading = as
  return (
    <header className="section-heading">
      <div>
        {kicker ? <p className="section-heading__kicker">{kicker}</p> : null}
        <Heading>{title}</Heading>
      </div>
      {body ? <p>{body}</p> : <div className="heading-mark" aria-hidden="true" />}
    </header>
  )
}
