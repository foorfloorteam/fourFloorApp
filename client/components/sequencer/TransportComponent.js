import React from 'react'
import {connect} from 'react-redux'
import Tone from 'Tone'

const patternBank = [
  ['A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'A4', 'B4'],
  ['C2', null, 'C2', null, 'C2', null, 'C2', null, 'C2', null, 'C2', null, 'C2', null, 'C2', null]
]

const synth = new Tone.MonoSynth().toMaster().sync()
const triggerSynth = time => synth.triggerAttackRelease('C2', '4n', time)
const seq = new Tone.Sequence(triggerSynth, patternBank[0], '16n')
seq.start()
Tone.Transport.schedule(triggerSynth, 0)

class TransportComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      playbackState: Tone.Transport.state,
      tempo: Tone.Transport.bpm.value,
      loopLength: '1m'
    }
    Tone.Transport.loopEnd = this.state.loopLength
    Tone.Transport.loop = true

    this.handleIncrement = this.handleIncrement.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
    this.clearTimers = this.clearTimers.bind(this)
    this.playPause = this.playPause.bind(this)
    this.stopTransport = this.stopTransport.bind(this)
  }

  setTempo(newTempo) {
    Tone.Transport.bpm.value = newTempo
    this.setState(prevState => ({
      ...prevState,
      tempo: Math.round(Tone.Transport.bpm.value)
    }))
  }

  handleIncrement(e) {
    e.preventDefault()
    this.interval = setInterval(() => this.setTempo(this.state.tempo + 1), 100)
  }

  handleDecrement(e) {
    e.preventDefault()
    this.interval = setInterval(() => this.setTempo(this.state.tempo - 1), 100)
  }

  clearTimers() {
    clearInterval(this.interval)
  }

  playPause(e) {
    e.preventDefault()
    Tone.Transport.state === 'started'
      ? Tone.Transport.toggle()
      : Tone.Transport.start()
    this.setState(prevState => ({
      ...prevState,
      playbackState: Tone.Transport.state
    }))
  }

  stopTransport(e) {
    e.preventDefault()
    Tone.Transport.stop()
    this.setState(prevState => ({
      ...prevState,
      playbackState: Tone.Transport.state
    }))
  }

  render() {
    return (
      <>
        <button type="submit" onClick={this.playPause}>
          Play / Pause
        </button>
        <button type="submit" onClick={this.stopTransport}>
          Stop
        </button>
        <br />
        <button
          type="submit"
          onMouseDown={this.handleDecrement}
          onMouseUp={this.clearTimers}
          onMouseLeave={this.clearTimers}
        >
          -
        </button>
        {this.state.tempo}
        <button
          type="submit"
          onMouseDown={this.handleIncrement}
          onMouseUp={this.clearTimers}
          onMouseLeave={this.clearTimers}
        >
          +
        </button>
      </>
    )
  }
}

const mapState = state => ({ playbackState: state.playbackState, tempo: state.tempo, loopLength: state.loopLength })

export default connect(mapState)(TransportComponent)
