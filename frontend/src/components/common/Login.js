import React from 'react'

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

  handleSubmit = () => {
    console.log(this.state.formData)
  }

  render() {

    const { formData } = this.state

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
        <div className="submit">
          <button onClick={this.handleSubmit}>submit</button>
        </div>
      </div>
    )
  }
}

export default Login