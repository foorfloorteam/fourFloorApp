import React from 'react'
import {connect} from 'react-redux'
import {Kick} from '../instruments/Kick'
import {Snare} from '../instruments/Snare'
import TransportComponent from './TransportComponent'

class Sequencer extends React.Component {
  constructor() {
    super()
    this.state = {
      active: [],
      css: 'active'
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Hello from Sequencer Component!</h1>
        {/* <TransportComponent /> */}
        <Kick />
        <Snare />
      </div>
    )
  }
}

export default connect(null, null)(Sequencer)
