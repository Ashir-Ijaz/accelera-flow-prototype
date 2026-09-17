import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { MagneticButton } from '../animation/MagneticButton'

type Props = {
  resetKey: string
  children: ReactNode
}

type State = {
  hasError: boolean
}

export class RouteErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn('Route failed to render', error, info)
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false })
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="page-hero">
          <h1>This view hit a snag.</h1>
          <p>The last screen did not finish rendering. Move to another page or return home.</p>
          <div className="stage-copy__actions">
            <MagneticButton to="/">Back home</MagneticButton>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
