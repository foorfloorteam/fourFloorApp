import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Card, Col, Row, Form, Button} from 'react-bootstrap'
/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="form-center marg-top">
      <Col md={{span: 6, offset: 3}}>
        <Card className="pad-top-bottom card-color">
          <h3>{displayName}</h3>
          <form className="text-center" onSubmit={handleSubmit} name={name}>
            <div>
              <label htmlFor="email" />
              <input name="email" type="text" placeholder="Email..." />
            </div>
            <br />
            <div>
              <label htmlFor="password" />
              <input
                name="password"
                type="password"
                placeholder="Password..."
              />
            </div>
            <br />
            <div>
              <Button
                className="break-inline"
                variant="outline-dark"
                type="submit"
              >
                {displayName}
              </Button>
            </div>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
          <br />
          <a href="/auth/google">{displayName} with Google</a>
        </Card>
      </Col>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
