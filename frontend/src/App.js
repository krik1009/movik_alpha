import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SecureRoute from './components/common/SecureRoute'

//common
import Home from './components/common/Home'
import Footer from './components/common/Footer'
import Navbar from './components/common/Navbar'


// auth
import Login from './components/auth/Login'
import Register from './components/auth/Register'


// users
// import ProfileIndex from './components/profiles/ProfilesIndex'
import ProfileShow from './components/users/ProfileShow'
import ProfileEdit from './components/users/ProfileEdit'


// contents
import Index from './components/contents/Index'
import Show from './components/contents/Show'
import New from './components/contents/New'
import Edit from './components/contents/Edit'

// //hikes
// import HikesIndex from './components/hikes/HikesIndex'
// import HikeShow from './components/hikes/HikeShow'
// import HikeCreate from './components/hikes/HikeCreate'
// import HikeUpdate from './components/hikes/HikeUpdate'

// // groups
// import GroupIndex from './components/groups/GroupIndex'
// import GroupShow from './components/groups/GroupShow'
// import GroupNew from './components/groups/GroupNew'
// import GroupEdit from './components/groups/GroupEdit'
// import EventShow from './components/groups/EventShow' 
// import GroupEventEdit from './components/groups/GroupEventEdit'
// import GroupEventNew from './components/groups/GroupEventNew'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />

        <SecureRoute path="/contents/:id/edit" component={Edit} />
        <SecureRoute path="/contents/new" component={New} />
        <Route path="/contents/:id" component={Show} />
        <Route path="/contents" component={Index} />

        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />

        <SecureRoute path='/profiles/:id/edit' component={ProfileEdit} />
        <Route path="/profiles/:id" component={ProfileShow} />
       
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default App