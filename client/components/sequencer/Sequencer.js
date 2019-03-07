import React from 'react'
import {connect} from 'react-redux'
import Tone from 'Tone'
import {Kick} from '../instruments/Kick'
import {Snare} from '../instruments/Snare'
import Transport from './Transport'

class Sequencer extends React.Component {
  constructor(synth) {
    super(synth)
    this.state = {
      active: [],
      css: 'active',
      kick: [],
      snare: []
    }
    this.notes = ['C3', 'Eb3', 'G3', 'Bb3']
    this.handlePlay = this.handlePlay.bind(this)
    this.toggleActive = this.toggleActive.bind(this)
    this.pushKickVal = this.pushKickVal.bind(this)
  }
  makeRow() {
    let row = []
    for (let i = 0; i < 16; i++) {
      row.push(null)
    }
    return row
  }
  componentDidMount() {
    const row = this.makeRow()
    this.setState({
      kick: row,
      snare: row
    })
  }
  handlePlay() {
    const synth = new Tone.MembraneSynth().toMaster()
    const synthPart = new Tone.Sequence(
      function(time, note) {
        synth.triggerAttackRelease(note, '10hz', time)
      },
      this.state.kick,
      '16n'
    )
    synthPart.start()
    Tone.Transport.start()
  }
  toggleActive(idx) {
    this.setState({
      active: this.state.active.includes(idx)
        ? this.state.active.filter(item => item !== idx)
        : [...this.state.active, idx]
    })
  }
  pushKickVal(idx) {
    this.state.kick[idx] === null
      ? (this.state.kick[idx] = 'C2')
      : (this.state.kick[idx] = null)
    this.toggleActive(idx)
  }
  render() {
    return (
      <div className="container">
        <h1>Hello from Sequencer Component!</h1>
        <Transport />
        <button type="button" onClick={this.handlePlay}>
          playSynth
        </button>

        <Kick
          kickArray={this.state.kick}
          active={this.state.active}
          css={this.state.css}
          pushKickVal={this.pushKickVal}
        />

        <Snare
          snareArray={this.state.snare}
          active={this.state.active}
          css={this.state.css}
        />
      </div>
    )
  }
}

export default connect(null, null)(Sequencer)
