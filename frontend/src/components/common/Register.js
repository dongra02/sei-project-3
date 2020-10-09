import React from 'react'
import { registerUser, loginUser } from '../../lib/api'
import { setToken } from '../../lib/auth'

class Register extends React.Component {

  state = {
    formData: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      imageUrl: ''
    }
  }

  handleChange = event => {
    const formData = {
      ...this.state.formData,
      [event.target.name]: event.target.value
    }

    this.setState({ formData })
  }

  handleSubmit = async event => {
    event.preventDefault()

    const { formData } = this.state
    let errorMessage = ''
    if (!formData.username) errorMessage = 'please choose a username'
    else if (!formData.email) errorMessage = 'please choose a valid email'
    else if (!formData.password) errorMessage = 'please enter a password'
    else if (formData.password !== formData.passwordConfirmation) errorMessage = 'password confirmation does not match'

    this.setState({ errorMessage })

    if (errorMessage) return

    try {
      await registerUser(formData)
      console.log('registration complete')
      const { email, password } = formData
      const response = await loginUser({ email, password })
      console.log('login complete')
      setToken(response.data.token)
      // TODO set register message
      this.props.hidePopup(null, 'Welcome to Found')
    } catch (err) {
      const errors = err.response.data.errors
      let errorMessage = ''
      if (errors.username) errorMessage = 'That username is already in use'
      else if (errors.email) errorMessage = 'That email already has an account'
      this.setState({ errorMessage })
    }
  }

  showWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      { 
        cloudName: 'dmhj1vjdf',
        uploadPreset: 'bu04dewe',
        showUploadMoreButton: false
      },
      (error, result) => {
        if (!error && result && result.event === 'success') { 
          const formData = { ...this.state.formData, imageUrl: result.info.url }
          this.setState({ formData })
        }
      })
    widget.open()
  }

  render() {

    const { formData, errorMessage } = this.state
    const { hidePopup } = this.props

    return (
      <div className="form-container">
        <h3>Register for an Account</h3>
        <div className="input-field">
          <input
            type="text"
            name="username"
            placeholder="username"
            value={formData.username}
            onChange={this.handleChange}
          />
        </div>
        <div className="input-field">
          <input
            type="text"
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={this.handleChange}
          />
        </div>
        <div className="input-field">
          <input
            type="password"
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={this.handleChange}
          />
        </div>
        <div className="input-field">
          <input
            type="password"
            name="passwordConfirmation"
            placeholder="confirm password"
            value={formData.passwordConfirmation}
            onChange={this.handleChange}
          />
        </div>
        <div className="input-field">
          <div className="image-picker" onClick={this.showWidget}>upload profile image</div>
        </div>
        <p className="error-message">{errorMessage}</p>
        <div className="form-buttons">
          <button onClick={hidePopup}>cancel</button>
          <button onClick={this.handleSubmit}>submit</button>
        </div>
      </div>
    )
  }
}

export default Register