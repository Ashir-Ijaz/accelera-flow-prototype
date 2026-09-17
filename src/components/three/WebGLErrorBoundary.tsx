import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { WebGLErrorFallback } from './WebGLErrorFallback'

type Props = {
  children: ReactNode
}

type State = {
  hasError: boolean
}

export class WebGLErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn('WebGL scene failed', error, info)
  }

  render() {
    if (this.state.hasError) return <WebGLErrorFallback />
    return this.props.children
  }
}
