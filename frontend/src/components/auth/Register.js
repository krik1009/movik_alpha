// ! logic to add bio, fav tag/category page
// ! not register properly

import React from 'react'
import { registerUser } from '../../lib/api'
import { setToken, getUserId } from '../../lib/auth'
import ImageUpload from '../common/ImageUpload'


class Register extends React.Component {
  state = {
    formData: {
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      profile_image: '',
      bio: ''
    },
    errors: {}
  }

  handleChange = e => {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData })
  }

  handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await registerUser(this.state.formData)
      setToken(res.data.token)
      const userId = getUserId()
      this.props.history.push(`/profiles/${userId}`)
    } catch (err) {
      this.setState({ errors: err.response.data.errors })
    } 
  }


  render() {
    const { formData, errors } = this.state

    return (
      <div className="register" style={{ 
        backgroundImage: 'url(https://img.freepik.com/free-photo/happy-people-dance-nightclub-party-concert_31965-114.jpg?size=626&ext=jpg)',
        backgroundPosition:'center', 
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: 500
        }}>
        <section className="section">
          <div className="container box" style={{ maxWidth: '60%', backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
            <h1 className="title">Register</h1>
            <hr />
            <div className="columns">
              <form onSubmit={this.handleSubmit} className="column">
                <div className="field">
                  <label className="label">Username</label>
                  <div className="control">
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
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      className={`input ${errors.email ? 'is-danger' : ''}`}
                      placeholder="Email"
                      name="email"
                      onChange={this.handleChange}
                      value={formData.email}
                    />
                  </div>
                  {errors.email && <small className="help is-danger">Email is required</small>}
                </div>

                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      className={`input ${errors.password ? 'is-danger' : ''}`}
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={this.handleChange}
                      value={formData.password}
                    />
                  </div>
                  {errors.password && <small className="help is-danger">Password is required</small>}
                </div>

                <div className="field">
                  <label className="label">Password Confirmation</label>
                  <div className="control">
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
                  <label className="label">Profile Image (option)</label>
                  <div className="control">
                    <ImageUpload
                      onChange={this.handleChange}
                      name="profile_image"
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Bio (option)</label>
                  <div className="control">
                    <input
                      type="textarea"
                      className={`input ${errors.bio ? 'is-danger' : ''}`}
                      placeholder="Introduce yourself: i.e. Hi, I am ..."
                      name="bio"
                      onChange={this.handleChange}
                      value={formData.bio}
                      style={{ minHeight: 200 }}
                    />
                  </div>
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

export default Register