import { useState } from 'react'
import './App.css'
import GetStarted from './GetStarted'
import ServiceHome from './ServiceHome'
import UserInfo from './UserInfo'

function App() {
  const [showGetStarted, setShowGetStarted] = useState(false)
  const [showUserInfo, setShowUserInfo] = useState(false)
  const [showHome, setShowHome] = useState(false)
  const [userData, setUserData] = useState(null)

  if (showHome) {
    return (
      <ServiceHome 
        userData={userData}
        onLogout={() => {
          setShowHome(false)
          setShowGetStarted(false)
          setShowUserInfo(false)
          setUserData(null)
        }}
      />
    )
  }

  if (showUserInfo) {
    return (
      <UserInfo 
        onBack={() => setShowUserInfo(false)}
        onNext={(data) => {
          setUserData(data)
          setShowUserInfo(false)
          setShowGetStarted(true)
        }}
      />
    )
  }

  if (showGetStarted) {
    return (
      <GetStarted 
        onBack={() => setShowGetStarted(false)} 
        onLogout={() => {
          setShowGetStarted(false)
          setShowUserInfo(false)
        }}
        onShowHome={(phoneData) => {
          if (phoneData) {
            setUserData(prevData => ({
              ...prevData,
              phoneNumber: phoneData.phoneNumber,
              countryCode: phoneData.countryCode
            }))
          }
          setShowHome(true)
          setShowGetStarted(false)
        }}
      />
    )
  }

  return (
    <div className="mobile-container">
      <header className="header">
        <img src="/petify-logo.png" alt="Petifi Logo" className="logo" />
      </header>
      
      <div className="content">
        <img src="/login-image.png" alt="Pet and Owner" className="illustration" />
        
        <h2 className="main-heading">
          Pet Grooming - Vet On Call - Dog Walking
        </h2>
        
        <p className="tagline">
          We Connect Pet Parents With People Who'll Treat Their Pets Like Family
        </p>
      </div>
      
      <div className="action-buttons">
        <button className="btn-login" onClick={() => setShowGetStarted(true)}>Login</button>
        <button className="btn-register" onClick={() => setShowUserInfo(true)}>Register</button>
      </div>
    </div>
  )
}

export default App
