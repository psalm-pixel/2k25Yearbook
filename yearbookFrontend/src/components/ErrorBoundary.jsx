import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-[#7FB3A7] via-[#5A8A7D] to-[#34495E] flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center shadow-2xl">
            {/* Error Icon */}
            <div className="w-20 h-20 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-10 h-10 text-red-400" />
            </div>

            {/* Error Title */}
            <h1 className="text-3xl font-light text-white mb-4 font-[Delius]">
              Oops! Something went wrong
            </h1>

            {/* Error Description */}
            <p className="text-white/80 text-lg mb-8 font-[Quicksand] leading-relaxed">
              We're sorry, but the yearbook page encountered an unexpected error. 
              Don't worry - your memories are safe!
            </p>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={this.handleReload}
                className="w-full flex items-center justify-center px-6 py-3 bg-white text-[#34495E] rounded-full font-medium hover:bg-gray-100 transition-all duration-300 shadow-lg"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Try Again
              </button>

              <Link 
                to="/"
                className="w-full flex items-center justify-center px-6 py-3 bg-[#7FB3A7] text-white rounded-full font-medium hover:bg-[#6AA396] transition-all duration-300 shadow-lg"
              >
                <Home className="w-5 h-5 mr-2" />
                Go Home
              </Link>
            </div>

            {/* Technical Details (Development only) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 text-left">
                <summary className="text-white/60 text-sm cursor-pointer hover:text-white/80 transition-colors">
                  Technical Details (Development Mode)
                </summary>
                <div className="mt-4 p-4 bg-black/20 rounded-lg text-xs text-white/70 font-mono overflow-auto max-h-40">
                  <p className="text-red-300 mb-2">{this.state.error.toString()}</p>
                  <pre className="whitespace-pre-wrap">{this.state.errorInfo.componentStack}</pre>
                </div>
              </details>
            )}

            {/* Footer */}
            <p className="text-white/40 text-sm mt-8 font-[Quicksand]">
              Class of 2025 Digital Yearbook
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
