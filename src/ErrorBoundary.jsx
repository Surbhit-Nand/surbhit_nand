import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        <main className="main detail">
          <h1>Something went wrong</h1>
          <p>This page hit an error and could not render. Reloading usually fixes it.</p>
          <button className="btn btn-solid" type="button" onClick={() => window.location.reload()}>
            Reload page
          </button>
        </main>
      );
    }
    return this.props.children;
  }
}
