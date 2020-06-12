//! comment section

import React from 'react'
import { getSingleContent, getSingleUser, getAllTags, getAllFollows, followOwner, unfollowOwner, getAllLikes, likeContent, unlikeContent, postComment, deleteComment } from '../../lib/api'
import { getUserId, isAuthenticated } from '../../lib/auth'
import { Link } from 'react-router-dom'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import axios from 'axios'

class Show extends React.Component {
  state = { 
    content: null,
    similarCont: '',
    self: null,
    owner: null,
    followed: false,
    liked: false,
    formData: {
      comment: '',
      commented_content: '',
      owner: ''
    }
  }

  getSimilarContents = async () => {
    const tags = await getAllTags()
    const content = this.state.content
    const sameTagConts = []
    for (let i = 0; i <= content.tags.length - 1; i++ ) {
      tags.map( tag => {
        if (tag.id === content.tags[i].id) sameTagConts.push(...tag.tagged_contents)
        return sameTagConts
      })
    }
    const similarCont = sameTagConts.filter(item => item.id !== content.id)
    this.setState({ similarCont })
  }

  getUsersInfo = async ownerId => {
    const userId = getUserId()
    if (userId) {
      const self = await getSingleUser(userId)
      const owner = await getSingleUser(ownerId)
      this.setState({ self, owner })
    } else {
      const owner = await getSingleUser(ownerId)
      this.setState({ owner })
    }
  }

  async componentDidMount() {
    const contentId = this.props.match.params.id
    try {
      const content = await getSingleContent(contentId)
      const ownerId = content.owner.id
      const formData = { 
        comment: '',
        commented_content: contentId,
        owner: await getUserId()
      }
      this.setState({ content, formData })
      this.getSimilarContents(content.tags, contentId)
      this.getUsersInfo(ownerId)
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  // follow
  checkAlreadyFollowed = () => {
    const userId = getUserId()
    return this.state.owner.followers.some(item => item.owner === userId)
  }

  followOwner = async toId => {
    try {
      const fromId = getUserId()
      if (!this.checkAlreadyFollowed()) {
        await followOwner(fromId, toId)
        this.state.self.followings.push(toId)
        this.state.owner.followers.push(fromId)
        this.setState({ followed: true })
      } else this.setState({ followed: true })
    } catch(err) {
      this.props.history.push('/notfound')
    }
  }
  
  unfollowOwner = async () => {
    const ownerId = this.state.content.owner.id
    const selfId = this.state.self.id
    const followers = await getAllFollows()
    const followId = followers.find( item => item.to.id === ownerId && item.owner.id === selfId).id
    await unfollowOwner(followId)
    await this.getUsersInfo(ownerId)
    this.setState({ followed: false })
  }
  

  // like
  checkAlreadyLiked = () => {
    return this.state.self.liked_contents.some(item => item.content === this.state.content.id)
  }

  likeContent = async () => {
    const selfId = this.state.self.id
    const contentId = this.state.content.id
    if (!this.checkAlreadyLiked()) {
      await likeContent(selfId, contentId)
      this.state.self.liked_contents.push(contentId)
      this.state.content.likes.push(selfId)
      this.setState({ liked: true })
    } else this.setState({ liked: true })
  }

  unlikeContent = async () => {
    const selfId = this.state.self.id
    const contentId = this.state.content.id
    const ownerId = this.state.content.owner.id
    const likes = await getAllLikes()
    const likeId = likes.find( item => item.owner === selfId && item.content === contentId).id
    console.log(likes, likeId)
    await unlikeContent(likeId)
    await this.getUsersInfo(ownerId)
    this.setState({ liked: false })
  }
  
  // comment
  handleChange = e => {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData })
  }

  handleSubmit = async e => {
    e.preventDefault()
    const contentId = this.props.match.params.id
    try {
      await postComment(this.state.formData)
      this.props.history.push(`/contents/${contentId}`)
    } catch (err) {
      this.setState({ errors: err })
    }
  }

  deleteComment = async id => {
    const ownerId = this.state.content.owner.id
    await deleteComment(id)
    this.getUsersInfo(ownerId)
  }

  render() {
    const { content, similarCont, followed, liked, owner, self, formData } = this.state
    if (!content || !similarCont || !owner ) return null
    const numLikes = content.likes ? content.likes.length : 0
    const numFollowers = owner.followers ? owner.followers.length : 0
    const numComments = content.comments ? content  .comments.length : 0
    const numSimilarCont = similarCont.length

    console.log(this.state, this.props)
    return (
      <div style={{ marginTop: 100, margin: 30 }}>

        <nav className="navbar is-transparent">
          <div id="navbarExampleTransparentExample" className="navbar-menu">
            <div className="navbar-start">
              <Link className="navbar-item" to={`/profiles/${owner.id}`} style={{ display: 'flex', flexDirection: 'column'}}>
                <img src={owner.profile_image} style={{borderRadius: "50%", minHeight: 100}}/>
                <p><strong>{owner.username}</strong></p>
                <p><i className="fas fa-users"></i>&nbsp;<strong>{numFollowers}</strong>&nbsp;fans</p>
              </Link>
              {isAuthenticated() && 
                <div className="navbar-item">
                  {!followed ?
                    <div 
                      className="button is-black" 
                      style={{ minWidth: 120 }} 
                      onClick={() => this.followOwner(owner.id)}>Follow</div>
                    :
                    <div 
                      className="button is-light" 
                      style={{ minWidth: 120 }} 
                      onClick={() => this.unfollowOwner(owner.id)}>Unfollow</div>}
                </div>}
            </div>

            <div className="navbar-end">

              <div className="navbar-item">
                <div className="field is-grouped">
                  <p className="control">
                    <a 
                      className="bd-tw-button button is-info" 
                      data-social-network="Twitter" 
                      data-social-action="tweet" 
                      data-social-target="xx" 
                      target="_blank" 
                      href="https://twitter.com/intent/tweet?text=movik: a modern platform for creators and supporters&amp;hashtags=movik&amp;url=http://www.movik.net"
                      style={{ minWidth: 120 }}
                    >
                      <span className="icon">
                        <i className="fab fa-twitter"></i>
                      </span>
                      <span>
                        Tweet
                      </span>
                    </a>
                  </p>
                  <p className="control">
                    <a className="button is-black" href={content.video} style={{ minWidth: 120 }}>
                      <span className="icon">
                        <i className="fas fa-download"></i>
                      </span>
                      <span>Download</span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </nav>


        <div style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <video style={{ maxWidth: "98%", marginTop: 20 }}controls>
            <source src={content.video} type="video/mp4" />
          </video>
          {numLikes > 1 && <p style={{ alignSelf: "flex-start", margin: 20, fontSize: 12 }}>
           <i class="fas fa-heart"></i> <strong>{numLikes}</strong> people liked this content</p> }
          {isAuthenticated() && 
            <>
              {!liked ? 
                <div className="button is-small" 
                  style={{ minWidth: 80, alignSelf: "flex-end", margin: 20}}
                  onClick={this.likeContent}>
                  Like
                </div>
                :
                <div className="button is-small" 
                  style={{ minWidth: 80, alignSelf: "flex-end", margin: 20}}
                  onClick={this.unlikeContent}>
                  Unlike
              </div>}
            </>}
          <p style={{ fontSize: 20, alignSelf: "flex-start", margin: 20 }}><strong>{content.title}</strong></p>
          <p style={{ fontSize: 16, alignSelf: "flex-start", marginLeft: 20 }}>{content.description}</p>
         
          <br />
        </div>

        <hr />
        <div>
          <p style={{ marginBottom: 10 }}>Comments</p>
          {numComments > 0 && content.comments.map( item => (
            <article className="media" key={item.id}>
            <figure className="media-left">
              <p className="image is-64x64">
                <img src={item.owner.profile_image} alt={item.owner.username}/>
              </p>
            </figure>
            <div className="media-content">
              <div className="content">
                <p>
                  <strong>{item.owner.username}</strong> <small>{item.owner.email}</small> <small>31m</small>
                  <br />
                  {item.comment}
                </p>
              </div>
              <nav className="level is-mobile">
                <div className="level-left">
                  <a className="level-item">
                    <span className="icon is-small"><i className="fas fa-heart"></i></span>
                  </a>
                </div>
              </nav>
            </div>
            <div className="media-right">
              <button
                className="delete" 
                onClick={() => this.deleteComment(item.id)}
                ></button>
            </div>
          </article>
          ))}

          <article className="media">
            <figure className="media-left">
              <p className="image is-64x64">
                <img src={self.profile_image} alt={self.username} />
              </p>
            </figure>
            <div className="media-content">
              <div className="field">
                <p className="control">
                  <textarea 
                    className="textarea" 
                    placeholder="Add a comment..."
                    onChange={this.handleChange}
                    name="comment"
                    value={formData.comment}
                    ></textarea>
                </p>
              </div>
              <div className="field">
                <p className="control">
                  <button className="button" onClick={this.handleSubmit}>Post comment</button>
                </p>
              </div>
            </div>
          </article>
        </div>
        
        <hr />
        <div>
          <p>You might also like...</p>
          <CarouselProvider
            naturalSlideWidth={300}
            naturalSlideHeight={200}
            totalSlides={numSimilarCont}
            visibleSlides={3}
            style={{ margin: 20 }}
          >
            <Slider>
            {similarCont.map( (item, i) => (
                <Slide key={item.id} index={i}>
                  <a href={`/contents/${item.id}`}>
                    <Image
                      // className="d-block w-100"
                      src={item.thumbnail} 
                      style={{ maxWidth: 300, maxHeight: 200 }} 
                      alt={item.title}
                    />
                  </a>
                    <div style={{ display: "flex", justifyContent: "space-between", maxWidth: 300 }}>
                      <ButtonBack className="button is-small" style={{ margin: 10 }}>Back</ButtonBack>
                      <ButtonNext className="button is-small" style={{ margin: 10 }}>Next</ButtonNext>
                    </div>
                  </Slide>
                ))
              }
            </Slider>
          </CarouselProvider>
        </div>
      </div>
    )
  }
}

export default Show