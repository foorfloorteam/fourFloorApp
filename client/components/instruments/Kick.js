import React from 'react'
import {Card, Col, Row} from 'react-bootstrap'

export const Kick = props => {
  const {kickArray, active, css, pushKickVal} = props
  return (
    <div>
      <Row>
        <Col xs={2}>
          <Card>
            <Card.Title>Kick</Card.Title>
          </Card>
        </Col>
        <Col xs={10}>
          {kickArray
            ? kickArray.map((cell, idx) => (
                <div
                  className={
                    active.includes(idx)
                      ? `cell cell-color ${css}`
                      : `cell cell-color`
                  }
                  onClick={() => pushKickVal(idx)}
                  key={idx}
                />
              ))
            : 'no cell'}
        </Col>
      </Row>
    </div>
  )
}
