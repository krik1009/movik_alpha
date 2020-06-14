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
          height: 1000
        }}
      >
        <h1 style={{ 
          fontSize: 100,
          filter: "none",
          textDecoration: "none",
          marginTop: 200,
          color: 'black'
        }}>
          movik
        </h1>
      </Link>
    )
  }
}

export default Home