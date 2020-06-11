//! trending logic - model change

import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


class Index extends React.Component {
  state = {
    contents: null,
    display: 'all',
    isOpen: false,
    filteredContents: [],
    searchQuery: ''
  }

  async componentDidMount() {
    try {
      const { data } = await axios.get('/api/contents')
      this.setState({ contents: data, filteredContents: data })
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



  render() {
    console.log(this.state)

    const { contents, display, isOpen, filteredContents, searchQuery } = this.state
    if (!contents) return null

    const ram =  Math.floor(Math.random() * (contents.length - 1))

    return(
      <>
        <header style={{
          backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Muse_in_Sydney.jpg/1200px-Muse_in_Sydney.jpg')",
          backgroundPosition:'center', 
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: 500
        }}>
          <div style={{ 
            backgroundColor: "rgba(255,255,255, 0.1)", 
            height: 500, 
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            color: 'black'
          }}>
            <h1 style={{
              marginBottom: 100,
              fontSize: 50
            }}>
              Welcome to movik
            </h1>
            
            <div className="field has-addons">
              <div className="control">
                <input 
                  className="input" 
                  type="text"
                  placeholder="Search by categories, tags, colors"
                  onChange={this.filterContents}
                  value={searchQuery} 
                  style={{ minWidth: 800}} 
                />
                <p style={{ fontSize: 15, fontFamily: 'arial'}}>Any keywords? Try summer, nature, travel etc</p>
              </div>
              <div className="control">
                <div className="button is-black">
                  Explore
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className='container'>
          <nav className="navbar" role="navigation" aria-label="dropdown navigation">
            <div className="navbar-menu">
              <div className="navbar-start">
                <div className="navbar-item">
                  {`${display.replace(display[0], display[0].toUpperCase())} Items`}
                </div>
              </div>
         
              <div className="navbar-end">
                <div 
                  onClick={this.handleToggle} 
                  className={`navbar-item has-dropdown ${isOpen ? 'is-active' : ''}`}
                >
                  <a className="navbar-link">{display.replace(display[0], display[0].toUpperCase())}</a>

                  <div className="navbar-dropdown is-right">
                    <button
                        className="navbar-item" 
                        value="all" 
                        style={{ fontFamily: 'Lexend Tera', fontSize: 14, border: "none", backgroundColor: "white" }} 
                        onClick={this.controlDisplay} 
                      >
                        All
                    </button>
                    <button
                      className="navbar-item" 
                      value="new" 
                      style={{ fontFamily: 'Lexend Tera', fontSize: 14, border: "none", backgroundColor: "white" }} 
                      onClick={this.controlDisplay} 
                    >
                      New
                    </button>
                    <button 
                      className="navbar-item" 
                      value="trending" 
                      style={{ fontFamily: 'Lexend Tera', fontSize: 14, border: "none", backgroundColor: "white" }} 
                      onClick={this.controlDisplay}
                    >
                      Trending
                    </button>
                    <hr className="navbar-divider" />
                    <button
                      className="navbar-item" 
                      value="editors choice" 
                      style={{ fontFamily: 'Lexend Tera', fontSize: 14, border: "none", backgroundColor: "white" }} 
                      onClick={this.controlDisplay} 
                    >
                      Editors Choice
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {filteredContents.length ? 
            filteredContents.map( item => (
              <Link key={item.id} to={`contents/${item.id}`}>
                <img src={item.thumbnail} style={{ maxWidth: 300, maxHeight: 200, marginLeft: 20}} />
              </Link>
            ))
            :
            <div style={{ margin: 30 }}>Coming soon... </div>
          }
        </main>
      </>
    )

  }
}

export default Index