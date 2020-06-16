import React from 'react'
import { getAllRequests, getSinglelRequest, editRequest } from '../../lib/api'


class HandleRequests extends React.Component {
  state = {
    requests: null
  }

  getRequests = async() => {
    const requests = await getAllRequests()
    this.setState({ requests })
  }

  async componentDidMount() {
    this.getRequests()
  }

  handleStatus = async (requestId, fieldName) => {
    const request = await getSinglelRequest(requestId)
    const updateRequest = { ...request, [fieldName]: !request[fieldName] }
    await editRequest(requestId, updateRequest)
    this.getRequests()
  }


  render() {
    const { requests } = this.state
    if (!requests) return null

    return (
      <div className='container'>
        <table className="table" style={{ maxWidth: "85%", margin: 20, fontSize: 13, fontFamily: 'arial'}}>
          <thead>
            <tr>
              <th ><abbr title="id">ID</abbr></th>
              <th>Email</th>
              <th><abbr title="user_type">User Type</abbr></th>
              <th>Subject</th>
              <th>Description</th>
              <th>Submit Date</th>
              <th><abbr title="is_answered">Answered?</abbr></th>
              <th><abbr title="is_solved">Solved?</abbr></th>
            </tr>
          </thead>

          <tbody>
            {requests.map( item => (
              <tr key={item.id} style={{ backgroundColor: item.is_solved === true ? "gray" : ''}}>
                <td>{item.id}</td>
                <td>{item.email}</td>
                <td>{item.user_type}</td>
                <td>{item.subject}</td>
                <td>{item.description}</td>
                <td>{item.created_at}</td>
                <td>{item.is_answered === true ? 'Y' : 'N'}</td>
                <td>{item.is_solved === true ? 'Y' : 'N'}</td>
                <button 
                  style={{ width: 80, margin: 10 }} 
                  onClick={() => this.handleStatus(item.id, "is_answered")}
                  >Answered?</button>
                <button 
                  style={{ width: 80, margin: 10 }} 
                  onClick={() => this.handleStatus(item.id, "is_solved")}
                  >Solved?</button>
              </tr> 
            ))}
          </tbody>
        </table>
      </div>      
    )
  }
}

export default HandleRequests