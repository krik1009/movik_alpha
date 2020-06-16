import React from 'react'
import { postRequest } from '../../lib/api'
import { backgroundImages } from '../../styles/backgroundImages'

class Request extends React.Component {
  state = {
    formData: {
      email: '',
      user_type: 'cr',
      subject: '',
      description: ''
    },
    errors: {}
  }

  handleChange = e => {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData })
  }

  // uploadFile = e => {
  //   const fileName = document.querySelector('#file has-name .file-name')
  //   fileName.textContent = fileInput.files.name
  // } 

  handleSubmit = async e => {
    e.preventDefault()
    try {
      await postRequest(this.state.formData)
      this.props.history.push('/request/sent')
    } catch (err) {
      this.setState({ errors: err })
    } 
  }

  render() {
    const { formData, errors } = this.state
    const formStyle = {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center'
    }
    const labelStyle = {
      margin: 20,
      minWidth: '25%'
    }
    const controlStyle = {
      margin: 20,
      minWidth: '60%'
    }
  
    return (
      <div className="register" style={{ 
        backgroundImage: `url(${backgroundImages[6]})`,
        backgroundPosition:'center', 
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: 500
        }}>
        <section className="section">
          <div className="container box" style={{ maxWidth: '60%', backgroundColor: 'rgba(255, 255, 255, 0.7)'}}>
            <h1 className="title">Request Form</h1>
            <h2>We will contact you as soon as possible</h2> 
            {/* <p style={{ fontSize: 10 }}>* required</p> */}
            <hr />

            <div className="columns">
              <form onSubmit={this.handleSubmit} className="column">

                <div className="field" style={formStyle}>
                    <label className="label" style={labelStyle}>Email *</label>
                    <p class="control has-icons-left has-icons-right"style={controlStyle}>
                      <input
                        className={`input ${errors.email ? 'is-danger' : ''}`}
                        placeholder="Your email address"
                        name="email"
                        onChange={this.handleChange}
                        value={formData.email}
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                      </span>
                    </p>
                    {errors.email && <small className="help is-danger">Email is required</small>}
                </div>


                <div className="field" style={formStyle}>
                  <label className="label" style={labelStyle}>You are: </label>
                  <div className="control" style={controlStyle}>
                    <label className="radio" style={{ marginRight: 20 }}>
                      <input type="radio" name="user_type"  value="cr" onClick={this.handleChange} />
                      Creator
                    </label>
                    <label className="radio">
                      <input type="radio"  name="user_type"  value="vw" onClick={this.handleChange} />
                      Viewer
                    </label>
                    <label className="radio">
                      <input type="radio"  name="user_type"  value="ot" onClick={this.handleChange} />
                      Other
                    </label>
                  </div>
                </div>

     
                <div className="field" style={formStyle}>
                  <label className="label" style={labelStyle}>Subject *</label>
                  <p class="control"style={controlStyle}>
                    <input
                      className={`input ${errors.subject ? 'is-danger' : ''}`}
                      type="text"
                      placeholder="Subject"
                      name="subject"
                      onChange={this.handleChange}
                      value={formData.subject}
                    />
                  </p>
                  {errors.subject && <small className="help is-danger">Subject is required</small>}
                </div>

                <div className="field" style={formStyle}>
                  <label className="label" style={labelStyle}>Request *</label>
                  <p class="control"style={controlStyle}>
                    <input
                      className={`input ${errors.description ? 'is-danger' : ''}`}
                      type="textarea"
                      placeholder="Please enter the details of your request"
                      name="description"
                      onChange={this.handleChange}
                      value={formData.description}
                      style={{ minHeight: 200 }}
                    />
                  </p>
                  {errors.description && <small className="help is-danger">Description is required</small>}
                </div>

                {/* <div className="file has-name">
                  <label className="file-label">
                    <input className="file-input" type="file" name="file" onChange={this.handleChange}/>
                    <span className="file-cta">
                      <span className="file-icon">
                        <i className="fas fa-upload"></i>
                      </span>
                      <span className="file-label">
                        Choose a file…
                      </span>
                    </span>
                    <span className="file-name">
                      No file uploaded
                    </span>
                  </label>
                </div>
       */}
                <div className="field">
                  <button
                    type="submit"
                    className="button is-fullwidth is-black"
                    >Submit</button>
                </div>

              </form>

            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Request