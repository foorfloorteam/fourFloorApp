import React from 'react'
import {demoTrack} from '../../public/scripts/demo'
import {Row} from './Row'
import Tone from 'Tone'
import PositionTransform from '../../public/scripts/position';
import { connect } from 'react-redux'
import {Kick} from './instruments/Kick'
import {Button} from 'react-bootstrap'

export class DrumMachine extends React.Component {
  constructor() {
    super()
    this.state = {
        currentPattern: demoTrack,
        position: 0,
        playing: false,
        synth: []
    }
    this.updatePattern = this.updatePattern.bind(this)
    this.positionMarker = this.positionMarker.bind(this)
    this.startStop = this.startStop.bind(this)
    this.createInst = this.createInst.bind(this)
  }
  componentDidMount() {
    this.createInst()
  }
  createInst() {
    const synth = new Tone.MembraneSynth().toMaster()
    const synthPart1 = new Tone.Sequence(
      function(time, note) {
        synth.triggerAttackRelease(note, 0.5, time)
      },
      this.state.currentPattern[0],
      '16n'
    )
    const synthPart2 = new Tone.Sequence(
      function(time, note) {
        synth.triggerAttackRelease(note, 0.5, time)
      },
      this.state.currentPattern[1],
      '16n'
    )
    const synthPart3 = new Tone.Sequence(
      function(time, note) {
        synth.triggerAttackRelease(note, 0.5, time)
      },
      this.state.currentPattern[2],
      '16n'
    )
    const synthPart4 = new Tone.Sequence(
      function(time, note) {
        synth.triggerAttackRelease(note, 0.5, time)
      },
      this.state.currentPattern[3],
      '16n'
    )
    synthPart1.loop = true
    synthPart2.loop = true
    synthPart3.loop = true
    synthPart4.loop = true
    synthPart1.start()
    synthPart2.start()
    synthPart3.start()
    synthPart4.start()
    Tone.Transport.scheduleRepeat(this.positionMarker, '16n');
    Tone.Transport.setLoopPoints(0, '1m');
    Tone.Transport.loop = true;
    Tone.Transport.bpm.value = 120
    this.setState({synth: [...this.state.synth, synthPart1, synthPart2, synthPart3, synthPart4]})
  }
  startStop() {
    if (!this.state.playing) {
      this.setState({playing: true})
      Tone.Transport.start()
    } else {
      this.setState({playing: false})
      Tone.Transport.pause()
    }
  }
  updatePattern(channelNum, channelIndex) {
    if (channelNum === 0) {
      if (this.state.currentPattern[channelNum][channelIndex] === null) {
        this.state.synth[0].at(channelIndex, 'C4')
      } else {
        this.state.synth[0].remove(channelIndex)
      }
      this.state.currentPattern[channelNum][channelIndex] === null ?
      this.state.currentPattern[channelNum][channelIndex] = 'C4' :
      this.state.currentPattern[channelNum][channelIndex] = null
    } else if (channelNum === 1) {
      if (this.state.currentPattern[channelNum][channelIndex] === null) {
        this.state.synth[1].at(channelIndex, 'B3')
      } else {
        this.state.synth[1].remove(channelIndex)
      }
      this.state.currentPattern[channelNum][channelIndex] === null ?
      this.state.currentPattern[channelNum][channelIndex] = 'B3' :
      this.state.currentPattern[channelNum][channelIndex] = null
    } else if (channelNum === 2) {
      if (this.state.currentPattern[channelNum][channelIndex] === null) {
        this.state.synth[2].at(channelIndex, 'A3')
      } else {
        this.state.synth[2].remove(channelIndex)
      }
      this.state.currentPattern[channelNum][channelIndex] === null ?
      this.state.currentPattern[channelNum][channelIndex] = 'A3' :
      this.state.currentPattern[channelNum][channelIndex] = null
    } else if (channelNum === 3) {
      if (this.state.currentPattern[channelNum][channelIndex] === null) {
        this.state.synth[3].at(channelIndex, 'G3')
      } else {
        this.state.synth[3].remove(channelIndex)
      }
      this.state.currentPattern[channelNum][channelIndex] === null ?
      this.state.currentPattern[channelNum][channelIndex] = 'G3' :
      this.state.currentPattern[channelNum][channelIndex] = null
    }

      this.forceUpdate()
  }
  positionMarker() {
    this.setState({ position: PositionTransform[Tone.Transport.position.slice(0, 5)] });
  }
  render() {
    function makeRow(v, i){
      let pattern = v.slice()
      return (
        <Row
          key={`${i} row`}
          channelNum={i}
          channel={pattern}
          updatePattern={this.updatePattern}
          playing={this.state.playing}
        />
      )
    }
    return (
      <div className="pannel">
        <div className="center">
          {this.state.currentPattern.map(makeRow, this)}
          <br />
          <h4>Drums</h4>
          <Kick />
          <Button variant="dark" onClick={this.startStop}><i className="fas fa-play" /> / <i className="fas fa-pause" /></Button>
        </div>
      </div>
    )
  }
}

export default connect(null)(DrumMachine)
