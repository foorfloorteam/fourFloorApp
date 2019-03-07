import React from 'react'
import {connect} from 'react-redux'
class Sequencer extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div className="container">
        <h1>Hello from Sequencer Component!</h1>
      </div>
    )
  }
}

export default connect(null, null)(Sequencer)
