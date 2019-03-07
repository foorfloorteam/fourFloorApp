import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {user} = props

  return (
    <div>
      <h3>Welcome to FourFloor, {user.name}</h3>
      <Link to="/sequencer">MAKE SOME BEATS</Link>
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
