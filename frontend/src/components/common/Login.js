import React from 'react'
import { setToken } from '../../lib/auth'
import { loginUser } from '../../lib/api'

class Login extends React.Component {

  state = {
    formData: {
      email: '',
      password: ''
    },
    errorMessage: ''
  }

  handleChange = event => {
    const formData = {
      ...this.state.formData,
      [event.target.id]: event.target.value
    }

    this.setState({ formData })
  }

  handleSubmit = async event => {
    event.preventDefault()

    const { formData } = this.state

    let errorMessage = ''
    if (!formData.email) errorMessage = 'please provide an email address'
    else if (!formData.password) errorMessage = 'please provide your password'
    this.setState({ errorMessage })

    try {
      const response = await loginUser(formData)
      console.log(response)
      console.log('login complete')
      setToken(response.data.token)
      this.props.hidePopup(null, response.data.message)
    } catch (err) {
      console.log(err)
      this.setState({ errorMessage: 'login failed. please check your details'})
    }
  }

  render() {

    const { formData, errorMessage } = this.state
    const { hidePopup } = this.props

    return (
      <div className="form-container">
        <h3>Login</h3>
        <div className="input-field">
          <input
            type="text"
            id="email"
            placeholder="email"
            value={formData.email}
            onChange={this.handleChange}
          />
        </div>
        <div className="input-field">
          <input
            type="password"
            id="password"
            placeholder="password"
            value={formData.password}
            onChange={this.handleChange}
          />
        </div>
        <p className="error-message">{errorMessage}</p>
        <div className="form-buttons">
          {hidePopup && <button onClick={hidePopup}>cancel</button>}
          <button onClick={this.handleSubmit}>submit</button>
        </div>
      </div>
    )
  }
}

export default Login