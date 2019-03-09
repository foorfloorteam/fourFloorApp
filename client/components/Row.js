import React from 'react'

export const Row = (props) => {
  function makeButtonRow(v, i) {
    const activeClass = v ? 'active' : ''
    return (
      <div
        className={`cell cell-color ${activeClass}`}
        button-channel={props.channelNum}
        key={`${v}${i}`}
        onClick={() => props.updatePattern(props.channelNum, i)}
       />
    )
  }
  return (
    <div className="buttonRow">
      {props.channel.map(makeButtonRow, this)}
    </div>
  )
}
