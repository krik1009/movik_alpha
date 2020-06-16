import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SecureRoute from './components/common/SecureRoute'

//common
import Home from './components/common/Home'
import Footer from './components/common/Footer'
import Navbar from './components/common/Navbar'
import About from './components/common/About'
import CompleteReg from './components/common/CompleteReg'
import CompleteReq from './components/common/CompleteReq'
import Request from './components/common/Request'


// auth
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import RegisterInit from './components/auth/RegisterInit'


// users
// import ProfileIndex from './components/profiles/ProfilesIndex'
import ProfileShow from './components/users/ProfileShow'
import ProfileEdit from './components/users/ProfileEdit'


// contents
import Index from './components/contents/Index'
import Show from './components/contents/Show'
import New from './components/contents/New'
import Edit from './components/contents/Edit'

// admin
import HandleRequests from './components/admin/HandleRequests'
import HandleUsers from './components/admin/HandleUsers'


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/register/sent" component={CompleteReg} />
        <Route exact path="/request/sent" component={CompleteReq} />
        <Route exact path="/request" component={Request} />

        <SecureRoute path="/contents/:id/edit" component={Edit} />
        <SecureRoute path="/contents/new" component={New} />
        <Route path="/contents/:id" component={Show} />
        <Route path="/contents" component={Index} />

        <Route path="/login" component={Login} />
        <Route path="/register/init" component={RegisterInit} />
        <Route path="/register" component={Register} />

        <SecureRoute path='/profiles/:id/edit' component={ProfileEdit} />
        <Route path="/profiles/:id" component={ProfileShow} />


        <SecureRoute path='/admin/requests' component={HandleRequests} />
        <SecureRoute path='/admin/users' component={HandleUsers} />
       
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default App