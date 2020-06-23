import React from 'react'
import { Link } from 'react-router-dom'
import { backgroundImages } from '../../styles/backgroundImages'
import schemeCreator from '../../styles/imgs/about1_creators.png'
import schemeViewer from '../../styles/imgs/about1_viewers.png'


class About extends React.Component {
  state = {
    view: { creator: false, viewer: false },
    components: { about: true, scheme: true, benefits: true },
    compIcons: { about: 'up', scheme: 'up', benefits: 'up' },
    benefitsCreator: [
      { summary: 'More Income', detail: 'Motivate your followers to tip you directly through the income sharing scheme and no-ads mode' },
      { summary: 'More Followers', detail: 'Increase followers through the income sharing scheme'},
      { summary: 'Interactive Feedback', detail: 'No restrictions to communicate with your audience and get honest feedback'},
    ],
    benefitsViewer: [
      { summary: 'More Growth, More Return', detail: 'Tip creators of your choice and enjoy return from their prospect income on the platform' },
      { summary: 'Contents Discovery', detail: 'Find your favorite contents, some exclusively available on the platform'},
      { summary: 'No Ads on Contents', detail: 'No ads during the contents' },
      // { summary: 'Interactive Communication', detail: 'Message your favorite creators and share your thoughts' },
    ]
  }

  handleView = e => {
    const view = { ...this.state.view, [e.target.name]: !this.state.view[e.target.name] }
    this.setState({ view })
  }

  handleShow = comp => {
    const components = { ...this.state.components, [comp]: !this.state.components[comp] }
    const compIcons = !this.state.components[comp] === true ? 
      { ...this.state.compIcons, [comp]: 'up' }
      :
      { ...this.state.compIcons, [comp]: 'down' }
    this.setState({ components, compIcons })
    // console.log(this.state.compIcons)
  }

  render() {
    const { view, benefitsCreator, benefitsViewer, components, compIcons } = this.state
    // const ram =  Math.floor(Math.random() * (backgroundImages.length - 1))
    const overBreakPoint = window.innerWidth > 420 ? true : false
    const backgroundStyle = {
      display: 'flex',
      justifyContent: 'center',
      backgroundImage: `url(${backgroundImages[9]})`,
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
      fontSize: overBreakPoint ? 20 : 16,
      fontWeight: 800,
      color: 'black',
      fontFamily: 'arial'
    }
    const articleBodyStyle = {
      fontFamily: 'arial',
      fontSize: overBreakPoint ? 18 : 14,
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
      fontFamily: 'arial',
      height: 40
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
      fontSize: overBreakPoint ? 24 : 20,
      fontWeight: 700,
      fontFamily: 'arial',
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
                <h2
                  onClick={() => this.handleShow('about')}
                  style={articleHeaderStyle}
                  ><i className="fas fa-info-circle"></i> About The Company 
                  <span className="icon">
                    <i className={`fas fa-caret-${compIcons.about}`}></i>
                  </span>
                </h2>
                <div className={ components.about === true ? '' : 'is-hidden'}>
                  <hr />
                  <p style={articleBodyStyle}>
                    <strong>movik</strong> is a cutting-edge contents platform to provide income opportunity for emerging creators through its unique revenuse share scheme. The company is currently under seed funding and building prototype.</p>
                </div>
              </article>
          
              <article className="message is-dark" style={articleStyle}>
                <h2 
                   onClick={() => this.handleShow('scheme')} 
                   style={articleHeaderStyle}
                   ><i className="fas fa-cogs"></i>  How It Works
                   <span className="icon">
                    <i className={`fas fa-caret-${compIcons.scheme}`}></i>
                  </span>
                  </h2>
                <div className={ components.scheme === true ? '' : 'is-hidden'}>
                  <hr />
                  <p style={articleBodyStyle}><strong>movik</strong> motivates viewers to tip creators of their choice and share the contents through the kick-back system of the tip they had paid for the creators.
                  <br />So, you can enjoy extra income from your followers on top of the ad revenue generated on the platform, while accelerating the growth of your account.
                  </p>
                  <br/>
                  <img src={schemeCreator} alt="concept" style={{ width:'60%', justifySelf: 'center'}} />
                </div>
              </article>

              <article className="message is-dark" style={articleStyle}>
                <h2
                  onClick={() => this.handleShow('benefits')}
                  style={articleHeaderStyle}
                  ><i className="fas fa-chart-line"></i> Your Benefits
                  <span className="icon">
                    <i className={`fas fa-caret-${compIcons.benefits}`}></i>
                  </span></h2>
                <div className={ components.benefits === true ? '' : 'is-hidden'}>
                  <hr />
                  <div style={benefitListStyle}>
                  {benefitsCreator.map( item => (
                    <article className="message is-dark" key={item.index} style={benefitCardStyle}>
                      <div className="message-header" style={benefitCardHeaderStyle}>{item.summary}</div>
                      <div className="message-body" style={benefitCardBodyStyle}><i className="fas fa-check"></i> {item.detail}</div>
                    </article>
                  ))}
                  </div>
                </div>
              </article>

              <div style={regBtnContainerStyle}>
                <Link 
                  to='/register/init'
                  className="button is-rounded is-danger" 
                  style={regBtnStyle}
                  >Register for Updates</Link>
              </div>
              
            </div>
          </main>
        </div>


        <div className={view.viewer === true ? '' : 'is-hidden'}>
          <main style={backgroundStyle}>
            <div className='container' style={articlesContainerStyle}>

              <article className="message is-dark" style={articleStyle}>
                <h2
                  onClick={() => this.handleShow('about')}
                  style={articleHeaderStyle}
                  ><i className="fas fa-info-circle"></i> About The Company
                  <span className="icon">
                    <i className={`fas fa-caret-${compIcons.about}`}></i>
                  </span></h2>
                <div className={ components.about === true ? '' : 'is-hidden'}>
                  <hr />
                  <p style={articleBodyStyle}><strong>movik</strong> is a cutting edge contents platform to provide you an opportunity to discover and invest your favorite creators.
                  <br/>The contents on the platform are free to access and watch the contents and whether to tip the creators is all up to you.
                  <br/>The company is currently under seed funding and building prototype.</p>
                </div>
              </article>

              <article className="message is-dark" style={articleStyle}>
                <h2
                  onClick={() => this.handleShow('scheme')}  
                  style={articleHeaderStyle}
                  ><i className="fas fa-cogs"></i>  How It Works
                  <span className="icon">
                    <i className={`fas fa-caret-${compIcons.scheme}`}></i>
                  </span>
                  </h2>
                <div className={ components.scheme === true ? '' : 'is-hidden'}>
                  <hr />
                  <p style={articleBodyStyle}><strong>movik</strong> provide income sharing scheme among creators and viewers.
                  <br />
                  After the registration, you have an option to tip creators of your choice if you enjoy their contents. Then, you have a right to gain a portion of income that the creators you tipped will make on the platform. More income the creators will make, more return you will recieve in the future.
                  <br />
                  Exclusive contents, ad blocking function, and direct message to the creators available.
                  </p>

                  <br/>
                  <img src={schemeViewer} alt="concept" style={{ width:'60%', justifySelf: 'center'}} />
                </div>
              </article>

              <article className="message is-dark" style={articleStyle}>
                <h2
                  onClick={() => this.handleShow('benefits')}
                  style={articleHeaderStyle}><i className="fas fa-chart-line"></i> Your Benefits 
                   <span className="icon">
                    <i className={`fas fa-caret-${compIcons.benefits}`}></i>
                  </span></h2>
                <div className={ components.benefits === true ? '' : 'is-hidden'}> 
                  <hr />
                  <div style={benefitListStyle}>
                  {benefitsViewer.map( item => (
                    <article className="message is-dark" key={item.index} style={benefitCardStyle}>
                      <div className="message-header" style={benefitCardHeaderStyle}>{item.summary}</div>
                      <div className="message-body" style={benefitCardBodyStyle}><i className="fas fa-check"></i> {item.detail}</div>
                    </article>
                  ))}
                  </div>
                </div>
              </article>

              <div style={regBtnContainerStyle}>
                <Link 
                  to='/register/init'
                  className="button is-rounded is-danger" 
                  style={regBtnStyle}
                  >Register for Updates</Link>
              </div>
              
            </div>
          </main>
        </div>
      </>
    )
  }
}

export default About