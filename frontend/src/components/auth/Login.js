import React from 'react'
import { setToken } from '../../lib/auth'
import { loginUser } from '../../lib/api'

class Login extends React.Component {
  state = {
    formData: {
      email: '',
      password: ''
    },
    error: ''
  }

  handleChange = e => {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData, error: '' })
  }

  handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await loginUser(this.state.formData)
      setToken(res.data.token)
      this.props.history.push('/contents')
    } catch (err) {
      this.setState({ error: 'Oops, the details are invalid. Try again!' })
    }
  }


  render() {
    const { formData, error } = this.state

    return (
      <div className="login" style={{ 
        backgroundImage: 'url(https://static.billboard.com/files/media/concert-crowd-audience-stock-2019-u-billboard-1548-768x433.jpg)',
        backgroundPosition:'center', 
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: 500
        }}>
        <section className="section">
          <div className="container box" style={{ maxWidth: '60%', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
            <h1 className="title">Login</h1>
            <hr />
            <div className="columns">
              <form onSubmit={this.handleSubmit} className="column">
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      className={`input ${error ? 'is-danger' : ''}`}
                      placeholder="Email"
                      name="email"
                      onChange={this.handleChange}
                      value={formData.email}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      className={`input ${error ? 'is-danger' : ''}`}
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={this.handleChange}
                      value={formData.password}
                    />
                  </div>
                  {error && <small className="help is-danger">{error}</small>}
                </div>
                <div className="field">
                  <button
                    type="submit"
                    className="button is-fullwidth login-register-btn is-black">Login</button>
                </div>
              </form>

            </div>
          </div>
        </section>
      </div>
    )

  }
}


export default Login