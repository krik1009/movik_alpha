//! not update properly
import React from 'react'
import { getSingleUser, editUser, deleteUser } from '../../lib/api'
import { getUserId } from '../../lib/auth'
import ImageUpload from '../common/ImageUpload'


class ProfileEdit extends React.Component {
  state = {
    formData: {
      username: '',
      email: '',
      bio: '',
      profile_image: ''
    },
    errors: {}
  }

  async componentDidMount() {
    const userId = this.props.match.params.id
    try {
      const data = await getSingleUser(userId)
      this.setState({ formData: data })
    } catch (err) {
      this.props.history.push('/notfound')
      this.setState({ errors: err })
    }
  }

  handleChange = e => {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData })
  }

  handleSubmit = async e => {
    e.preventDefault()
    const userId = getUserId()
    console.log('edit', userId)
    try {
      await editUser(userId, this.state.formData)
      this.props.history.push(`/profiles/${userId}/`)
    } catch (err) {
      this.setState({ errors: err })
    }
  }

  handleDeleteAccount = async () => {
    const userId = getUserId()
    try {
      await deleteUser(userId)
      this.props.history.push('/')
    } catch (err) {
      this.setState({ errors: err })
    } 
  }

  render() {
    const { formData, errors } = this.state

    return (
      <div className="register" style={{ 
        backgroundImage: 'url(https://resources.stuff.co.nz/content/dam/images/1/x/l/z/k/g/image.related.StuffLandscapeSixteenByNine.710x400.1xlw5a.png/1571963011138.jpg)',
        backgroundPosition:'center', 
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: 800
        }}>
        <section className="section">
          <div className="container box" style={{ maxWidth: '60%', backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
            <h1 className="title">Update Profile</h1>
            <hr />
            <div className="columns">
              <form onSubmit={this.handleSubmit} className="column">
                <div className="field" style={{ marginTop: 20 }}>
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

                <div className="field" style={{ marginTop: 20 }}>
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

                <div className="field" style={{ marginTop: 20 }}>
                  <label className="label">Profile Image</label>

                  <div className="control">
                    <ImageUpload
                      onChange={this.handleChange}
                      name="profile_image"
                    />
                  </div>
                </div>

                <div className="field" style={{ marginTop: 20 }}>
                  <label className="label">Bio</label>
                  <div className="control">
                    <input
                      style={{ minHeight: 200 }}
                      type="textarea"
                      className={`input ${errors.bio ? 'is-danger' : ''}`}
                      placeholder="Introduce yourself. i.e. Hi everyone, I am..."
                      name="bio"
                      onChange={this.handleChange}
                      value={formData.bio}
                    />
                  </div>
                </div>
                <div className="buttons is-right" style={{ width: '100%' }}>
                  <div 
                    type="submit"
                    className="button is-black is-fullwidth"
                  >Update Profile</div>
                </div>
                <button onClick={this.handleDeleteAccount}>Delete Account</button>
              </form>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default ProfileEdit