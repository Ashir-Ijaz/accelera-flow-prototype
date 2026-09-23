type DummyImageProps = {
  src: string
  alt?: string
  className?: string
  srcSet?: string
  sizes?: string
  width?: number
  height?: number
  loading?: 'lazy' | 'eager'
}

export function DummyImage({
  src,
  alt = '',
  className = '',
  srcSet,
  sizes,
  width,
  height,
  loading = 'lazy',
}: DummyImageProps) {
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      className={`dummy-image ${className}`.trim()}
      loading={loading}
      decoding="async"
      draggable={false}
    />
  )
}
