import React from 'react'
import {Card, Col, Row} from 'react-bootstrap'
import Tone from 'Tone'
import {demoTrack2} from '../../../public/scripts/demo2'

export class Snare extends React.Component {
  constructor() {
    super()
    this.state = {
      snare: demoTrack2[1],
      active: [],
      css: 'active',
      instrument: []
    }
    this.pushSnareVal = this.pushSnareVal.bind(this)
    this.toggleActive = this.toggleActive.bind(this)
    this.handlePlay = this.handlePlay.bind(this)
    this.createInst = this.createInst.bind(this)
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
      snare: row
    })
    this.createInst()
  }
  createInst() {
    const synth = new Tone.MembraneSynth().toMaster()
    const synthPart = new Tone.Sequence(
      function(time, note) {
        synth.triggerAttackRelease(note, '10hz', time)
      },
      this.state.snare,
      '16n'
    )
    synthPart.start()
    this.setState({instrument: synthPart})
  }
  toggleActive(idx) {
    this.setState({
      active: this.state.active.includes(idx)
        ? this.state.active.filter(item => item !== idx)
        : [...this.state.active, idx]
    })
  }
  pushSnareVal(idx) {
    this.toggleActive(idx)
    this.state.snare[idx] === null
      ? (this.state.snare[idx] = 'B3') && this.state.instrument.at(idx, 'B3')
      : this.state.snare[idx] && this.state.instrument.at(idx, [null])
    this.toggleActive(idx)
  }
  handlePlay() {
    Tone.Transport.start()
  }

  render() {
    // console.log(this.state.snare)
    const {snare} = this.state
    return (
      <div className="center">
        {snare
          ? snare.map((cell, idx) => (
              <div
                className={
                  this.state.active.includes(idx)
                    ? `cell cell-color ${this.state.css}`
                    : `cell cell-color`
                }
                onClick={() => this.pushSnareVal(idx)}
                key={idx}
              />
            ))
          : 'no cell'}
      </div>
    )
  }
}

