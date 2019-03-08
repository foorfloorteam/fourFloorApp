import React from 'react'
import Tone from 'Tone'

const patternBank = [
  [
    'A2',
    'B2',
    'C2',
    'D2',
    'E2',
    'F2',
    'G2',
    'A3',
    'B3',
    'C3',
    'D3',
    'E3',
    'F3',
    'G3',
    'A4',
    'B4'
  ],
  [
    'C2',
    null,
    'C2',
    null,
    'C2',
    null,
    'C2',
    null,
    'C2',
    null,
    'C2',
    null,
    'C2',
    null,
    'C2',
    null
  ]
]

const synth = new Tone.MonoSynth().toMaster().sync()
const triggerSynth = time => synth.triggerAttackRelease('C2', '32n', time)
const seq = new Tone.Sequence(triggerSynth, patternBank[0], '16n')
seq.start()
Tone.Transport.schedule(triggerSynth, 0)

class TransportComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      playbackState: Tone.Transport.state,
      tempo: Tone.Transport.bpm.value,
      position: Tone.Transport.position,
      loopLength: '1m'
    }
    Tone.Transport.loopEnd = this.state.loopLength
    Tone.Transport.loop = true

    this.playPause = this.playPause.bind(this)
    this.stopTransport = this.stopTransport.bind(this)
    this.handleIncrement = this.handleIncrement.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
    this.clearTimers = this.clearTimers.bind(this)
    this.followTransport = this.followTransport.bind(this)
  }

  async playPause(e) {
    console.group('playPause PRE?????????????????????')
      console.group('Playback')
        console.log(
          'Appy Playback: ',
          this.state.playbackState,
          '\tTone Playback: ',
          Tone.Transport.state
        )
      console.groupEnd()
      console.group('Transport')
        console.log(
          'Appy Position: ',
          this.state.position,
          '\nTone Position: ',
          Tone.Transport.position
        )
      console.groupEnd()
    console.groupEnd()
    e.preventDefault()
    Tone.Transport.state === 'started'
      ? Tone.Transport.toggle()
      : Tone.Transport.start()
    await this.setState(() => ({playbackState: Tone.Transport.state}))
    this.followTransport()
    console.group('playPause POST!!!!!!!!!!!!!!!!!!!!')
    console.group('Playback')
    console.log(
      'Appy Playback: ',
      this.state.playbackState,
      '\tTone Playback: ',
      Tone.Transport.state
    )
    console.groupEnd()
    console.group('Transport')
    console.log(
      'Appy Position: ',
      this.state.position,
      '\nTone Position: ',
      Tone.Transport.position
    )
    console.log('\n\n\n\n\n')
    console.groupEnd()
    console.groupEnd()
  }

  async stopTransport(e) {
    console.group('stopTransport PRE?????????????????????')
    console.group('Playback')
    console.log(
      'Appy Playback: ',
      this.state.playbackState,
      '\tTone Playback: ',
      Tone.Transport.state
    )
    console.groupEnd()
    console.group('Transport')
    console.log(
      'Appy Position: ',
      this.state.position,
      '\nTone Position: ',
      Tone.Transport.position
    )
    console.groupEnd()
    console.groupEnd()
    e.preventDefault()
    Tone.Transport.stop()
    await this.setState(() => ({playbackState: Tone.Transport.state}))
    clearInterval(this.interval)
    console.group('stopTransport POST!!!!!!!!!!!!!!!!!!!!')
    console.group('Playback')
    console.log(
      'Appy Playback: ',
      this.state.playbackState,
      '\tTone Playback: ',
      Tone.Transport.state
    )
    console.groupEnd()
    console.group('Transport')
    console.log(
      'Appy Position: ',
      this.state.position,
      '\nTone Position: ',
      Tone.Transport.position
    )
    console.log('\n\n\n\n\n')
    console.groupEnd()
    console.groupEnd()
  }

  async setTempo(newTempo) {
    Tone.Transport.bpm.value = newTempo
    await this.setState(() => ({tempo: Math.round(Tone.Transport.bpm.value)}))
    // console.log('app tempo: ', this.state.tempo, '\ttone tempo: ', Tone.Transport.bpm.value)
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

  followTransport() {
    Tone.Transport.scheduleRepeat(() => {
      this.setState({position: Tone.Transport.position})
    }, '16n')
    this.interval = setInterval(() => console.log('Tick Tock: ', this.state.position), 250)
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
