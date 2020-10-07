import React from 'react'
import { registerUser } from '../../lib/api'

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

    try {
      const response = await registerUser(this.state.formData)
      this.props.hidePopup()
      console.log(response)
    } catch (err) {
      console.log(this.state.formData)
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

    const { formData } = this.state
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
        <div className="form-buttons">
          <button onClick={hidePopup}>cancel</button>
          <button onClick={this.handleSubmit}>submit</button>
          <button onClick={this.showWidget}>Upload Profile Image</button>
        </div>
      </div>
    )
  }
}

export default Register