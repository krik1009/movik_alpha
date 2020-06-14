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
    const btnStyle = {
      fontSize: 50,
      filter: "none",
      textDecoration: "none",
      margin: 100,
      minWidth: "30%",
      fontFamily: 'Lexend Tera'
    }
    const articleStyle = {
      width: "80%",
      margin: 10,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: 20,
      fontSize: 12
    }
    const articleHeaderStyle = {
      fontSize: 16,
      fontWeight: 800,
    }

    return (
      <>
        <div 
          className={(view.creator === false & view.viewer === false) ? '' : 'is-hidden'}
          style={{
            display: 'flex',
            justifyContent: 'center',
            backgroundImage: `url(${backgroundImages[ram]})`,
            filter: "opacity(80%)",
            backgroundPosition:'center', 
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: 1000
          }}
        >
          <div className="buttons">
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
          <main style={{
            backgroundImage: `url(${backgroundImages[ram]})`,
            backgroundPosition:'center', 
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            display: 'flex', justifyContents: 'center',
          }}>
            <div className='container' style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: 30 }}>
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

              <article className="message is-dark" style={articleStyle}>
                <h2 style={articleHeaderStyle}><i className="fas fa-chart-line"></i> Your Benefits</h2>
                <hr />
                <div style={{ display: 'flex', marginBottom: 20 }}>
                {benefitsCreator.map( item => (
                  <article className="message is-dark" key={item.index} style={{ margin: 10, width: "32%", fontSize: 12 }}>
                    <div className="message-header">{item.summary}</div>
                    <div className="message-body"><i className="fas fa-check"></i> {item.detail}</div>
                  </article>
                ))}
                </div>
              </article>

              <div style={{ display: 'flex', justifyContent: 'center', margin: 50, width: '80%' }}>
                <Link 
                  to='/register/init'
                  className="button is-rounded is-danger" 
                  style={{ fontSize: 20, padding: 10, width: "100%", minHeight: 80 }}
                  ><strong>Register for updates and more info</strong></Link>
              </div>
              
            </div>
          </main>
        </div>


        <div className={view.viewer === true ? '' : 'is-hidden'}>
          <main style={{
            backgroundImage: `url(${backgroundImages[ram]})`,
            backgroundPosition:'center', 
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            display: 'flex', justifyContents: 'center',
          }}>
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

              <article className="message is-dark" style={articleStyle}>
                <h2 style={articleHeaderStyle}><i className="fas fa-chart-line"></i> Your Benefits</h2>
                <hr />
                <div style={{ display: 'flex', marginBottom: 20 }}>
                {benefitsViewer.map( item => (
                  <article className="message is-dark" key={item.index} style={{ margin: 10, width: "32%", fontSize: 12 }}>
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
                  style={{ fontSize: 20, padding: 10, width: "100%", minHeight: 80 }}
                  ><strong>Register for updates and more info</strong></Link>
              </div>
              
            </div>
          </main>
        </div>
      </>
    

    )
  }

}

export default LandingPage