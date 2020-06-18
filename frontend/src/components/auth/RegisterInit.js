import React from 'react'
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
    const overBreakPoint = window.innerWidth > 420 ? true : false
    const backgroundStyle = {
      display: 'flex',
      justifyContent: 'center',
      backgroundImage: `url(${backgroundImages[5]})`,
      backgroundPosition:'center', 
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      minHeight: overBreakPoint ? 800 : 500,
    }
    const containerStyle = {
      minWidth: overBreakPoint ? 700 : '95%',
      backgroundColor: 'rgba(255, 255, 255, 0.7)'
    }
    const titleStyle ={
      fontSize: overBreakPoint ? 28 : 20
    }
    const formStyle = {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center'
    }
    const labelStyle = {
      margin: overBreakPoint ? 12 : 8,
      width: overBreakPoint ? '25%' : '100%',
      fontSize: overBreakPoint ? 18 : 10,
      fontFamily: 'arial'
    }
    const controlStyle = {
      margin: overBreakPoint ? 12 : 8,
      width: overBreakPoint ? '70%' : '100%',
      fontSize: overBreakPoint ? 18 : 10,
    }
    const submitBtnStyle = {
      marginTop: 50
    }

    return (
      <div className="register" style={backgroundStyle}>
        <section className="section">
          <div className="container box" style={containerStyle}>
            <h1 className="title" style={titleStyle}>Registeration Form</h1>
            <p style={{ fontSize: 12 }}>We will share with you our new product features.</p>
            <hr />

            <div className="columns">

              <form onSubmit={this.handleSubmit} className="column">

                <div className="field" style={formStyle}>
                  {overBreakPoint && <label className="label" style={labelStyle}>Username</label>}
                  <div className="control" style={controlStyle}>
                  {!overBreakPoint && <label className="label" style={labelStyle}>Username</label>}
                    <input
                      className={`input ${errors.username ? 'is-danger' : ''} ${overBreakPoint ? '': 'is-small'}`}
                      placeholder="Username"
                      name="username"
                      onChange={this.handleChange}
                      value={formData.username}
                    />
                  </div>
                  {errors.username && <small className="help is-danger">Username is required</small>}
                </div>

                <div className="field" style={formStyle}>
                  {overBreakPoint && <label className="label" style={labelStyle}>You are: </label>}
                  <div className="control" style={controlStyle}>
                  {!overBreakPoint && <label className="label" style={labelStyle}>You are: </label>}
                  <label className="radio" style={{ marginRight: 20 }}>
                    <input type="radio" name="user_type"  value="cr" onClick={this.handleChange} style={{ marginRight: 8}}/>
                    Creator
                  </label>
                  <label className="radio">
                    <input type="radio"  name="user_type"  value="vw" onClick={this.handleChange} style={{ marginRight: 8}}/>
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
                  {overBreakPoint && <label className="label" style={labelStyle}>Email</label>}
                  <p className={`${overBreakPoint ? "control has-icons-left has-icons-right" : 'control'}`} style={controlStyle}>
                    {!overBreakPoint && <label className="label" style={labelStyle}>Email</label>}
                    <input
                      className={`input ${errors.email ? 'is-danger' : ''} ${overBreakPoint ? '': 'is-small'}`}
                      placeholder="Email"
                      name="email"
                      onChange={this.handleChange}
                      value={formData.email}
                    />
                    {overBreakPoint && 
                      <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                      </span>}
                  </p>
                  {errors.email && <small className="help is-danger">Email is required</small>}
                </div>

                <div className="field" style={formStyle}>
                  {overBreakPoint && <label className="label" style={labelStyle}>Password</label>}
                  <p className={`${overBreakPoint ? "control has-icons-left has-icons-right" : 'control'}`} style={controlStyle}>
                    {!overBreakPoint && <label className="label" style={labelStyle}>Password</label>}
                    <input
                      className={`input ${errors.password ? 'is-danger' : ''} ${overBreakPoint ? '': 'is-small'}`}
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={this.handleChange}
                      value={formData.password}
                    />
                    {overBreakPoint && 
                      <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                      </span>}
                  </p>
                  {errors.password && <small className="help is-danger">Password is required</small>}
                </div>

                <div className="field" style={formStyle}>
                  {overBreakPoint && <label className="label" style={labelStyle}>Confirmation</label>}
                  <div className="control" style={controlStyle}>
                    {!overBreakPoint && <label className="label" style={labelStyle}>Confirmation</label>}
                    <input
                      type="password"
                      className={`input ${errors.password_confirmation ? 'is-danger' : ''} ${overBreakPoint ? '': 'is-small'}`}
                      placeholder="Confirm Your Password"
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
                    style={submitBtnStyle}
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