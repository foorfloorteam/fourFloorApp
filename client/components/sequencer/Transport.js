import React from 'react'
import {connect} from 'react-redux'
import Tone from 'Tone'

// const synth = new Tone.MembraneSynth().toMaster()
// const sequence = ['C2', 'C2', 'C2', 'C2']
// const kickSeq = new Tone.Sequence(
//   (time, note) => {
//     synth.triggerAttackRelease(note, '10hz', time)
//   },
//   sequence,
//   '4n'
// )

class Transport extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tempo: 120
    }

    // this.togglePlayback = this.togglePlayback.bind(this)
    this.setTempo = this.setTempo.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
    this.handleIncrement = this.handleIncrement.bind(this)
    this.clearTimers = this.clearTimers.bind(this)
  }

  // togglePlayback(e) {
  //   e.preventDefault()
  //   kickSeq.start()
  //   this.setState(prevState => ({isPlaying: !prevState.isPlaying}))
  //   this.state.isPlaying ? Tone.Transport.start() : Tone.Transport.stop()
  // }

  setTempo(newTempo) {
    this.setState(prevState => ({tempo: newTempo}))
    Tone.Transport.bpm.value = this.state.tempo
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

  render() {
    const {handlePlay} = this.props
    return (
      <div className="container">
        <h1>Hello from Transport Component!</h1>
        <>
          <button type="button" onClick={handlePlay}>
            handlePlay
          </button>
          <br />
        </>
        <>
          <button
            type="button"
            onMouseDown={this.handleDecrement}
            onMouseUp={this.clearTimers}
            onMouseLeave={this.clearTimers}
          >
            -
          </button>
          {this.state.tempo}
          <button
            type="button"
            onMouseDown={this.handleIncrement}
            onMouseUp={this.clearTimers}
            onMouseLeave={this.clearTimers}
          >
            +
          </button>
          <br />
        </>
      </div>
    )
  }
}

export default connect(null, null)(Transport)
