import React from 'react'
import { Link } from 'react-router-dom'
import { backgroundImages } from '../../styles/backgroundImages'
import schemeCreator from '../../styles/imgs/about1_creators.png'
import schemeViewer from '../../styles/imgs/about1_viewers.png'


class About extends React.Component {
  state = {
   view: { creator: false, viewer: false },
   benefitsCreator: [
     { summary: 'More Income', detail: 'Motivate your followers to tip you directly through the income sharing scheme and no-ads mode' },
     { summary: 'More Followers', detail: 'Increase followers through the income sharing scheme'},
     { summary: 'Interactive Feedback', detail: 'No restrictions to communicate with your audience and get honest feedback'},
   ],
   benefitsViewer: [
    { summary: 'More Growth, More Return', detail: 'Tip creators of your choice and enjoy return from their prospect income on the platform' },
    { summary: 'Ad Restriction', detail: 'No ads during the contents (after tip)' },
    { summary: 'Contents Discovery', detail: 'Find your favorite contents, some exclusively available on the platform'},
    { summary: 'Interactive Communication', detail: 'Message your favorite creators and share your thoughts' },
  ]
  }

  handleView = e => {
    const view = { ...this.state.view, [e.target.name]: !this.state.view[e.target.name] }
    this.setState({ view })
  }

  render() {
    const { view, benefitsCreator, benefitsViewer } = this.state
    const ram =  Math.floor(Math.random() * (backgroundImages.length - 1))
    const overBreakPoint = window.innerWidth > 420 ? true : false
    const backgroundStyle = {
      display: 'flex',
      justifyContent: 'center',
      backgroundImage: `url(${backgroundImages[ram]})`,
      filter: "opacity(80%)",
      backgroundPosition:'center', 
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      minHeight: overBreakPoint ? 1200 : 500,
      minWidth: window.innerWidth
    }
    const btnContainerStyle = { 
      display: 'flex',
      flexDirection: overBreakPoint ? 'row' : 'column',
      justifyContent: 'center',
      alignItems: 'center' 
    }
    const btnStyle = {
      fontSize: overBreakPoint ? 50 : 20,
      filter: "none",
      textDecoration: "none",
      margin: overBreakPoint ? 50 : 20,
      width: overBreakPoint ? 360 : 200,
      fontFamily: 'Lexend Tera'
    }
    const articlesContainerStyle = {
      display: 'flex', 
      alignItems: 'center',
      flexDirection: 'column', 
      justifyContents: 'center', 
      marginTop: overBreakPoint ? 50 : 20
    }
    const articleStyle = {
      margin: 10,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: overBreakPoint ? 20 : 10,
      width: overBreakPoint ? '80%' : '90%',
    }
    const articleHeaderStyle = {
      fontSize: overBreakPoint ? 16 : 12,
      fontWeight: 800,
      color: 'black',
    }
    const articleBodyStyle = {
      fontFamily: 'arial',
      fontSize: overBreakPoint ? 16 : 12,
    }
    const benefitListStyle = { 
      display: 'flex', 
      marginBottom: 20,
      flexDirection: overBreakPoint ? 'row' : 'column',
    }
    const benefitCardStyle = {
      margin: 10, 
      width: overBreakPoint ? '32%' : '90%',
      fontSize: overBreakPoint ? 14 : 12,
    }
    const benefitCardHeaderStyle = {
      backgroundColor: 'black',
      fontFamily: 'arial'
    }
    const benefitCardBodyStyle = {
      // fontSize: overBreakPoint ? 12 : 10,
      fontFamily: 'arial'
    }
    const regBtnContainerStyle = {
      display: 'flex', 
      justifyContent: 'center', 
      marginTop: 10, 
      marginBottom: 30, 
      width: '100%'
    }
    const regBtnStyle = {
      fontSize: overBreakPoint ? 20 : 16,
      fontWeight: 700,
      padding: 10, 
      width: overBreakPoint ? '80%' : '90%',
      minHeight: overBreakPoint ? 80 : 40,
    }

    return (
      <>
        <div 
          className={(view.creator === false & view.viewer === false) ? '' : 'is-hidden'}
          style={backgroundStyle}
        >
          <div className="buttons" style={btnContainerStyle}>
            <button 
              onClick={this.handleView}
              name="creator"
              value={this.state.view.creator}
              className="button is-black is-rounded"
              style={btnStyle}
              >Creator</button>
            <button 
              onClick={this.handleView}
              name="viewer" 
              value={this.state.view.viewer}
              className="button is-black is-rounded" 
              style={btnStyle}
              >Viewer</button>
          </div>
        </div>

  
        <div className={view.creator === true ? '' : 'is-hidden'}>
          <main style={backgroundStyle}>
            <div className='container' style={articlesContainerStyle}>
              <article className="message is-dark" style={articleStyle}>
                <h2 style={articleHeaderStyle}><i className="fas fa-info-circle"></i> About The Company</h2>
                <hr />
                <p style={articleBodyStyle}><strong>movik</strong> is a cutting edge contents platform to provide income opportunity for emerging creators through its unique revenuse share scheme.</p>
              </article>
          
              <article className="message is-dark" style={articleStyle}>
                <h2 style={articleHeaderStyle}><i className="fas fa-cogs"></i> How It Works</h2>
                <hr />
                <p style={articleBodyStyle}><strong>movik</strong> motivates viewers to tip creators of their choice and share the contents through the kick-back system of the tip they had paid for the creators.
                <br />So, you can enjoy extra income from your followers on top of the ad revenue generated on the platform, while accelerating the growth of your account.
                </p>
                <br/>
                <img src={schemeCreator} alt="concept" style={{ width:'60%', justifySelf: 'center'}} />
              </article>

              {!overBreakPoint && 
                <div style={regBtnContainerStyle}>
                  <Link 
                    to='/register/init'
                    className="button is-rounded is-danger" 
                    style={regBtnStyle}
                    ><strong>Register</strong></Link>
                </div>}

              <article className="message is-dark" style={articleStyle}>
                <h2 style={articleHeaderStyle}><i className="fas fa-chart-line"></i> Your Benefits</h2>
                <hr />
                <div style={benefitListStyle}>
                {benefitsCreator.map( item => (
                  <article className="message is-dark" key={item.index} style={benefitCardStyle}>
                    <div className="message-header" style={benefitCardHeaderStyle}>{item.summary}</div>
                    <div className="message-body" style={benefitCardBodyStyle}><i className="fas fa-check"></i> {item.detail}</div>
                  </article>
                ))}
                </div>
              </article>

              <div style={regBtnContainerStyle}>
                {overBreakPoint ?
                  <Link 
                    to='/register/init'
                    className="button is-rounded is-danger" 
                    style={regBtnStyle}
                    >Register for more updates</Link>
                    :
                  <Link 
                  to='/register/init'
                  className="button is-rounded is-danger" 
                  style={regBtnStyle}
                  >Register</Link>}  
              </div>
              
            </div>
          </main>
        </div>


        <div className={view.viewer === true ? '' : 'is-hidden'}>
          <main style={backgroundStyle}>
            <div className='container' style={btnContainerStyle}>
              <article className="message is-dark" style={articleStyle}>
                <h2 style={articleHeaderStyle}><i className="fas fa-info-circle"></i> About The Company</h2>
                <hr />
                <p style={articleBodyStyle}><strong>movik</strong> is a cutting edge contents platform to provide you an opportunity to discover and invest your favorite creators.
                <br/>The contents on the platform are <strong>free</strong> to view and whether to tip the creators is all up to you.</p>
              </article>

              <article className="message is-dark" style={articleStyle}>
                <h2 style={articleHeaderStyle}><i className="fas fa-cogs"></i> How It Works</h2>
                <hr />
                <p style={articleBodyStyle}><strong>movik</strong> provide income sharing scheme among creators and viewers.
                <br />
                After the registration, you have an option to tip creators of your choice if you enjoy their contents. Then, you have a right to gain a portion of income that the creators you tipped will make on the platform. More income the creators will make, more return you will recieve in the future.
                <br />
                Exclusive contents, ad blocking function, and direct message to the creators available.
                </p>

                <br/>
                <img src={schemeViewer} alt="concept" style={{ width:'60%', justifySelf: 'center'}} />
              </article>

              {!overBreakPoint && <div style={regBtnContainerStyle}>
                <Link 
                  to='/register/init'
                  className="button is-rounded is-danger" 
                  style={regBtnStyle}
                  ><strong>Register</strong></Link>
              </div>}

              <article className="message is-dark" style={articleStyle}>
                <h2 style={articleHeaderStyle}><i className="fas fa-chart-line"></i> Your Benefits</h2>
                <hr />
                <div style={benefitListStyle}>
                {benefitsViewer.map( item => (
                  <article className="message is-dark" key={item.index} style={benefitCardStyle}>
                    <div className="message-header" style={benefitCardHeaderStyle}>{item.summary}</div>
                    <div className="message-body" style={benefitCardBodyStyle}><i className="fas fa-check"></i> {item.detail}</div>
                  </article>
                ))}
                </div>
              </article>

              <div style={regBtnContainerStyle}>
              {overBreakPoint ?
                <Link 
                  to='/register/init'
                  className="button is-rounded is-danger" 
                  style={regBtnStyle}
                  >Register for more updates</Link>
                  :
                <Link 
                to='/register/init'
                className="button is-rounded is-danger" 
                style={regBtnStyle}
                >Register</Link>}
              </div>
              
            </div>
          </main>
        </div>
      </>
    )
  }
}

export default About