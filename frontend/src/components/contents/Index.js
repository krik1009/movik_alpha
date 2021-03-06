//! trending logic, react tracker
//! display profile image when hover

import React from 'react'
import { Link } from 'react-router-dom'
import { getAllContents } from '../../lib/api'
import { backgroundImages } from '../../styles/backgroundImages'


class Index extends React.Component {
  state = {
    contents: null,
    display: 'all',
    isOpen: false,
    filteredContents: [],
    searchQuery: '',
    // hover: false,
  }

  async componentDidMount() {
    try {
      const contents = await getAllContents()
      this.setState({ contents, filteredContents: contents })
    } catch(err) {
      console.log(err)
    }
  }

  filterContents = e => {
    const searchQuery = e.target.value
    let filteredContents = this.state.contents.filter( item => {
      const regex = new RegExp(searchQuery, 'i')
      return item.tags.find( item => item.name.match(regex)) || item.categories.find( item => item.name.match(regex) )
    })
    this.setState({ filteredContents, searchQuery })
  }
  
  calcTimeDelta = item => {
    const createdAt = new Date(item.createdAt)
    const today = new Date()
    if (Number(createdAt) - Number(today) <= 24*60*60) return true
    return false 
  }

  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ isOpen: false })
    }
  }

  controlDisplay = e => {
    let filteredContents = ''
    switch (e.target.value) {
      case 'new':
        filteredContents = this.state.filteredContents.filter( item => this.calcTimeDelta(item) === true)
        break
      case 'trending':
        filteredContents = this.state.filteredContents.filter( item => item)
        break
      case 'editors choice':
        filteredContents = this.state.filteredContents.filter( item => item.isEditorsChoice === true)
        break
      default:
        filteredContents = this.state.contents
    }
    this.setState({ filteredContents, display: e.target.value })
  }

  // toggleHover = id => {
  //   this.setState({ hover: !this.state.hover, id: id})
  // }
  

  render() {
    console.log(this.state)

    const { contents, display, isOpen, filteredContents, searchQuery, hover, id } = this.state
    if (!contents) return null

    const overBreakPoint = window.innerWidth > 420 ? true : false
    const headerBackgroundStyle = {
      backgroundImage: `url(${backgroundImages[12]})`,
      backgroundPosition:'center', 
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      height: overBreakPoint ? 500 : 300, 
    }
    const headerContainerStyle = { 
      backgroundColor: "rgba(255,255,255, 0.1)", 
      height: '100%', 
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }
    const headerTitleStyle = {
      marginBottom: overBreakPoint ? 30 : 10,
      fontSize: overBreakPoint ? 50 : 20
    }
    const searchBarContainerStyle = {
      width: '70%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
    const searchBarInputStyle = {
      width: '100%',
      height: overBreakPoint ? 50 : 30,
      fontSize: overBreakPoint ? 20 : 16,
    }
    const searchBarBtnStyle = {
      fontFamily: 'arial',
      fontSize: overBreakPoint ? 20 : 12,
      height: overBreakPoint ? 50 : 30,
      width: overBreakPoint ? 'auto' : 50,
    }
    const searchBarRefStyle = { 
      fontSize: overBreakPoint ? 18 : 10,
      fontFamily: 'arial'
    }
    const dropdownStyle = { 
      fontFamily: 'Lexend Tera', 
      fontSize: 14, 
      border: "none", 
      backgroundColor: "white"
    }
    const mainContainerStyle = {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      width: '90%',
      marginTop: 30
    }
    const thumbnailContainerStyle = {
      minHeight: 300,
      display: 'flex',
      justifyContent: 'flex-start',
      flexDirection: overBreakPoint ? 'row' : 'column',
      flexWrap: overBreakPoint ? 'wrap' : 'nowrap',
      margin: 10,
      position: 'relative',
      overflow: 'hidden'
    }
    const mapThumbnailStyle = 
    // hover ?
      { 
        width: overBreakPoint ? '31%' : '90%',
        height: overBreakPoint ? 300 : 200,
        margin: 5,
        filter: 'saturate(1) contrast(1.2)',
        // transition: '0.4s'
      }
    //   :
    // { 
    //   width: overBreakPoint ? '31%' : '90%',
    //   height: overBreakPoint ? 160 : 'auto',
    //   margin: 5,
    //   filter: 'saturate(0) contrast(1.2)',
    //   transition: '0.4s'
    // }
    const thumbnailImgStyle = {
      width: '100%',
      height: '90%'
    }
    const mapInfoStyle = 
    // hover ?
      {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        color: '#fff',
        padding: '1em',
        background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.9))',
        transition: 'all 0.3s ease-in-out',
      }
    // :
    // {
    //   position: 'absolute',
    //   bottom: -200,
    //   width: '100%',
    //   color: '#fff',
    //   padding: '1em',
    //   background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.9))',
    //   transition: 'all 0.3s ease-in-out',
    // }
    // const mapInfoLetterStyle = {
    //   fontSize: 10
    // }
    // const mapInfoImgStyle = {
    //   borderRadius: "50%", 
    //   height: '20%'
    // }


    return(
      <html>
        <header style={headerBackgroundStyle}>
          <div style={headerContainerStyle}>
            <h1 style={headerTitleStyle}>
              Welcome to movik
            </h1>
            
            <div className="field has-addons" style={searchBarContainerStyle} >
                <input 
                  className="input" 
                  type="text"
                  placeholder="Search by category or tag"
                  onChange={this.filterContents}
                  value={searchQuery} 
                  style={searchBarInputStyle}
                />
                <div className="button is-black" style={searchBarBtnStyle}>
                  Explore
                </div>
            </div>
            <p style={searchBarRefStyle}>
              No keywords in your mind? Try nature, travel or summer i.e.</p>
          </div>
        </header>

        <main className='container' style={mainContainerStyle}>
          <div
            onClick={this.handleToggle} 
            className={`dropdown ${isOpen ? 'is-active' : ''}`}
          >
            <div className="dropdown-trigger">
              <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                <span>{`${display.replace(display[0], display[0].toUpperCase())}`}</span>
                <span className="icon is-small">
                  <i className="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">

              <div className="dropdown-content">
                <button
                  className="dropdown-item" 
                  value="all" 
                  style={dropdownStyle} 
                  onClick={this.controlDisplay} 
                >
                  All
                </button>
                <button
                  className="dropdown-item" 
                  value="new" 
                  style={dropdownStyle} 
                  onClick={this.controlDisplay} 
                >
                  New
                </button>
                <button 
                  className="dropdown-item" 
                  value="trending" 
                  style={dropdownStyle} 
                  onClick={this.controlDisplay}
                >
                  Trending
                </button>
                <hr className="dropdown-divider" />
                <button 
                  className="dropdown-item" 
                  value="editors choice" 
                  style={dropdownStyle} 
                  onClick={this.controlDisplay}
                >
                  Editors Choice
                </button>
              </div>
            </div>
          </div>

        <div style={thumbnailContainerStyle}>
          {filteredContents.length ? 
            filteredContents.map( item => 
              <Link key={item.id} to={`contents/${item.id}`} style={mapThumbnailStyle} >
                <img 
                  src={item.thumbnail} style={thumbnailImgStyle}
                  // onMouseEnter={() => this.toggleHover(item.id)}
                  // onMouseLeave={() => this.toggleHover(item.id)} 
                  />
              </Link>
            )
            :
            <div style={{ margin: 30 }}>Coming soon... </div>
          }
          </div>

        </main>
      </html>
    )
  }
}

export default Index

