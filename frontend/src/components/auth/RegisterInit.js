import React from 'react'
import { Link } from 'react-router-dom'
import { registerUser } from '../../lib/api'
import { setToken } from '../../lib/auth'
import { backgroundImages } from '../../styles/backgroundImages'


class RegisterInit extends React.Component {
  state = {
    formData: {
      username: '',
      // firstName: '',
      // lastName: '',
      email: '',
      user_type: '',
      password: '',
      password_confirmation: '',
      profile_image: '',
      bio: ''
    },
    errors: {}
  }

  handleChange = e => {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    console.log(e.target.name, e.target.value)
    this.setState({ formData })
  }

  handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await registerUser(this.state.formData)
      setToken(res.data.token)
      this.props.history.push('/register/sent')
    } catch (err) {
      this.setState({ errors: err.response.data.errors })
    } 
  }

  render() {
    const { formData, errors } = this.state
    const formStyle = {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center'
    }
    const labelStyle = {
      margin: 20,
      minWidth: '25%'
    }
    const controlStyle = {
      margin: 20,
      minWidth: '60%'
    }
  
    return (
      <div className="register" style={{ 
        backgroundImage: `url(${backgroundImages[5]})`,
        backgroundPosition:'center', 
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: 500
        }}>
        <section className="section">
          <div className="container box" style={{ maxWidth: '60%', backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
            <h1 className="title">Register</h1>
            {/* <p style={{ fontSize: 10 }}>* required</p> */}
            <hr />

            <div className="columns">

              <form onSubmit={this.handleSubmit} className="column">
                <div className="field" style={formStyle}>
                  <label className="label" style={labelStyle}>Username</label>
                  <div className="control" style={controlStyle}>
                    <input
                      className={`input ${errors.username ? 'is-danger' : ''}`}
                      placeholder="Username"
                      name="username"
                      onChange={this.handleChange}
                      value={formData.username}
                    />
                  </div>
                  {errors.username && <small className="help is-danger">Username is required</small>}
                </div>
{/* 
                <div className="field" style={formStyle}>
                  <label className="label" style={labelStyle}>First Name</label>
                  <div className="control" style={controlStyle}>
                    <input
                      className={`input ${errors.firstName ? 'is-danger' : ''}`}
                      placeholder="First Name"
                      name="firstName"
                      onChange={this.handleChange}
                      value={formData.firstName}
                    />
                  </div>
                </div>

                <div className="field" style={formStyle}>
                  <label className="label" style={labelStyle}>Last Name</label>
                  <div className="control" style={controlStyle}>
                    <input
                      className={`input ${errors.lastName ? 'is-danger' : ''}`}
                      placeholder="Last Bame"
                      name="lastName"
                      onChange={this.handleChange}
                      value={formData.lastName}
                    />
                  </div>
                </div> */}

                <div className="field" style={formStyle}>
                  <label className="label" style={labelStyle}>You are: </label>
                  <div className="control" style={controlStyle}>
                  <label className="radio" style={{ marginRight: 20 }}>
                    <input type="radio" name="user_type"  value="cr" onClick={this.handleChange}/ >
                    Creator
                  </label>
                  <label className="radio">
                    <input type="radio"  name="user_type"  value="vw" onClick={this.handleChange} />
                    Viewer
                  </label>
                    {/* <input
                      className={`input ${errors.user_type ? 'is-danger' : ''}`}
                      placeholder="User Type"
                      name="user_type"
                      onChange={this.handleChange}
                      value={formData.user_type}
                    /> */}
                  </div>
                  {errors.user_type && <small className="help is-danger">User type is required</small>}
                </div>

                <div className="field" style={formStyle}>
                  <label className="label" style={labelStyle}>Email</label>
                  <p class="control has-icons-left has-icons-right"style={controlStyle}>
                    <input
                      className={`input ${errors.email ? 'is-danger' : ''}`}
                      placeholder="Email"
                      name="email"
                      onChange={this.handleChange}
                      value={formData.email}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                  {errors.email && <small className="help is-danger">Email is required</small>}
                </div>

                <div className="field" style={formStyle}>
                  <label className="label" style={labelStyle}>Password</label>
                  <p class="control has-icons-left has-icons-right"style={controlStyle}>
                    <input
                      className={`input ${errors.password ? 'is-danger' : ''}`}
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={this.handleChange}
                      value={formData.password}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock"></i>
                    </span>
                  </p>
                  {errors.password && <small className="help is-danger">Password is required</small>}
                </div>

                <div className="field" style={formStyle}>
                  <label className="label" style={labelStyle}>Confirm Password</label>
                  <div className="control" style={controlStyle}>
                    <input
                      type="password"
                      className={`input ${errors.password_confirmation ? 'is-danger' : ''}`}
                      placeholder="Password Confirmation"
                      name="password_confirmation"
                      onChange={this.handleChange}
                      value={formData.password_confirmation}
                    />
                  </div>
                  {errors.password_confirmation && <small className="help is-danger">Passwords do not match</small>}
                </div>

                <div className="field">
                  <button
                    type="submit"
                    className="button is-fullwidth is-black"
                    >Submit</button>
                </div>
              </form>


            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default RegisterInit