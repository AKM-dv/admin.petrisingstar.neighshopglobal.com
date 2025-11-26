import { useState, useEffect } from 'react'
import './App.css'
import GetStarted from './GetStarted'
import UserInfo from './UserInfo'
import Home from './Home'

function App() {
  const [showGetStarted, setShowGetStarted] = useState(false)
  const [showUserInfo, setShowUserInfo] = useState(false)
  const [showHome, setShowHome] = useState(false)
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem('userData')
    return saved ? JSON.parse(saved) : { name: '', email: '' }
  })

  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData))
  }, [userData])

  if (showHome) {
    return <Home 
      onLogout={() => {
        setShowHome(false)
        setShowGetStarted(false)
        setShowUserInfo(false)
        localStorage.removeItem('userData')
        setUserData({ name: '', email: '' })
      }}
      userData={userData}
      setUserData={setUserData}
    />
  }

  if (showUserInfo) {
    return (
      <UserInfo 
        onBack={() => setShowUserInfo(false)}
        onNext={(data) => {
          const newUserData = { name: data.fullName, email: data.email }
          setUserData(newUserData)
          localStorage.setItem('userData', JSON.stringify(newUserData))
          setShowUserInfo(false)
          setShowGetStarted(true)
        }}
      />
    )
  }

  if (showGetStarted) {
    return <GetStarted 
      onBack={() => setShowGetStarted(false)} 
      onLogout={() => {
        setShowGetStarted(false)
        setShowUserInfo(false)
        setShowHome(false)
      }}
      userData={userData}
      setUserData={setUserData}
    />
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