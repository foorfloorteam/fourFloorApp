import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Button} from 'react-bootstrap'
/**
 * COMPONENT
 */
export const UserHome = props => {
  const {user} = props

  return (
    <div className="center text-center marg-top">
      <h3>Welcome to fourFloor, {user.name}</h3>
      <br />
      <Link to="/drumMachine">
        <Button variant="outline-dark">Make some beats!</Button>
      </Link>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
