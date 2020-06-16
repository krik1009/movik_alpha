import React from 'react'
import { Link } from 'react-router-dom'
import { getAllContents } from '../../lib/api'
import { backgroundImages } from '../../styles/backgroundImages'

class Home extends React.Component {
  state = {
    contents: null
  }

  async componentDidMount() {
    try {
      this.setState({ contents: await getAllContents() })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  render() {
    const { contents } = this.state
    if (!contents) return null
    const ram =  Math.floor(Math.random() * (backgroundImages.length - 1))

    return(
      <Link 
        to="/about"
        style={{
          display: 'flex',
          justifyContent: 'center',
          backgroundImage: `url(${backgroundImages[ram]})`,
          filter: "opacity(80%)",
          backgroundPosition:'center', 
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          minHeight: window.innerWidth > 420 ? 1200 : 500,
        }}
        className='Home'
      >
        <h1 style={{ 
          fontSize: window.innerWidth > 420 ? 100 : 50,
          filter: "none",
          textDecoration: "none",
          marginTop: window.innerWidth > 420 ? 200 : 100,
          color: 'black'
        }}>
          movik
        </h1>
      </Link>
    )
  }
}

export default Home