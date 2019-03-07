import React from 'react'
import {connect} from 'react-redux'
import Tone from 'Tone'
import Transport from './Transport'

class Sequencer extends React.Component {
  constructor(synth) {
    super(synth)
    this.state = {
      grid: [],
      sequence: ['C2', 'C2', 'C2', 'C2']
    }
    this.notes = ['C3', 'Eb3', 'G3', 'Bb3']
    this.handlePlay = this.handlePlay.bind(this)
  }
  handlePlay(e) {
    const synth = new Tone.MembraneSynth().toMaster()
    const synthPart = new Tone.Sequence(
      function(time, note) {
        synth.triggerAttackRelease(note, '10hz', time)
      },
      this.state.sequence,
      '4n'
    )
    synthPart.start()
    Tone.Transport.start()
  }
  render() {
    return (
      <div className="container">
        <h1>Hello from Sequencer Component!</h1>
        <Transport />
        <button type="button" onClick={this.handlePlay}>
          playSynth
        </button>
      </div>
    )
  }
}

export default connect(null, null)(Sequencer)
