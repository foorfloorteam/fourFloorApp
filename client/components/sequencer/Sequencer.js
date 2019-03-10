import React from 'react'
import {connect} from 'react-redux'
import {Kick} from '../instruments/Kick'
import {Snare} from '../instruments/Snare'
import Tone from 'Tone'
import TransportComponent from './TransportComponent'

class Sequencer extends React.Component {
  constructor() {
    super()
    this.state = {
      active: [],
      css: 'active'
    }
    this.handlePlay = this.handlePlay.bind(this)
  }
  handlePlay() {
    Tone.Transport.start()
  }
  render() {
    return (
      <div className="container">
        <h1>Hello from Sequencer Component!</h1>
        {/* <TransportComponent /> */}
        <Kick />
        <Snare />
        <button type="button" className="on-Off" onClick={this.handlePlay}>
          X
        </button>
      </div>
    )
  }
}

export default connect(null, null)(Sequencer)
