import React from 'react'
import {Card, Col, Row} from 'react-bootstrap'

export const Snare = props => {
  const {snareArray, toggleActive, active, css} = props
  return (
    <div>
      <Row>
        <Col xs={2}>
          <Card>
            <Card.Title>Snare</Card.Title>
          </Card>
        </Col>
        <Col xs={10}>
          {snareArray
            ? snareArray.map((cell, idx) => (
                <div
                  className={
                    active.includes(idx + 16)
                      ? `cell cell-color ${css}`
                      : `cell cell-color`
                  }
                  onClick={() => toggleActive(idx + 16)}
                  key={idx + 16}
                />
              ))
            : 'no cell'}
        </Col>
      </Row>
    </div>
  )
}
