import React from 'react'
import {Card, Col, Row} from 'react-bootstrap'
import Tone from 'Tone'
import {demoTrack2} from '../../../public/scripts/demo2'
export class Kick extends React.Component {
  constructor() {
    super()
    this.state = {
      kick: demoTrack2[0],
      active: [],
      css: 'active',
      instrument: []
    }
    this.pushKickVal = this.pushKickVal.bind(this)
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
      kick: row
    })
    this.createInst()
  }
  createInst() {
    const synth = new Tone.MembraneSynth().toMaster()
    const synthPart = new Tone.Sequence(
      function(time, note) {
        synth.triggerAttackRelease(note, '10hz', time)
      },
      this.state.kick,
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
  pushKickVal(idx) {
    if (this.state.kick[idx] === null) {
      this.state.instrument.at(idx, 'C1')
      this.state.kick[idx] = 'C1'
    } else {
      this.state.instrument.remove(idx)
      this.state.kick[idx] = null
    }
    this.toggleActive(idx)
  }
  handlePlay() {
    Tone.Transport.start()
  }
  render() {
    console.log(this.state)
    const {kick} = this.state
    return (
      <div className="center">
        {kick
          ? kick.map((cell, idx) => (
              <div
                className={
                  this.state.active.includes(idx)
                    ? `cell cell-color ${this.state.css}`
                    : `cell cell-color`
                }
                onClick={() => this.pushKickVal(idx)}
                key={idx}
              />
            ))
          : 'no cell'}
      </div>
    )
  }
}
