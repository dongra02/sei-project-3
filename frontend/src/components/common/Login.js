import React from 'react'
import { setToken } from '../../lib/auth'
import { loginUser } from '../../lib/api'

class Login extends React.Component {

  state = {
    formData: {
      email: '',
      password: ''
    }
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

    try {
      const response = await loginUser(this.state.formData)
      console.log('login complete')
      setToken(response.data.token)
      this.props.history.push('/quests')
    } catch (err) {
      console.log(this.state.formData)
    }
  }

  render() {

    const { formData } = this.state
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
        <div className="form-buttons">
          <button onClick={hidePopup}>cancel</button>
          <button onClick={this.handleSubmit}>submit</button>
        </div>
      </div>
    )
  }
}

export default Login