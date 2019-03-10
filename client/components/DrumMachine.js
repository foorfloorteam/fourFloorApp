import React from 'react'
import {demoTrack} from '../../public/scripts/demo'
import {Row} from './Row'
import Tone from 'Tone'
import PositionTransform from '../../public/scripts/position';

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
    Tone.Transport.scheduleRepeat(this.positionMarker, '16n');
    Tone.Transport.loop = true;
    Tone.Transport.setLoopPoints(0, '1m');
    this.createInst()
  }
  createInst() {
    const synth = new Tone.MembraneSynth().toMaster()
    const synthPart1 = new Tone.Sequence(
      function(time, note) {
        synth.triggerAttackRelease(note, '10hz', time)
      },
      this.state.currentPattern[0],
      '16n'
    )
    synthPart1.loop = true
    synthPart1.start()
    this.setState({synth: [...this.state.synth, synthPart1]})
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
        this.state.synth[0].at(channelIndex, null)
      }
      this.state.currentPattern[channelNum][channelIndex] === null ?
      this.state.currentPattern[channelNum][channelIndex] = 'C2' :
      this.state.currentPattern[channelNum][channelIndex] = null
    } else {
      this.state.currentPattern[channelNum][channelIndex] === null ?
      this.state.currentPattern[channelNum][channelIndex] = 'C4' :
      this.state.currentPattern[channelNum][channelIndex] = null
    }
      this.forceUpdate()
  }
  positionMarker() {
    this.setState({ position: PositionTransform[Tone.Transport.position.slice(0, 5)] });
  }
  render() {
    // console.log(this.state.position)
    function makeRow(v, i){
      let pattern = v.slice()
      return (
        <Row
          key={`${i} row`}
          channelNum={i}
          channel={pattern}
          updatePattern={this.updatePattern}
        />
      )
    }
    return (
      <div className="center">
        {this.state.currentPattern.map(makeRow, this)}
        <button onClick={this.startStop}>start</button>
      </div>
    )
  }
}
