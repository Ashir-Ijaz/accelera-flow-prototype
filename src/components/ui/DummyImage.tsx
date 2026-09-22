type DummyImageProps = {
  src: string
  alt?: string
  className?: string
  srcSet?: string
  sizes?: string
  width?: number
  height?: number
}

export function DummyImage({ src, alt = '', className = '', srcSet, sizes, width, height }: DummyImageProps) {
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      className={`dummy-image ${className}`.trim()}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  )
}
