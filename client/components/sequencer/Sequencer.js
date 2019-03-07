import React from 'react'
import {connect} from 'react-redux'
import {Kick} from '../instruments/Kick'
import {Snare} from '../instruments/Snare'
import TransportComponent from './TransportComponent'

class Sequencer extends React.Component {
  constructor(synth) {
    super(synth)
    this.state = {
      active: [],
      css: 'active'
    }
    this.notes = ['C3', 'Eb3', 'G3', 'Bb3']
  }
  render() {
    return (
      <div className="container">
        <h1>Hello from Sequencer Component!</h1>
        <Transport />
        <Kick />

        <Snare />
      </div>
    )
  }
}

export default connect(null, null)(Sequencer)
