import { Component, ErrorInfo, ReactNode } from "react";
import { ErrorFallback } from "../error";
import { ErrorBoundaryProps, ErrorBoundaryState } from "../types/errors";

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error);
    console.error("Component stack:", errorInfo.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <ErrorFallback
          error={this.state.error}
          resetErrorBoundary={() =>
            this.setState({ hasError: false, error: null })
          }
        />
      );
    }
    return this.props.children;
  }
}
