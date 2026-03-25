import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      let displayMessage = "Something went wrong.";
      
      try {
        if (this.state.error?.message) {
          const parsedError = JSON.parse(this.state.error.message);
          if (parsedError.error && parsedError.error.includes('permission-denied')) {
            displayMessage = "You don't have permission to access this resource. Please make sure you are logged in as an admin.";
          }
        }
      } catch (e) {
        // Not a JSON error, use default message
      }

      return (
        <div className="min-h-screen bg-navy flex items-center justify-center px-6 text-center">
          <div className="max-w-md">
            <h2 className="text-4xl font-bold text-ivory mb-6 uppercase tracking-tighter">System Error</h2>
            <div className="w-16 h-1 bg-gold mx-auto mb-8" />
            <p className="text-ivory/60 mb-10 leading-relaxed uppercase tracking-widest text-xs">
              {displayMessage}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="premium-button bg-gold text-navy px-8 py-4 w-full"
            >
              Refresh Application
            </button>
          </div>
        </div>
      );
    }

    return this.children;
  }
}
