import { useState } from 'react'
import './AccountVerification.css'

function AccountVerification({ onBack, onContinue, onShowHome, phoneNumber, countryCode }) {
  const [accountHolderName, setAccountHolderName] = useState('')
  const [bankName, setBankName] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [ifscCode, setIfscCode] = useState('')
  const [showPendingPopup, setShowPendingPopup] = useState(false)
  const [showVerifiedPopup, setShowVerifiedPopup] = useState(false)

  const handleContinue = () => {
    setShowPendingPopup(true)
  }

  const handlePendingOk = () => {
    setShowPendingPopup(false)
    setShowVerifiedPopup(true)
  }

  const handleVerifiedOk = () => {
    if (onShowHome) {
      onShowHome({
        phoneNumber: phoneNumber || '',
        countryCode: countryCode || '+91'
      })
    }
    setShowVerifiedPopup(false)
    if (onContinue) {
      onContinue({
        accountHolderName,
        bankName,
        accountNumber,
        ifscCode
      })
    }
  }

  return (
    <div className="account-verification-container">
      {showPendingPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2 className="popup-title">Pending Verification</h2>
            <p className="popup-message">
              Your account is pending verification. Please check again later.
            </p>
            <div className="popup-divider"></div>
            <button className="popup-ok-button" onClick={handlePendingOk}>
              Ok
            </button>
          </div>
        </div>
      )}
      {showVerifiedPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2 className="popup-title">Account Verified</h2>
            <p className="popup-message">
              Your account is successfully verified.
            </p>
            <div className="popup-divider"></div>
            <button className="popup-ok-button" onClick={handleVerifiedOk}>
              Ok
            </button>
          </div>
        </div>
      )}
      <div className="account-verification-content">
        <div className="account-verification-header">
          <button className="back-button" onClick={onBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="18" y1="12" x2="6" y2="12" stroke="black" strokeWidth="2" strokeLinecap="round"/>
              <path d="M6 12L12 6M6 12L12 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="account-verification-logo">
            <img src="/petify-logo.png" alt="Petifi Logo" className="logo-icon" />
          </div>
        </div>

        <div className="account-verification-body">
          <h1 className="account-verification-title">Account Verification</h1>

          <div className="account-verification-form">
            <input
              type="text"
              placeholder="Account Holder Name"
              value={accountHolderName}
              onChange={(e) => setAccountHolderName(e.target.value)}
              className="account-input"
            />

            <input
              type="text"
              placeholder="Bank Name"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="account-input"
            />

            <input
              type="text"
              placeholder="Account Number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="account-input"
            />

            <input
              type="text"
              placeholder="IFSC Code"
              value={ifscCode}
              onChange={(e) => setIfscCode(e.target.value)}
              className="account-input"
            />
          </div>

          <button className="save-continue-button" onClick={handleContinue}>
            Save & Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default AccountVerification

