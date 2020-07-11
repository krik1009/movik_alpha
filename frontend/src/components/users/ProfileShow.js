//! function - donation
//! edit cont, delete cont (from cloudinary)


import React from 'react'
import { Link } from 'react-router-dom'
import { getSingleUser, deleteContent, deleteTag, deleteCategory, getAllFollows, followOwner, unfollowOwner } from '../../lib/api'
import { getUserId, isAuthenticated } from '../../lib/auth'
// import { triggerOutlook } from '../../lib/email'
import New from '../contents/New'


class ProfileShow extends React.Component {
  state = {
    profile: null,
    followed: false
  }

  updateProfile = async () => {
    const userId = this.props.match.params.id
    try {
      console.log('hey')
      const profile = await getSingleUser(userId)
      this.setState({ profile })
    } catch(err) {
      this.props.history.push('/notfound')
    }
  }

  async componentDidMount() {
    this.updateProfile()
  }

  isContentOwner = ownerId => {
    if ( parseInt(getUserId()) === parseInt(ownerId) ) return true
    else return false
  }

  isSelf = () => {
    const currentUserId = getUserId()
    const profileUserId = parseInt(this.props.match.params.id)
    if (currentUserId === profileUserId ) return true
    else return false
  }

  handleDeleteContent = async contentId => {
    await deleteContent(contentId)
    this.updateProfile()
  }

  handleDeleteTag = async tagId => {
    await deleteTag(tagId)
    this.updateProfile()
  }

  handleDeleteCategory = async categoryId => {
    await deleteCategory(categoryId)
    this.updateProfile()
  }

  // follow
  checkAlreadyFollowed = () => {
    const fromId = getUserId()
    return this.state.profile.followers.some(item => item.owner === fromId)
  }
  
  followOwner = async () => {
    try {
      const fromId = getUserId()
      const toId = this.state.profile.id
      if (!this.checkAlreadyFollowed()) {
        await followOwner(fromId, toId)
        // this.state.self.followings.push(toId)
        this.state.profile.followers.push(fromId)
        this.setState({ followed: true })
      } else this.setState({ followed: true })
    } catch(err) {
      this.props.history.push('/notfound')
    }
  }
  
  unfollowOwner = async () => {
    const ownerId = this.state.profile.id
    const selfId = getUserId()
    const followers = await getAllFollows()
    const followId = followers.find( item => item.to.id === ownerId && item.owner.id === selfId).id
    await unfollowOwner(followId)

    const removedIndex = this.state.profile.followers.indexOf(this.state.profile.followers.find( item => item.owner === selfId))
    this.state.profile.followers.splice(removedIndex, 1)
    this.setState({ followed: false })
  }
  


  render() {
    const { profile, followed } = this.state
    if (!profile) return null

    const numConts = profile.uploaded_contents.length
    const numFollowers = profile.followers.length
    const styleBtnDelete = { fontFamily: 'arial', fontSize: 10, width: 10, height: 10 }
    
    console.log(profile, this.isSelf())

    return (
      <div className="container">
        <hr />
        <div className="buttons is-right">
          {(isAuthenticated() && !this.isSelf()) && 
          <>
            {!followed ? 
              <div className="button" onClick={this.followOwner}>Follow</div>
              :
              <div className="button is-light" onClick={this.unfollowOwner}>Unfollow</div>
            }
          </>} 
          {!this.isSelf() &&
          <div className="button is-black">Donate</div>}
          
          {this.isSelf() && <Link className="button" to={`/profiles/${profile.id}/edit`}>Edit</Link>}
        </div>
        <header style={{ display: "flex", justifyContent: "center", margin: 20 }}>
          {profile.profile_image ? 
            <img src={profile.profile_image} alt={profile.username}
              style={{borderRadius: "50%", height: 120}}
            />
            :
            <i className="fas fa-user-circle" style={{ height: 120 }}></i>
          }
          <div style={{ margin: 20 }}>
            <h1 style={{ fontWeight: 900, fontSize: 28 }}>
              {profile.username.replace(profile.username[0], profile.username[0].toUpperCase())}</h1>
            {numFollowers > 0 && 
              <p style={{ marginTop: 10 }}><i className="fas fa-users"></i>&nbsp;<strong>{numFollowers}</strong>&nbsp;fans</p>}
            {isAuthenticated() && 
            <p style={{ fontSize: 12 }} 
            // onClick={triggerOutlook(profile.email, 'Hi from movik.com')}
            >
              <i className="fas fa-reply"></i>&nbsp;{profile.email}
            </p>}
            <hr />
            <p style={{ fontSize: 14 }}>{profile.bio}</p>
          </div>
        </header>
        <hr />

        <main>
          <div className="container">
            <div className="box">
              <h2>Contents</h2>
              <hr />
              <div style={{ display: 'flex', flexWrap: 'wrap', minHeight: 500 }}>
                {profile.uploaded_contents.map(item => (
                  <div key={item.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <Link to={`/contents/${item.id}`}>
                      <img 
                        src={item.thumbnail} 
                        alt={item.title} 
                        style={{ maxWidth: 300, maxHeight: 200, marginTop: 10, marginLeft: 10, marginRight: 10, marginBottom: 0}} />
                    </Link>
                    {this.isContentOwner(item.owner) && 
                      <div className="buttons" style={{ marginTop: 0, marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
                        <Link 
                          className="button is-small" 
                          style={{ fontFamily: 'arial', fontSize: 10, width: 15, height: 10 }}
                          to={`/contents/${item.id}/edit`}
                          >Edit</Link>
                        <div 
                          className="delete"
                          style={styleBtnDelete}
                          onClick={() => this.handleDeleteContent(item.id)}></div>
                      </div>
                    }
                  </div>
                ))}
                {(this.isSelf() && numConts === 0) &&
                  <div style={{ width: "100%"}}>
                    Upload Contents
                    <New updateProfile={this.updateProfile} />
                  </div>
                }
              </div>
            
            </div>
          </div>
       
          
          {this.isSelf() &&
            <div className="columns" style={{ marginTop: 20, marginBottom: 20 }}>
              <div className="column box" style={{ margin: 20, minHeight: 200 }}>
                <h3>Your Tags</h3>
                <hr />
                {profile.your_tags.map( item => (
                  <span className="tag" key={item.id} style={{ borderColor: "white", margin: 3 }}>
                    {item.name}
                    <button 
                      className="delete is-small" 
                      style={styleBtnDelete} 
                      onClick={() => this.handleDeleteTag(item.id)}></button>
                  </span>
                ))}
              </div>

              <div className="column box" style={{ margin: 20, minHeight: 200 }}>
                <h3>Your Categories</h3>
                <hr />
                {profile.created_categories.map( item => (
                  <span className="tag" key={item.id} style={{ borderColor: "white", margin: 3 }}>
                    {item.name}
                    <button 
                      className="delete is-small"
                      style={styleBtnDelete} 
                      onClick={() => this.handleDeleteCategory(item.id)}></button>
                  </span>
                ))}
              </div>
            </div>}
        
        </main>
      </div>
    )
  }
}

export default ProfileShow