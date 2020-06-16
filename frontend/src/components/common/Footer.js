import React from 'react'
import { Link } from 'react-router-dom'
import { isAdmin } from '../../lib/api'
import { getUserId } from '../../lib/auth'


const Footer = () => (
  <footer className="footer" style={{ backgroundColor: '#e5e5e5', marginTop: 0 }}>
    <div className="content has-text-centered">
      <p style={{ 
        fontSize: window.innerWidth > 420 ? 16 : 10
        }}>
        <strong>movik</strong> by <a href="/">movik.com</a> copyright 2020
      </p>
    </div>

    {isAdmin(getUserId()) === true && 
      <div style={{ fontFamily: 'arial', fontSize: 10}}>
        <Link to='/admin/login' >Admin?</Link>
          <div>
            <Link to='/admin/users' style={{ marginRight: 10}}>Users</Link>
            <Link to='/admin/requests'>Requests</Link>
          </div>
      </div>}
  </footer>
)

export default Footer