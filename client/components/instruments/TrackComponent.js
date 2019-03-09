import React from 'react'
import ClassIndex from './ClassIndex'

class TrackComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pattern: this.props.pattern
    }
  }

  render() {
    return (
      <>
        {/* {this.state.pattern.map((note, i) => <div key={`pattern-${i}`}>{i}{note}</div>)} */}
      </>
    )
  }
}

export default TrackComponent
