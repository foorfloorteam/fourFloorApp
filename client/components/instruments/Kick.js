import React from 'react'
import {Card, Col, Row} from 'react-bootstrap'
import Tone from 'Tone'

export class Kick extends React.Component {
  constructor() {
    super()
    this.state = {
      kick: [],
      active: [],
      css: 'active'
    }
    this.pushKickVal = this.pushKickVal.bind(this)
    this.toggleActive = this.toggleActive.bind(this)
    this.handlePlay = this.handlePlay.bind(this)
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
  render() {
    const {kick} = this.state
    return (
      <div>
        <Row>
          <Col xs={2}>
            <Card>
              <Row>
                <Col xs={6}>
                  <button type="button" className="on-Off" onClick={this.handlePlay}>X</button>
                </Col>
                <Col xs={6}>
                  <Card.Title className="track-title">Kick</Card.Title>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={10}>
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
          </Col>
        </Row>
      </div>
    )
  }
}
