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
        playing: false
    }
    this.handlePlay = this.handlePlay.bind(this)
    this.updatePattern = this.updatePattern.bind(this)
    this.positionMarker = this.positionMarker.bind(this)
  }
  componentDidMount() {
    Tone.Transport.scheduleRepeat(this.positionMarker, '16n');
  }
  handlePlay() {
    const synth = new Tone.MembraneSynth().toMaster()
    const synthPart1 = new Tone.Sequence(
      function(time, note) {
        synth.triggerAttackRelease(note, '10hz', time)
      },
      this.state.currentPattern[0],
      '16n'
    )
    const synthPart2 = new Tone.Sequence(
      function(time, note) {
        synth.triggerAttackRelease(note, '10hz', time)
      },
      this.state.currentPattern[1],
      '16n'
    )
    synthPart1.loop = true
    synthPart1.start()
    synthPart2.start()
    Tone.Transport.setLoopPoints(0, '1m');
    Tone.Transport.loop = true;
    Tone.Transport.start()
  }
  updatePattern(channelNum, channelIndex) {
    if (channelNum === 0) {
      this.state.currentPattern[channelNum][channelIndex] === null ?
      this.state.currentPattern[channelNum][channelIndex] = 'C2' :
      this.state.currentPattern[channelNum][channelIndex] = null
    } else {
      this.state.currentPattern[channelNum][channelIndex] === null ?
      this.state.currentPattern[channelNum][channelIndex] = 'C4' :
      this.state.currentPattern[channelNum][channelIndex] = null
    }

      console.log(this.state.currentPattern[1])
      this.forceUpdate()
  }
  positionMarker() {
    this.setState({ position: PositionTransform[Tone.Transport.position.slice(0, 5)] });
  }
  render() {
    console.log(this.state.position)
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
        <button onClick={this.handlePlay}>start</button>
      </div>
    )
  }
}
