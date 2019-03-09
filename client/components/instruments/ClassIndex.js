import React from 'react'
import Tone from 'Tone'

class Instrument {
  constructor() {
    this.pattern = new Array(16).fill(false)
  }

  initializePattern() {
    this.pattern.fill(false)
  }
}

export class Percussion extends Instrument {
  constructor() {
    super()
    this.percussionTone = new Tone.MembraneSynth()
  }

  updatePattern(idx) {
    this.pattern.map((note, i) => (i === idx ? !note : note))
  }
}
