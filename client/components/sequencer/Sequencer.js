import React from 'react'
import {connect} from 'react-redux'
import Tone from 'Tone'

const synth = new Tone.MembraneSynth().toMaster()
const sequence = ['C2', 'C2', 'C2', 'C2']
const playSynth = () => synth.triggerAttackRelease('C2', '8n')
const kickSequence = new Tone.Sequence(
  (time, note) => playSynth(),
  sequence,
  '4n'
)

class Sequencer extends React.Component {
  constructor() {
    super()
    this.state = {sequence: ['C2', 'C2', 'C2', 'C2']}

    this.handleButtonClick = this.handleButtonClick.bind(this)
  }

  handleButtonClick(e) {
    e.preventDefault()
    this.kick.start(100, 5)
  }

  kick(time, note) {
    const sequence1 = new Tone.Sequence(
      (time, note) => playSynth(),
      sequence,
      '4n'
    )
    return sequence1
  }

  render() {
    return (
      <div className="container">
        <h1>Hello from Sequencer Component!</h1>
        <button type="button" onClick={this.handleButtonClick}>
          playSynth
        </button>
      </div>
    )
  }
}

export default connect(null, null)(Sequencer)
