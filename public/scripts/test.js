import Tone from 'Tone'

export const test = () => {
  const synth = new Tone.MembraneSynth().toMaster()
  const synthPart1 = new Tone.Sequence(
    function(time, note) {
      synth.triggerAttackRelease(note, '10hz', time)
    },
    this.state.currentPattern[0],
    '8n'
  )
  synthPart1.start()

  const synthPart2 = new Tone.Sequence(
    function(time, note) {
      synth.triggerAttackRelease(note, '10hz', time)
    },
    this.state.currentPattern[1],
    '8n'
  )
  synthPart1.start()
  synthPart2.start()
  Tone.Transport.start()
}
