import { useState } from 'react'
import './ServiceHome.css'
import OrderManagement from './OrderManagement'
import BottomNavigation from './BottomNavigation'
import Account from './Account'
import Withdrawal from './Withdrawal'

function ServiceHome({ onLogout, userData }) {
  const [activeTab, setActiveTab] = useState('Home')
  const [isToggleOn, setIsToggleOn] = useState(true)
  const [showOrderManagement, setShowOrderManagement] = useState(false)
  const [showAccount, setShowAccount] = useState(false)
  const [showWithdrawal, setShowWithdrawal] = useState(false)

  const toggleSwitch = () => {
    setIsToggleOn(!isToggleOn)
  }

  const handleNavChange = (tab) => {
    setActiveTab(tab)
    if (tab === 'Orders') {
      setShowOrderManagement(true)
      setShowAccount(false)
      setShowWithdrawal(false)
    } else if (tab === 'Account') {
      setShowAccount(true)
      setShowOrderManagement(false)
      setShowWithdrawal(false)
    } else if (tab === 'Withdrawal') {
      setShowWithdrawal(true)
      setShowOrderManagement(false)
      setShowAccount(false)
    } else if (tab === 'Home') {
      setShowOrderManagement(false)
      setShowAccount(false)
      setShowWithdrawal(false)
    }
  }

  if (showWithdrawal) {
    return (
      <Withdrawal 
        onBack={() => {
          setShowWithdrawal(false)
          setActiveTab('Home')
        }}
        activeNavTab={activeTab}
        onNavChange={handleNavChange}
      />
    )
  }

  if (showAccount) {
    return (
      <Account 
        onBack={() => {
          setShowAccount(false)
          setActiveTab('Home')
        }}
        activeNavTab={activeTab}
        onNavChange={handleNavChange}
        onLogout={onLogout}
        userData={userData}
      />
    )
  }

  if (showOrderManagement) {
    return (
      <OrderManagement 
        onBack={() => {
          setShowOrderManagement(false)
          setActiveTab('Home')
        }}
        activeNavTab={activeTab}
        onNavChange={handleNavChange}
      />
    )
  }

  return (
    <div className="service-home-container">
      <div className="service-home-content">
        <div className="service-home-header">
          <div className="service-home-logo-section">
            <img src="/petify-logo.png" alt="Petifi Logo" className="service-logo-icon" />
          </div>
          <button className="service-home-toggle-button" onClick={toggleSwitch}>
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="36" height="20" rx="10" fill={isToggleOn ? '#FF6B2B' : '#CCCCCC'}/>
              <circle cx={isToggleOn ? 30 : 10} cy="12" r="8" fill="#FFFFFF"/>
            </svg>
          </button>
        </div>

        <div className="service-home-greeting">
          <p className="greeting-text">Hello! 👋</p>
          <h2 className="user-name">{userData?.name || 'Petifi Partner'}</h2>
        </div>

        <div className="service-home-stats">
          <button className="stat-card stat-card-left" onClick={() => setShowOrderManagement(true)}>
            <p className="stat-label">Total Orders</p>
          </button>
          <div className="stat-card stat-card-right">
            <p className="stat-label">Total Revenue</p>
          </div>
        </div>

        <div className="service-home-promo">
          <img src="/service-home.png" alt="Service Home" className="service-home-image" />
        </div>

        <div className="service-home-tables">
          <div className="table-section">
            <h3 className="table-heading">Recent Orders</h3>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Address</th>
                    <th>Price</th>
                    <th>Service</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Anshika</td>
                    <td>Sonipat</td>
                    <td>300 INR</td>
                    <td>Nursing</td>
                  </tr>
                  <tr className="highlighted-row">
                    <td>Anshika</td>
                    <td>Sonipat</td>
                    <td>200 INR</td>
                    <td>Nursing</td>
                  </tr>
                  <tr>
                    <td>Anshika</td>
                    <td>Sonipat</td>
                    <td>300 INR</td>
                    <td>Nursing</td>
                  </tr>
                  <tr className="highlighted-row">
                    <td>Anshika</td>
                    <td>Sonipat</td>
                    <td>300 INR</td>
                    <td>Nursing</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="table-section">
            <h3 className="table-heading">Transactions</h3>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Withdrawal</th>
                    <th>Tax ID</th>
                    <th>Taxes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Anshika</td>
                    <td>3000</td>
                    <td>15986AuDC</td>
                    <td>50 INR</td>
                  </tr>
                  <tr className="highlighted-row">
                    <td>Anshika</td>
                    <td>Sonipat</td>
                    <td>300 INR</td>
                    <td>Nursing</td>
                  </tr>
                  <tr>
                    <td>Anshika</td>
                    <td>Sonipat</td>
                    <td>300 INR</td>
                    <td>Nursing</td>
                  </tr>
                  <tr className="highlighted-row">
                    <td>Anshika</td>
                    <td>Sonipat</td>
                    <td>300 INR</td>
                    <td>Nursing</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <BottomNavigation 
          activeTab={activeTab}
          onTabChange={handleNavChange}
        />
      </div>
    </div>
  )
}

export default ServiceHome

