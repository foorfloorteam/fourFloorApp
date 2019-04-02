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
      instrument: [],
      divs: []
    }
    this.test = this.test.bind(this)
  }
  makeRow() {
    let row = []
    for (let i = 0; i < 1; i++) {
      row.push('C1')
    }
    return row
  }
  test() {
    const div = this.state.divs[0]
    if (this.props.playing) {
      Tone.Transport.schedule(function(time){
        Tone.Draw.schedule(function(){
          div.style.backgroundColor = 'rgb(216, 216, 90)'
        }, time)
        Tone.Draw.schedule(function(){
          div.style.backgroundColor = 'rgb(131, 129, 129)'
        }, time + 0.16)
      }, "0")
    }
  }
  async componentDidMount() {
    const row = this.makeRow()
    this.setState({
      timer: row
    })
    const column = await document.getElementsByClassName('time-cell')
    const div = []
    Array.prototype.forEach.call(column, function(val, idx){
      div.push(val)
    })
    this.setState({divs: div})
  }
  render() {
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
