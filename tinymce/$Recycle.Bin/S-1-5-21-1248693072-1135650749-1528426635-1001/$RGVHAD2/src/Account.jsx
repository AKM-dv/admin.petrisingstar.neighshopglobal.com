import { useState } from 'react'
import './Account.css'
import BottomNavigation from './BottomNavigation'
import Settings from './Settings'

function Account({ onBack, activeNavTab, onNavChange, onLogout, userData }) {
  const [activeNav, setActiveNav] = useState(activeNavTab || 'Account')
  const [showSettings, setShowSettings] = useState(false)

  const handleNavChange = (tab) => {
    setActiveNav(tab)
    onNavChange?.(tab)
    if (tab === 'Home') {
      onBack?.()
    }
  }

  if (showSettings) {
    return <Settings onBack={() => setShowSettings(false)} />
  }

  const phoneDisplay = userData?.countryCode && userData?.phoneNumber
    ? `${userData.countryCode} ${userData.phoneNumber}`
    : userData?.phoneNumber || '+91 9800000000'

  const initials = userData?.name ? userData.name.charAt(0).toUpperCase() : 'P'

  return (
    <div className="account-container">
      <div className="account-content">
        <header className="account-header">
          <button className="account-edit-button" onClick={onBack} aria-label="Go back">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="18" y1="12" x2="6" y2="12" stroke="black" strokeWidth="2" strokeLinecap="round" />
              <path d="M6 12L12 6M6 12L12 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="account-logo-section">
            <img src="/petify-logo.png" alt="Petifi Logo" className="account-logo-icon" />
            <span className="menu-item-text">Account</span>
          </div>
          <span style={{ width: 22 }} />
        </header>

        <section className="account-profile-section">
          <div className="account-profile-left">
            <div className="account-profile-picture">
              <span className="profile-placeholder-text">{initials}</span>
            </div>
            <div className="account-user-info">
              <p className="account-user-name">{userData?.name || 'Petifi Partner'}</p>
              <p className="account-phone">{phoneDisplay}</p>
            </div>
          </div>
          <div className="account-enquiries-card">
            <p className="enquiries-text">Enquiries</p>
            <strong>12</strong>
          </div>
        </section>

        <section className="account-menu-section">
          <div className="account-menu-item" onClick={() => onNavChange?.('Orders')}>
            <div className="menu-item-left">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 4H15C15.5523 4 16 4.44772 16 5V15C16 15.5523 15.5523 16 15 16H5C4.44772 16 4 15.5523 4 15V5C4 4.44772 4.44772 4 5 4Z" stroke="#000000" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 2H13" stroke="#000000" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 8H13" stroke="#000000" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="menu-item-text">Orders</span>
            </div>
          </div>

          <div className="account-menu-item" onClick={() => setShowSettings(true)}>
            <div className="menu-item-left">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#000000" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16.6667 10C16.6667 10.5333 16.6 11.05 16.4833 11.55L18.3333 12.95L16.7167 15.55L14.6 14.9C13.9 15.4333 13.1333 15.85 12.3 16.1167L12 18.3333H8L7.7 16.1167C6.86667 15.85 6.1 15.4333 5.4 14.9L3.28333 15.55L1.66667 12.95L3.51667 11.55C3.4 11.05 3.33333 10.5333 3.33333 10C3.33333 9.46667 3.4 8.95 3.51667 8.45L1.66667 7.05L3.28333 4.45L5.4 5.1C6.1 4.56667 6.86667 4.15 7.7 3.88333L8 1.66667H12L12.3 3.88333C13.1333 4.15 13.9 4.56667 14.6 5.1L16.7167 4.45L18.3333 7.05L16.4833 8.45C16.6 8.95 16.6667 9.46667 16.6667 10Z" stroke="#000000" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="menu-item-text">Settings</span>
            </div>
          </div>

          <div className="account-menu-item" onClick={() => handleNavChange('Withdrawal')}>
            <div className="menu-item-left">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.33333 5.83333H15.8333C16.7538 5.83333 17.5 6.57953 17.5 7.5V15C17.5 15.9205 16.7538 16.6667 15.8333 16.6667H4.16667C3.24619 16.6667 2.5 15.9205 2.5 15V6.66667C2.5 6.20643 2.8731 5.83333 3.33333 5.83333Z" stroke="#000000" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6.66666 3.33333H13.3333" stroke="#000000" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="menu-item-text">Withdrawal</span>
            </div>
          </div>
        </section>

        <button className="account-logout-button" type="button" onClick={onLogout}>
          Logout
        </button>

        <BottomNavigation activeTab={activeNav} onTabChange={handleNavChange} />
      </div>
    </div>
  )
}

export default Account

