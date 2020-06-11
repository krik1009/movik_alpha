//! logic- follow, like
//! edit. delete if you are owner
//! comment section

import React from 'react'
import { getSingleContent, getSameTagContents, getSingleUser, withHeaders } from '../../lib/api'
import { getUserId } from '../../lib/auth'
import { Link } from 'react-router-dom'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import axios from 'axios'

class Show extends React.Component {
  state = { 
    content: null,
    similarCont: '',
    self: null,
    owner: null
  }

  getSimilarContents = async (tagId1, tagId2, selfId) => {
    const tag1 = await getSameTagContents(tagId1)
    const tag2 = await getSameTagContents(tagId2)
    const res =  tag1.concat(tag2).filter(item => item.id !== selfId) //!this dont work
    this.setState({ similarCont: res })
  }

  getUsersInfo = async ownerId => {
    try {
      const self = await getSingleUser(getUserId())
      const owner = await getSingleUser(ownerId)
      this.setState({ self, owner })
    } catch (err) {
      console.log(err)
    }
  }

  async componentDidMount() {
    const id = this.props.match.params.id
    try {
      const content = await getSingleContent(id)
      const ownerId = content.owner.id
      this.setState({ content })
      this.getSimilarContents(content.tags[0].id, content.tags[1].id, id)
      this.getUsersInfo(ownerId)
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  followOwner = async toId => {
    try {
      const fromId = getUserId()
      await axios.post(`/api/followers/`, {
        owner: fromId, to: toId
      }, withHeaders())
      const self = this.state.self.followings.push(toId)
      const owner = this.state.owner.followers.push(fromId)
      this.setState({ self, owner })
    } catch(err) {
      this.props.history.push('/notfound')
    }
  }
  
  render() {
    const { content, similarCont} = this.state
    if (!content) return null
    if (!similarCont) return null
    const owner = content.owner
    const numLikes = content.likes.length
    const numSimilarCont = similarCont.length

    console.log(this.state)
    return (
      <div style={{ margin: 30 }}>

        <nav className="navbar is-transparent">
          <div id="navbarExampleTransparentExample" className="navbar-menu">
            <div className="navbar-start">
              <Link className="navbar-item" to={`/profiles/${owner.id}`} style={{ display: 'flex', flexDirection: 'column'}}>
                <img src={owner.profile_image} style={{borderRadius: "50%", minHeight: 100}}/>
                <p><strong>{owner.username}</strong></p>
              </Link>
              <div className="navbar-item">
                <div className="button" style={{ minWidth: 120 }}>Follow</div>
              </div>
              <div className="navbar-item">
                <div className="button" style={{ minWidth: 120 }}>
                  {numLikes > 1 ? `${numLikes} Likes` : "Like" }
                </div>
              </div>
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

          <p style={{ fontSize: 20, alignSelf: "flex-start", margin: 20 }}><strong>{content.title}</strong></p>
          <p style={{ fontSize: 16, alignSelf: "flex-start", marginLeft: 20 }}>{content.description}</p>
          <br />
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