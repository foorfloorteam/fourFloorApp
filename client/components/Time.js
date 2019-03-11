import React from 'react'
import {Card, Col, Row} from 'react-bootstrap'
import Tone from 'Tone'
export class Time extends React.Component {
  constructor() {
    super()
    this.state = {
      time: [],
      active: [],
      css: 'active',
      instrument: []
    }
    this.test = this.test.bind(this)
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
      time: row
    })
  }
  test() {
      // Tone.Transport.schedule(function(time){
      //   //use the time argument to schedule a callback with Tone.Draw
      //   Tone.Draw.schedule(function(){
      //     //do drawing or DOM manipulation here
      //     column[14].style.backgroundColor = 'rgb(216, 216, 90)'
      //   }, time + 1.12)
      // }, '0')
      // Tone.Transport.schedule(function(time){
      //   //use the time argument to schedule a callback with Tone.Draw
      //   Tone.Draw.schedule(function(){
      //     //do drawing or DOM manipulation here
      //     column[14].style.backgroundColor = 'rgb(131, 129, 129)'
      //   }, time + 1.2)
      // }, '0')
    // }
  }
  render() {
    const {time} = this.state
    return (
      <div className="center">
        {time
          ? time.map((cell, idx) => (
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
