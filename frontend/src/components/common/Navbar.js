import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated, logout, getUserId } from '../../lib/auth'


class Navbar extends React.Component {
  state = { 
    indexIsOpen: false,
    aboutIsOpen: false,
    contactIsOpen: false,
    moreIsOpen: false,
    accountIsOpen: false,
    burgerIsOpen: false
  }

  handleToggle = item => {
    switch (item) {
      case 'index':
        this.setState({
          indexIsOpen: !this.state.indexIsOpen,
          aboutIsOpen: false,
          contactIsOpen: false,
          moreIsOpen: false,
          accountIsOpen: false
        })
        break
      case 'about':
        this.setState({
          indexIsOpen: false,
          aboutIsOpen: !this.state.aboutIsOpen,
          contactIsOpen: false,
          moreIsOpen: false,
          accountIsOpen: false,
        })
        break
      case 'contact':
        this.setState({
          indexIsOpen: false,
          aboutIsOpen: false,
          contactIsOpen: !this.state.contactIsOpen,
          moreIsOpen: false,
          accountIsOpen: false
        })
        break
      case 'more':
        this.setState({
          indexIsOpen: false,
          aboutIsOpen: false,
          contactIsOpen: false,
          moreIsOpen: !this.state.moreIsOpen,
          accountIsOpen: false
        })
        break
      case 'account':
        this.setState({
          indexIsOpen: false,
          aboutIsOpen: false,
          contactIsOpen: false,
          moreIsOpen: false,
          accountIsOpen: !this.state.accountIsOpen
        })
        break
      default:
          this.props.history.push('/notfound')
    }
  }

  handleLogout = () => {
    logout()
    // toast('Come back Soon')
    this.props.history.push('/')
  }

  handleBurger = () => {
    this.setState({ burgerIsOpen: !this.state.burgerIsOpen })
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({
        indexIsOpen: false,
        aboutIsOpen: false,
        contactIsOpen: false,
        moreIsOpen: false,
        accountIsOpen: false,
        burgerIsOpen: false
      })
    }
  }

  render() {
    const { indexIsOpen, aboutIsOpen, contactIsOpen, moreIsOpen, accountIsOpen, burgerIsOpen } = this.state
    const userId = getUserId()

    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/" style={{ fontWeight: 900 }}>
          <i className="fas fa-seedling"></i>&nbsp;movik
        </a>

        <span onClick={this.handleBurger} className={`navbar-burger ${burgerIsOpen ? 'is-active' : ''}`}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </span>
      </div>

      <div id="navbarBasicExample" className={`navbar-menu ${burgerIsOpen ? 'is-active' : ''}`}>
        <div className="navbar-start">
          
          <Link 
            to='/about'
            className={`navbar-item ${aboutIsOpen ? 'is-active' : ''}`} 
            onClick={() => this.handleToggle('about')}>
            About</Link>
          
          <Link 
            to='/contents'
            className={`navbar-item ${indexIsOpen ? 'is-active' : ''}`} 
            onClick={() => this.handleToggle('index')}>
            Index</Link>
          
          {/* <div className="navbar-item has-dropdown is-hoverable">
            <a className={`navbar-link ${moreIsOpen ? 'is-active' : ''}`} 
              onClick={() => this.handleToggle('more')}>
              More</a>

            <div className="navbar-dropdown">
              <a className="navbar-item">
                About
              </a>
              <a className="navbar-item">
                Jobs
              </a>
              <a className="navbar-item">
                Contact
              </a>
              <hr className="navbar-divider" />
              <a className="navbar-item">
                Report an issue
              </a>
            </div>
          </div> */}
        </div>

        <div className="navbar-end">
          <Link 
            to='/request'
            className={`navbar-item ${contactIsOpen ? 'is-active' : ''}`} 
            onClick={() => this.handleToggle('contact')}>
            Contact Us</Link>

          {isAuthenticated() && 
            <div className="navbar-item has-dropdown is-hoverable">
              <a className={`navbar-link ${accountIsOpen ? 'is-active' : ''}`} 
                onClick={() => this.handleToggle('account')}>
                Account</a>
                <div className="navbar-dropdown">
                  <Link to={`/profiles/${userId}`}><div className="navbar-item nav-color">Profile</div></Link>
                  <span onClick={this.handleLogout} className="navbar-item nav-color">Logout</span>
                </div>
            </div>}
            <div className="navbar-item">
              <div className="buttons">
                {isAuthenticated() && <Link className="button is-danger" to='/contents/new' style={{ minWidth: 150}}>Upload</Link>}
                {!isAuthenticated() && <Link className="button is-danger" to="/register/init" style={{ minWidth: 150}}><strong>Register</strong></Link>}
                {/* {!isAuthenticated() && <Link className="button is-light" to="/login">Log in</Link>} */}
              </div>
            </div>
          </div>
        </div>
      </nav>
  )
}
}

export default withRouter(Navbar)