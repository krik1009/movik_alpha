import React from 'react'
import { getAllUsers, getSingleUser, editUser } from '../../lib/api'


class HandleUsers extends React.Component {
  state = {
    users: null
  }

  getUsers = async() => {
    const users = await getAllUsers()
    this.setState({ users })
  }

  async componentDidMount() {
    this.getUsers()
  }

  handleStatus = async (userId, fieldName) => {
    const user = await getSingleUser(userId)
    const updateUser = { ...user, [fieldName]: !user[fieldName] }
    await editUser(userId, updateUser)
    this.getUsers()
  }


  render() {
    const { users } = this.state
    if (!users) return null

    return (
      <div className='container'>
        <table className="table" style={{ maxWidth: "85%", margin: 20, fontSize: 13, fontFamily: 'arial'}}>
          <thead>
            <tr>
              <th ><abbr title="id">ID</abbr></th>
              <th>Username</th>
              <th>Email</th>
              <th><abbr title="user_type">User Type</abbr></th>
              <th>Profile Image</th>
              <th>Bio</th>
              <th>Reg Date</th>
              <th><abbr title="is_active">Active?</abbr></th>
              <th><abbr title="is_superuser">Superuser?</abbr></th>
              <th><abbr title="is_staff">Staff?</abbr></th>
            </tr>
          </thead>

          <tbody>
            {users.map( item => (
              <tr key={item.id} style={{ backgroundColor: item.is_superuser === true ? "orange" : ''}}>
                <td>{item.id}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.user_type}</td>
                <td>{item.bio}</td>
                <td>{item.profile_image}</td>
                <td>{item.created_at}</td>
                <td>{item.is_active === true ? 'Y' : 'N'}</td>
                <td>{item.is_superuser === true ? 'Y' : 'N'}</td>
                <td>{item.is_staff === true ? 'Y' : 'N'}</td>
                <button 
                  style={{ width: 80, margin: 10 }} 
                  onClick={() => this.handleStatus(item.id, "is_superuser")}
                  >Superuser?</button>
                <button 
                  style={{ width: 80, margin: 10 }} 
                  onClick={() => this.handleStatus(item.id, "is_staff")}
                  >Staff?</button>
              </tr> 
            ))}
          </tbody>
        </table>
      </div>      
    )
  }
}

export default HandleUsers