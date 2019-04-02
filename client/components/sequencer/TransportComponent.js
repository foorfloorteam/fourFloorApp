import React from 'react'
import Tone from 'Tone'
import {Percussion as PercInst} from '../instruments/ClassIndex'
import TrackComponent from '../instruments/TrackComponent'

class TransportComponent extends React.Component {
  constructor() {
    super()
    const newDrum = new PercInst() // dummy data, delete asap
    this.state = {
      playbackState: Tone.Transport.state,
      tempo: Tone.Transport.bpm.value,
      position: '0:0:0',
      loopLength: '1m',
      trackList: [newDrum] // should be on top level Sequencer.js state
    }

    Tone.Transport.loopEnd = this.state.loopLength
    Tone.Transport.loop = true
  }

  onPlay = async e => {
    try {
      e.preventDefault()
      Tone.Transport.start()
      await this.setState(() => ({playbackState: Tone.Transport.state}))
      this.followTransport()
    } catch (error) {
      console.log(error)
    }
  }

  onStop = async e => {
    try {
      e.preventDefault()
      Tone.Transport.stop()
      await this.setState(() => ({playbackState: Tone.Transport.state}))
      clearInterval(this.interval)
    } catch (error) {
      console.log(error)
    }
  }

  handleIncrement = e => {
    e.preventDefault()
    this.interval = setInterval(() => this.setTempo(this.state.tempo + 1), 100)
  }

  handleDecrement = e => {
    e.preventDefault()
    this.interval = setInterval(() => this.setTempo(this.state.tempo - 1), 100)
  }

  setTempo = async newTempo => {
    try {
      Tone.Transport.bpm.value = newTempo
      await this.setState(() => ({tempo: Math.round(Tone.Transport.bpm.value)}))
    } catch (error) {
      console.log(error)
    }
  }

  clearButtonInterval = () => {
    clearInterval(this.interval)
  }

  followTransport = () => {
    Tone.Transport.scheduleRepeat(() => {
      this.setState({position: Tone.Transport.position.slice(0, 5)})
    }, '16n')
    this.interval = setInterval(
      () => console.log('Tick Tock: ', this.state.position),
      125
    )
  }

  render() {
    return (
      <>
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
        <>
          {this.state.trackList.map((track, i) => {
            return <TrackComponent key={`trackList-${i}`} track={track} />
          })}
        </>
      </>
    )
  }
}

export default TransportComponent
