//! function - follow, donate
//! function - delete contents

import React from 'react'
import { Link } from 'react-router-dom'
import { getSingleUser } from '../../lib/api'
import { getUserId, isAuthenticated } from '../../lib/auth'
import { triggerOutlook } from '../../lib/email'


class ProfileShow extends React.Component {
  state = {
    profile: null
  }

  async componentDidMount() {
    const userId = this.props.match.params.id
    try {
      const profile = await getSingleUser(userId)
      this.setState({ profile })
    } catch(err) {
      this.props.history.push('/notfound')
    }
  }

  isContentOwner = ownerId => {
    if (getUserId() === ownerId ) return true
    else return false
  }

  isSelf = () => {
    const currentUserId = getUserId()
    const profileUserId = parseInt(this.props.match.params.id)
    if (currentUserId === profileUserId ) return true
    else return false
  }


  render() {
    console.log(this.state, this.props, this.isSelf())

    const { profile } = this.state
    if (!profile) return null

    return (
      <div className="container">
        <hr />
        <div className="buttons is-right">
          {(isAuthenticated() && !this.isSelf()) && <div className="button is-black">Follow</div>} 
          {(isAuthenticated() && !this.isSelf()) && <div className="button is-black">Donate</div>}
          {this.isSelf() && <Link className="button" to={`/profiles/${profile.id}/edit`}>Edit</Link>}
        </div>
        <header style={{ display: "flex", justifyContent: "center", margin: 20 }}>
          <img src={profile.profile_image} alt={profile.username}
            style={{borderRadius: "50%", height: 120}}
          />
          <div style={{ margin: 20 }}>
            <h1 style={{ fontWeight: 900, fontSize: 28 }}>{profile.username.replace(profile.username[0], profile.username[0].toUpperCase())}</h1>
            {isAuthenticated() && <p style={{ fontSize: 12 }} 
            // onClick={triggerOutlook(profile.email, 'Hi from movik.com')}
            >
              <i className="fas fa-reply"></i>&nbsp;{profile.email}
            </p>}
            <p style={{ fontSize: 14 }}>{profile.bio}</p>
          </div>
        </header>
        <hr />

        <main>
          <h2>My Contents</h2>
          <div>
          {profile.uploaded_contents.map(item => (
            <Link to={`/contents/${item.id}`} key={item.id}>
              <img src={item.thumbnail} alt={item.title} style={{ maxWidth: 300, maxHeight: 200, margin: 10}} />
              {this.isContentOwner(item.owner.id) && <button>x</button>}
            </Link>
          ))}
          </div>
        </main>
      </div>
    )
  }
}

export default ProfileShow