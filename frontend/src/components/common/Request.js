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
    const overBreakPoint = window.innerWidth > 420 ? true : false
    const backgroundStyle = {
      display: 'flex',
      justifyContent: 'center',
      backgroundImage: `url(${backgroundImages[6]})`,
      backgroundPosition:'center', 
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      minHeight: overBreakPoint ? 800 : 500,
    }
    const containerStyle = {
      minWidth: overBreakPoint ? 700 : '95%',
      backgroundColor: 'rgba(255, 255, 255, 0.7)'
    }
    const titleStyle ={
      fontSize: overBreakPoint ? 28 : 20,
      fontFamily: 'arial'
    }
    const subtitleStyle = {
      fontSize: overBreakPoint ? 20 : 16,
      fontFamily: 'arial'
    }
    const formStyle = {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center'
    }
    const labelStyle = {
      margin: overBreakPoint ? 12 : 8,
      width: overBreakPoint ? '25%' : '100%',
      fontSize: overBreakPoint ? 18 : 10,
      fontFamily: 'arial'
    }
    const controlStyle = {
      margin: overBreakPoint ? 12 : 8,
      width: overBreakPoint ? '70%' : '100%',
      fontSize: overBreakPoint ? 18 : 10,
      fontFamily: 'arial'
    }
    const submitBtnStyle = {
      marginTop: 50
    }

    return (
      <div className="register" style={backgroundStyle}>
        <section className="section">
          <div className="container box" style={containerStyle}>
            <h1 className="title" style={titleStyle}>Request Form</h1>
            <p style={subtitleStyle}>We will contact you as soon as possible</p> 
            <hr />

            <div className="columns">
              <form onSubmit={this.handleSubmit} className="column">

                <div className="field" style={formStyle}>
                  {overBreakPoint && <label className="label" style={labelStyle}>Email *</label>}
                  <p className="control" style={controlStyle}>
                  {!overBreakPoint && <label className="label" style={labelStyle}>Email *</label>}
                    <input
                      className={`input ${errors.email ? 'is-danger' : ''} ${overBreakPoint ? '': 'is-small'}`}
                      placeholder="Your email address"
                      name="email"
                      onChange={this.handleChange}
                      value={formData.email}
                    />
                  </p>
                  {errors.email && <small className="help is-danger">Email is required</small>}
                </div>

                <div className="field" style={formStyle}>
                  {overBreakPoint && <label className="label" style={labelStyle}>You are: </label>}
                  <div className="control" style={controlStyle}>
                  {!overBreakPoint && <label className="label" style={labelStyle}>You are: </label>}
                    <label className="radio" style={{ marginRight: 20 }}>
                      <input type="radio" name="user_type"  value="cr" onClick={this.handleChange} style={{ margin: 8}}/>
                      Creator
                    </label>
                    <label className="radio">
                      <input type="radio"  name="user_type"  value="vw" onClick={this.handleChange} style={{ margin: 8}}/ >
                      Viewer
                    </label>
                    <label className="radio">
                      <input type="radio"  name="user_type"  value="ot" onClick={this.handleChange} style={{ margin: 8}} />
                      Other
                    </label>
                  </div>
                </div>

                <div className="field" style={formStyle}>
                  {overBreakPoint && <label className="label" style={labelStyle}>Subject *</label>}
                  <p class="control"style={controlStyle}>
                    {!overBreakPoint && <label className="label" style={labelStyle}>Subject *</label>}
                    <input
                      className={`input ${errors.subject ? 'is-danger' : ''} ${overBreakPoint ? '': 'is-small'}`}
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
                  {overBreakPoint && <label className="label" style={labelStyle}>Request *</label>}
                  <p class="control"style={controlStyle}>
                    {!overBreakPoint && <label className="label" style={labelStyle}>Request *</label>}
                    <input
                      className={`input ${errors.description ? 'is-danger' : ''} ${overBreakPoint ? '': 'is-small'}`}
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
                    style={submitBtnStyle}
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