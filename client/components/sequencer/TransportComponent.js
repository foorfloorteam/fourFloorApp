// import React from 'react'
// import {connect} from 'react-redux'
// import Tone from 'Tone'

// const synth = new Tone.MonoSynth().toMaster().sync()
// const triggerSynth = time => synth.triggerAttackRelease('C2', '32n', time)
// const seq = new Tone.Sequence(triggerSynth, patternBank[0], '16n')
// seq.start()
// Tone.Transport.schedule(triggerSynth, 0)

class TransportComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      playbackState: Tone.Transport.state,
      tempo: Tone.Transport.bpm.value,
      position: '0:0:0',
      loopLength: '1m'
    }
    Tone.Transport.loopEnd = this.state.loopLength
    Tone.Transport.loop = true

    this.onPlay = this.onPlay.bind(this)
    this.onStop = this.onStop.bind(this)
    this.handleIncrement = this.handleIncrement.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
    this.clearButtonInterval = this.clearButtonInterval.bind(this)
    this.followTransport = this.followTransport.bind(this)
  }

  async onPlay(e) {
    e.preventDefault()
    Tone.Transport.start()
    await this.setState(() => ({playbackState: Tone.Transport.state}))
    this.followTransport()
  }

  async onStop(e) {
    e.preventDefault()
    Tone.Transport.stop()
    await this.setState(() => ({playbackState: Tone.Transport.state}))
    clearInterval(this.interval)
  }

//   handleIncrement(e) {
//     e.preventDefault()
//     this.interval = setInterval(() => this.setTempo(this.state.tempo + 1), 100)
//   }

//   handleDecrement(e) {
//     e.preventDefault()
//     this.interval = setInterval(() => this.setTempo(this.state.tempo - 1), 100)
//   }

  async setTempo(newTempo) {
    Tone.Transport.bpm.value = newTempo
    await this.setState(() => ({tempo: Math.round(Tone.Transport.bpm.value)}))
  }

  clearButtonInterval() {
    clearInterval(this.interval)
  }

  followTransport() {
    Tone.Transport.scheduleRepeat(() => {
      this.setState({position: Tone.Transport.position.slice(0, 5)})
    }, '16n')
    this.interval = setInterval(() => console.log('Tick Tock: ', this.state.position), 125)
  }

  render() {
    return (
      <>
        <button type="submit" onClick={this.onPlay}>
          Play
        </button>
        <button type="submit" onClick={this.onStop}>
          Stop
        </button>
        <br />
        <button
          type="submit"
          onMouseDown={this.handleDecrement}
          onMouseUp={this.clearButtonInterval}
          onMouseLeave={this.clearButtonInterval}
        >
          -
        </button>
        {this.state.tempo}
        <button
          type="submit"
          onMouseDown={this.handleIncrement}
          onMouseUp={this.clearButtonInterval}
          onMouseLeave={this.clearButtonInterval}
        >
          +
        </button>
      </>
    )
  }
}

// const mapState = state => ({ playbackState: state.playbackState, tempo: state.tempo, loopLength: state.loopLength })

// export default connect(mapState)(TransportComponent)
