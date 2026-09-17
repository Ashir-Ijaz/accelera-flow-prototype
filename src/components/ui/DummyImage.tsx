type DummyImageProps = {
  src: string
  alt?: string
  className?: string
}

export function DummyImage({ src, alt = '', className = '' }: DummyImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={`dummy-image ${className}`.trim()}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  )
}
