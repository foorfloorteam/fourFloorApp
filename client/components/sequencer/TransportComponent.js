import React from 'react'
import Tone from 'Tone'

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

export default TransportComponent
