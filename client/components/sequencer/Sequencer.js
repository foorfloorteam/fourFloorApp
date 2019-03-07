import React from 'react'
import {connect} from 'react-redux'
import {Howl, Howler} from 'howler'
import ReactHowler from 'react-howler'

class Sequencer extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div className="container">
        <h1>Hello from Sequencer Component!</h1>
        <ReactHowler src={['1-hihat1.wav']} preload={true} playing={true} />
      </div>
    )
  }
}

export default connect(null, null)(Sequencer)
