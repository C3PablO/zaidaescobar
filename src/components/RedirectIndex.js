import React, { PureComponent } from 'react'

class RedirecttIndex extends PureComponent {
  componentDidMount() {
    window.location.href = this.props.path;
  }
  render() {
    return <></>;
  }
}

export default RedirecttIndex;
