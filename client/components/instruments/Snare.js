import React from 'react'
import {Card, Col, Row} from 'react-bootstrap'
import Tone from 'Tone'

var player = new Tone.Player('../../1-snare1.wav').toMaster()

export class Snare extends React.Component {
  constructor() {
    super()
    this.state = {
      snare: [],
      active: [],
      css: 'active'
    }
    this.pushSnareVal = this.pushSnareVal.bind(this)
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
      snare: row
    })
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
      ? (this.state.snare[idx] = 'C3')
      : (this.state.snare[idx] = null)
    this.toggleActive(idx)
    console.log(idx)
    console.log(this.state.snare)
  }
  handlePlay() {
    const snare = new Tone.MembraneSynth().toMaster()

    const snarePart = new Tone.Sequence(
          function(time, note) {
            snare.triggerAttackRelease(note, '10hz', time)
          },
          this.state.snare,
          '16n'
        )
        Tone.Transport.loopEnd = '1m'
        Tone.Transport.loop = true
        snarePart.start()
        Tone.Transport.start()
        snare.sync()
    }

  render() {
    console.log(this.state)
    const {snare} = this.state
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
                  <Card.Title className="track-title">Snare</Card.Title>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={10}>
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
          </Col>
        </Row>
        <button onClick={() => player.start()}>test</button>
      </div>
    )
  }
}

