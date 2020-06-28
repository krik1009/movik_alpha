import React from 'react'
import { getSingleContent, getSingleUser, getAllTags, getAllFollows, followOwner, unfollowOwner, likeContent, unlikeContent, postComment, likeComment, deleteComment } from '../../lib/api'
import { getUserId, isAuthenticated } from '../../lib/auth'
import { frontEndBaseUrl } from '../../lib/url'
import { Link } from 'react-router-dom'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import {
  EmailShareButton,
  FacebookShareButton,
  PinterestShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  PinterestIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon
} from "react-share"
import Moment from 'react-moment'
import 'moment-timezone'

class Show extends React.Component {
  state = { 
    content: null,
    similarCont: null,
    self: '',
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

  getUserInfo = async ownerId => {
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
    try {
      const contentId = this.props.match.params.id
      const content = await getSingleContent(contentId)
      const ownerId = content.owner.id
      const formData = { 
        comment: '',
        commented_content: contentId,
        owner: await getUserId()
      }
      this.setState({ content, formData })
      this.getSimilarContents(content.tags, contentId)
      this.getUserInfo(ownerId)
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
    await this.getUserInfo(ownerId)
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
      const content = await getSingleContent(contentId)
      this.setState({ liked: true, content })
    } else this.setState({ liked: true })
  }

  unlikeContent = async () => {
    const selfId = this.state.self.id
    const contentId = this.state.content.id
    const ownerId = this.state.content.owner.id
    const likeId = this.state.content.likes.find( item => item.owner === selfId && item.content === contentId).id
    await unlikeContent(likeId)
    await this.getUserInfo(ownerId)
    const content = await getSingleContent(contentId)
    this.setState({ liked: false, content })
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
      const formData = { ...this.state.formData, comment: '' }
      console.log(formData)
      const content = await getSingleContent(contentId)
      this.setState({ content, formData })
    } catch (err) {
      this.setState({ errors: err })
    }
  }

  handleLikeComment = async id => {
    const ownerId = this.state.content.owner.id
    await likeComment(id)
    const self = this.getUserInfo(ownerId)
    const contentId = this.props.match.params.id
    const content = await getSingleContent(contentId)
    this.setState({ content, self })
  }

  deleteComment = async id => {
    const ownerId = this.state.content.owner.id
    await deleteComment(id)
    const self = this.getUserInfo(ownerId)
    const contentId = this.props.match.params.id
    const content = await getSingleContent(contentId)
    this.setState({ content, self })
  }

  render() {
    const { content, similarCont, followed, liked, owner, self, formData } = this.state
    if (!content) return null
    if (!similarCont) return null
    if (!owner) return null
    const numLikes = content.likes ? content.likes.length : 0
    const numFollowers = owner.followers ? owner.followers.length : 0
    const numComments = content.comments ? content  .comments.length : 0
    const numSimilarCont = similarCont.length

    const profileImgStyle = { width: 150, height: 150, borderRadius: '50%' }
    const titleLetterStyle = { fontWeight: 900, fontSize: 20, marginTop: 20 }
    const subtitleLetterStyle = { fontWeight: 500, fontSize: 20, fontFamily: 'arial', marginTop: 10, marginLeft: 5, marginBottom: 10 }
    const bodyLetterStyle = { fontWeight: 300, fontSize: 16, fontFamily: 'arial'}
    const ctaSectionStyle = { display: 'flex', alignItems: 'center'}
    const ctaBtnStyle = { width: 40, height: 40, fontSize: 14, fontFamily: 'arial' }

    console.log(this.state)
    return (
      <div className='container'>
        <div className='columns'>
          <img className='column is-3' src={owner.profile_image} alt={owner.username} style={profileImgStyle}/>

          <div className='column'>
            <p style={titleLetterStyle}>{owner.username.replace(owner.username[0], owner.username[0].toUpperCase())}</p>
            {numFollowers > 1 && <p><i className="fas fa-users"></i>&nbsp;<strong>{numFollowers}</strong>&nbsp;fans</p>}

            <div style={ctaSectionStyle}>
              <EmailShareButton url={owner.email} subject='Hi from movik' via={self.email ? self.email : ''}>
                <EmailIcon size={40} round />
              </EmailShareButton>
              {isAuthenticated() && 
                <div className="navbar-item">
                  {!followed ?
                    <div 
                      className="button is-rounded" 
                      style={ctaBtnStyle} 
                      onClick={() => this.followOwner(owner.id)}><i className="fas fa-user-plus"></i></div>
                    :
                    <div 
                      className="button is-light" 
                      style={ctaBtnStyle} 
                      onClick={() => this.unfollowOwner(owner.id)}>Following</div>}
                </div>}
            </div>
            <Link to={`/profiles/${owner.id}`} style={bodyLetterStyle}>Check More Contents</Link>
          </div>
        </div>

      <hr />
    
      <div style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <video style={{ width: "95%", marginTop: 20 }} controls>
          <source src={content.video} type="video/mp4" />
        </video>
      </div>

      <hr />

      <div className='columns'>
        <div className='column is-9'>
          <p style={titleLetterStyle}>{content.title}</p>
          <p style={bodyLetterStyle}>Posted <Moment fromNow ago style={bodyLetterStyle}>{content.created_at}</Moment> ago</p>
          <p style={subtitleLetterStyle}>{content.description}</p>
        </div>

        <div className='column'>
          <div style={{ display: 'flex', alignItems: 'center'}}>
            {isAuthenticated() && 
              <div className='column'>
              {!liked ? 
                <p style={subtitleLetterStyle} onClick={this.likeContent}><i className="fas fa-thumbs-up"></i>
                {numLikes > 1 && <strong>{numLikes}</strong>} </p>
                :  
                <p style={{ ...subtitleLetterStyle, color: 'blue'}} onClick={this.unlikeContent}><i className="fas fa-thumbs-up"></i>
                {numLikes > 1 && <strong>{numLikes}</strong>} </p>
              }
              </div>}
          
            <div className='columns'>
              <FacebookShareButton 
                url={`${frontEndBaseUrl}contents/${content.id}`}
                quote='Check the content on movik'
                hashtag='#movik'
                style={subtitleLetterStyle} >
                <FacebookIcon size={30} round />
              </FacebookShareButton>

              <TwitterShareButton 
                url={`${frontEndBaseUrl}contents/${content.id}`}
                title={content.title}
                hashtags={['movik', `Created by ${owner.username}`, `${content.title}`]}
                style={subtitleLetterStyle}>
                <TwitterIcon size={30} round />
              </TwitterShareButton>
            
              <PinterestShareButton 
                url={`${frontEndBaseUrl}contents/${content.id}`}
                media={content.thumbnail}
                description={content.description}
                style={subtitleLetterStyle}>
                <PinterestIcon size={30} round />
              </PinterestShareButton>
            
              <TelegramShareButton 
                url={`${frontEndBaseUrl}contents/${content.id}`}
                title={content.title} 
                style={subtitleLetterStyle}>
                <TelegramIcon size={30} round />
              </TelegramShareButton>
            
              <WhatsappShareButton
                url={`${frontEndBaseUrl}contents/${content.id}`}
                title={content.title} 
                style={subtitleLetterStyle}>
                <WhatsappIcon size={30} round />
              </WhatsappShareButton>
            </div>
          </div>
        </div>
      </div>

      <br />
      <hr />
  
      <div>
        <p style={subtitleLetterStyle}>Comments</p>
        <div className='container'>
        {numComments > 0 && content.comments.map( item => (
          <article className="media" key={item.id}>
          <figure className="media-left">
            <p className="image is-48x48">
              {item.owner.profile_image ? 
                <img src={item.owner.profile_image} alt={item.owner.username} />
                :
                <img src='https://images-na.ssl-images-amazon.com/images/I/51e6kpkyuIL._AC_SX466_.jpg' />}
              <p style={bodyLetterStyle}>{item.owner.username.replace(item.owner.username[0], item.owner.username[0].toUpperCase())}</p>
            </p>
          </figure>
          <div className="media-content" style={{ minHeight: 100 }}>
            <div className="content">
              <p style={subtitleLetterStyle}> {item.comment}</p>
              <nav className="level is-mobile">
                <div className="level-left">
                  <div className="level-item">
                    <p style={bodyLetterStyle}>
                      Posted <Moment fromNow ago style={bodyLetterStyle}>{item.comment.created_at}</Moment> ago
                      &nbsp;*&nbsp;
                      <i className="fas fa-heart" onClick={() => this.handleLikeComment(item.id)}></i>&nbsp;Like
                    </p>
                  </div>
                </div>
              </nav>
            </div>
          </div>
          <div className="media-right">
            <button
              className="delete" 
              onClick={() => this.deleteComment(item.id)}
              ></button>
          </div>
        </article>
        ))}

        { isAuthenticated() && 
        <article className="media">
          <figure className="media-left">
            <p className="image is-48x48">
            {self.profile_image ? 
              <img src={self.profile_image} alt={self.username} />
              :
              <img src='https://images-na.ssl-images-amazon.com/images/I/51e6kpkyuIL._AC_SX466_.jpg' />}
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
                <button className="button" onClick={this.handleSubmit}>Post</button>
              </p>
            </div>
          </div>
        </article>}
        </div>
      </div>

      <br />
      <hr />

      <div>
        <p style={subtitleLetterStyle}>You might also like...</p>
        <div className='container'>
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
    </div>
    )
  }
}

export default Show