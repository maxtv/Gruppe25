import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    this.setState({ error, info });
    // log to console so developer can see the full stack
    console.error('Uncaught error in component tree:', error, info);
  }

  render() {
    const { error } = this.state;
    if (error) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', color: '#111', padding: 24 }}>
          <div style={{ maxWidth: 820 }}>
            <h2 style={{ marginTop: 0 }}>Application error</h2>
            <p style={{ marginBottom: 12 }}>An unexpected error occurred while rendering the app. Check the browser console for details.</p>
            <pre style={{ whiteSpace: 'pre-wrap', background: '#f6f6f6', padding: 12, borderRadius: 8 }}>{String(error && (error.stack || error.message || error))}</pre>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
