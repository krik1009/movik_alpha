import React from 'react'
import { Link } from 'react-router-dom'
import { backgroundImages } from '../../styles/backgroundImages'
import schemeCreator from '../../styles/imgs/about1_creators.png'
import schemeViewer from '../../styles/imgs/about1_viewers.png'


class LandingPage extends React.Component {
  state = {
   view: { creator: false, viewer: false },
   benefitsCreator: [
     { summary: 'Revenue Opportunity', detail: 'Incentify your audience to tip your contents by unique revenue share scheme and no-ads mode' },
     { summary: 'Direct Communication', detail: 'No restrictions to communicate with your audience and get feedback'},
     { summary: 'Maximum Exposure', detail: 'Random recommendation system to expose your contents to your potential fans'}
   ],
   benefitsViewer: [
    { summary: 'Discovery', detail: 'Find your favorite content creator available at movik'},
    { summary: 'Direct Communication', detail: 'Support your creators through your feedback, comments and tip' },
    { summary: 'Revenue Opportunity', detail: 'Tip creators of your choice and share prospect revnue generated through tip from other fans' },
    { summary: 'Ad Restriction', detail: 'No ads during the contents' }
  ]
  }

  handleView = e => {
    const view = { ...this.state.view, [e.target.name]: !this.state.view[e.target.name] }
    this.setState({ view })
  }

  render() {
    const { view, benefitsCreator, benefitsViewer } = this.state
    const ram =  Math.floor(Math.random() * (backgroundImages.length - 1))
    const backgroundStyle = {
      display: 'flex',
      justifyContent: 'center',
      backgroundImage: `url(${backgroundImages[ram]})`,
      filter: "opacity(80%)",
      backgroundPosition:'center', 
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      minHeight: window.innerWidth > 420 ? 1200 : 500,
      minWidth: window.innerWidth
    }
    const btnStyle = {
      fontSize: window.innerWidth > 420 ? 50 : 20,
      filter: "none",
      textDecoration: "none",
      margin: window.innerWidth > 420 ? 80 : 20,
      width: window.innerWidth > 420 ? 360 : 200,
      fontFamily: 'Lexend Tera'
    }
    const articlesContainerStyle = {
      display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContents: 'center', marginTop: window.innerWidth > 420 ? 50 : 20
    }
    const articleStyle = {
      margin: 10,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: window.innerWidth > 420 ? 20 : 10,
      fontSize: window.innerWidth > 420 ? 12 : 8,
      width: window.innerWidth > 420 ? '80%' : '90%',
    }
    const articleHeaderStyle = {
      fontSize: window.innerWidth > 420 ? 16 : 12,
      fontWeight: 800,
    }
    const benefitListStyle = { 
      display: 'flex', 
      marginBottom: 20,
      flexDirection: window.innerWidth > 420 ? 'row' : 'column',
    }
    const benefitCardStyle = {
      margin: 10, 
      width: window.innerWidth > 420 ? '32%' : '90%',
      fontSize: window.innerWidth > 420 ? 12 : 10,
    }
    const regBtnContainerStyle = {
      display: 'flex', justifyContent: 'center', marginTop: 10, marginBottom: 30, width: '100%'
    }
    const regBtnStyle = {
      fontSize: window.innerWidth > 420 ? 20 : 16,
      padding: 10, 
      width: window.innerWidth > 420 ? '100%' : '90%',
      minHeight: window.innerWidth > 420 ? 80 : 40,
    }

    return (
      <>
        <div 
          className={(view.creator === false & view.viewer === false) ? '' : 'is-hidden'}
          style={backgroundStyle}
        >
          <div className="buttons" style={{ 
            display: 'flex',
            flexDirection: window.innerWidth > 420 ? 'row' : 'column',
            justifyContent: 'center',
            alignItems: 'center' }}>
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
                <p><strong>movik</strong> is a cutting edge contents platform to provide income opportunity for creators in early stage through its unique revenuse share scheme.</p>
              </article>
          
              <article className="message is-dark" style={articleStyle}>
                <h2 style={articleHeaderStyle}><i className="fas fa-cogs"></i> How It Works</h2>
                <hr />
                <p><strong>movik</strong> intencifies viewers to tip creators of their choice through the income sharing. On top of revenue from ads, all creators have chance to gain extra revenue from their core fans.</p>
                <br/>
                <img src={schemeCreator} alt="concept" style={{ width:'60%', alignSelf: 'center' }} />
              </article>

              {window.innerWidth < 420 && 
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
                    <div className="message-header">{item.summary}</div>
                    <div className="message-body"><i className="fas fa-check"></i> {item.detail}</div>
                  </article>
                ))}
                </div>
              </article>

              <div style={regBtnContainerStyle}>
                <Link 
                  to='/register/init'
                  className="button is-rounded is-danger" 
                  style={regBtnStyle}
                  ><strong>Register</strong></Link>
              </div>
              
            </div>
          </main>
        </div>


        <div className={view.viewer === true ? '' : 'is-hidden'}>
          <main style={backgroundStyle}>
            <div className='container' style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: 30 }}>
              <article className="message is-dark" style={articleStyle}>
                <h2 style={articleHeaderStyle}><i className="fas fa-info-circle"></i> About The Company</h2>
                <hr />
                <p><strong>movik</strong> is a cutting edge contents platform to provide opportunity to discover new creators in early stage and share income with the creators through tip. The platform is completely <strong>free</strong> to access.</p>
              </article>

              <article className="message is-dark" style={articleStyle}>
                <h2 style={articleHeaderStyle}><i className="fas fa-cogs"></i> How It Works</h2>
                <hr />
                <p><strong>movik</strong> provide you opportunities to discover and invest your favorite content creators. 
                <br />
                The platform is free to access, and you have an option to tip creators of your choice. Earlier you tip a creator, more chance you increase the gain in the future.</p>
                <br/>
                <img src={schemeViewer} alt="concept" style={{ width:'60%', alignSelf: 'center' }} />
              </article>

              {window.innerWidth < 420 && <div style={regBtnContainerStyle}>
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
                    <div className="message-header">{item.summary}</div>
                    <div className="message-body"><i className="fas fa-check"></i> {item.detail}</div>
                  </article>
                ))}
                </div>
              </article>

              <div style={{ display: 'flex', justifyContent: 'center', margin: 50, width: "80%"}}>
                <Link 
                  to='/register/init'
                  className="button is-rounded is-danger" 
                  style={regBtnStyle}
                  ><strong>Register</strong></Link>
              </div>
              
            </div>
          </main>
        </div>
      </>
    

    )
  }

}

export default LandingPage