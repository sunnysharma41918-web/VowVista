import React, { Component, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/global.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '32px', fontFamily: 'monospace', background: '#322824', color: '#F7F3EB', minHeight: '100vh' }}>
          <h1 style={{ color: '#E06C75', fontSize: '24px', marginBottom: '16px' }}>🚨 React Render Error</h1>
          <div style={{ background: '#241C19', padding: '16px', borderRadius: '8px', border: '1px solid rgba(197,164,109,0.3)', marginBottom: '16px' }}>
            <p style={{ color: '#E5C07B', fontSize: '16px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
              {this.state.error?.toString()}
            </p>
            <pre style={{ whiteSpace: 'pre-wrap', color: '#ABB2BF', fontSize: '13px', margin: 0, overflowX: 'auto' }}>
              {this.state.error?.stack}
            </pre>
          </div>
          {this.state.errorInfo?.componentStack && (
            <div style={{ background: '#241C19', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p style={{ color: '#98C379', fontSize: '14px', fontWeight: 'bold', margin: '0 0 8px 0' }}>Component Stack:</p>
              <pre style={{ whiteSpace: 'pre-wrap', color: '#5C6370', fontSize: '12px', margin: 0, overflowX: 'auto' }}>
                {this.state.errorInfo.componentStack}
              </pre>
            </div>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
