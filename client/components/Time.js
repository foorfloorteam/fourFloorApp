import React from 'react'
import {Card, Col, Row} from 'react-bootstrap'
import Tone from 'Tone'
export class Time extends React.Component {
  constructor() {
    super()
    this.state = {
      timer: [],
      active: [],
      css: 'active',
      instrument: []
    }
    this.test = this.test.bind(this)
    this.createInst = this.createInst.bind(this)
  }
  makeRow() {
    const column = document.getElementsByClassName('time-cell')
    let row = []
    for (let i = 0; i < 16; i++) {
      row.push(column)
    }
    return row
  }
  componentDidMount() {
    const row = this.makeRow()
    this.setState({
      timer: row
    })
    this.createInst()
  }
  createInst() {
    const timer = new Tone.MembraneSynth()
    const timePart = new Tone.Sequence(
      function(time, note) {
        timer.triggerAttackRelease(note, '10hz', time)
        Tone.Draw.schedule(function(){
          note.style.backgroundColor = 'rgb(216, 216, 90)'
        })
      },
      this.state.timer[0],
      '16n'
    )
    timePart.start()
    this.setState({instrument: timePart})
  }
  test() {
    const column = document.getElementsByClassName('time-cell')
    if (this.props.playing) {
      Tone.Transport.schedule(function(time){
        //use the time argument to schedule a callback with Tone.Draw
        Tone.Draw.schedule(function(){
          //do drawing or DOM manipulation here
          column[0].style.backgroundColor = 'rgb(216, 216, 90)'
        }, time)
      }, '0')
      Tone.Transport.schedule(function(time){
        //use the time argument to schedule a callback with Tone.Draw
        Tone.Draw.schedule(function(){
          //do drawing or DOM manipulation here
          column[0].style.backgroundColor = 'rgb(131, 129, 129)'
        }, time + 0.16)
      }, '0')
    }
  }
  render() {
    console.log(this.state.timer[0])
    const {timer} = this.state
    return (
      <div className="center">
        {timer
          ? timer.map((cell, idx) => (
              <div
                className={
                  this.state.active.includes(idx)
                    ? `time-cell-color time-cell ${this.state.css}`
                    : `time-cell-color time-cell`
                }
                key={idx}
              />
            ))
          : 'no cell'}
          {this.test()}
      </div>
    )
  }
}
