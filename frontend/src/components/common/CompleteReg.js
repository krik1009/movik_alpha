import React from 'react'
import { backgroundImages } from '../../styles/backgroundImages'


const CompleteReg = () => (
  <div className="register" style={{ 
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundImage: `url(${backgroundImages[5]})`,
    filter: "opacity(80%)",
    backgroundPosition:'center', 
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    minHeight: 600
    }}>
    <div style={{
      width: '100%', 
      backgroundColor: 'rgba(255, 255, 255, 0.6)',     
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      marginTop: 150, 
      height: 200 }}>
      <h1 style={{ 
        fontSize: 50,
        filter: "none",
        textDecoration: "none",

        color: 'black'
      }}>
        Thank you for the registration
      </h1>
      <br />
      <p style={{ fontSize: 18 }}>We will keep you inform our product updates.</p>
    </div>
  </div>
)

export default CompleteReg