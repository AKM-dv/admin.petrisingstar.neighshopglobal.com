import { useState } from 'react'
import './GetStarted.css'
import OTP from './OTP'
import Verification from './Verification'

function GetStarted({ onBack, onLogout, onShowHome }) {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [countryCode, setCountryCode] = useState('+91')
  const [showOTP, setShowOTP] = useState(false)
  const [showVerification, setShowVerification] = useState(false)
  const [errors, setErrors] = useState({})
  const [savedUserData, setSavedUserData] = useState(null)

  const isPhoneValid = phoneNumber.length === 10

  const handlePhoneChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, '')
    if (digitsOnly.length <= 10) {
      setPhoneNumber(digitsOnly)
      setErrors((prev) => {
        if (!prev.phone) return prev
        const { phone, ...rest } = prev
        return rest
      })
    }
  }

  const handleContinue = () => {
    if (!isPhoneValid) {
      setErrors({ phone: 'Enter a valid 10-digit mobile number' })
      return
    }
    setShowOTP(true)
  }

  const handleVerifySuccess = () => {
    setShowOTP(false)
    setShowVerification(true)
  }

  const handleShowHome = (data) => {
    setShowVerification(false)
    setShowOTP(false)
    onShowHome?.(data || { phoneNumber, countryCode })
  }

  if (showVerification) {
    return (
      <Verification
        onBack={() => {
          setShowVerification(false)
          setShowOTP(false)
        }}
        onContinue={(verificationData) => {
          setSavedUserData(verificationData)
        }}
        onShowHome={handleShowHome}
        onSaveUser={(userInfo) => {
          setSavedUserData((prev) => ({ ...prev, ...userInfo }))
        }}
        phoneNumber={phoneNumber}
        countryCode={countryCode}
      />
    )
  }

  if (showOTP) {
    return (
      <OTP
        onBack={() => setShowOTP(false)}
        phoneNumber={phoneNumber}
        countryCode={countryCode}
        onLogout={onLogout}
        onVerifySuccess={handleVerifySuccess}
      />
    )
  }

  return (
    <div className="get-started-container">
      <div className="get-started-content">
        <div className="header-section">
          <button className="back-button" onClick={onBack} aria-label="Go back">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="18" y1="12" x2="6" y2="12" stroke="black" strokeWidth="2" strokeLinecap="round" />
              <path d="M6 12L12 6M6 12L12 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="top-section">
          <div className="phone-icon-container">
            <img src="/phone-icon.png" alt="Phone" className="phone-icon" />
          </div>
          <div className="heading-with-stars">
            <h1 className="get-started-heading">Get Started</h1>
            <div className="stars-container" aria-hidden="true">
              <span className="star-icon">★</span>
              <span className="star-icon">★</span>
              <span className="star-icon">★</span>
            </div>
          </div>
          <div className="description-section">
            <p className="description-text">Enter your registered mobile number to receive a verification code.</p>
            <p className="description-text">This helps us keep your account secure.</p>
          </div>
        </div>

        <div className="form-section">
          <div className="phone-input-wrapper">
            <div className={`phone-input-container ${errors.phone ? 'error' : ''}`}>
              <div className="country-code-selector">
                {countryCode}
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                className="phone-input"
                placeholder="Enter mobile number"
                value={phoneNumber}
                onChange={handlePhoneChange}
                maxLength={10}
              />
            </div>
            {errors.phone && <p className="error-message">{errors.phone}</p>}
          </div>

          <button
            className={`continue-button ${!isPhoneValid ? 'disabled' : ''}`}
            onClick={handleContinue}
            disabled={!isPhoneValid}
            type="button"
          >
            Continue
          </button>

          <p className="terms-text">
            By continuing, you agree to our Terms of Service and acknowledge our Privacy Policy.
          </p>
        </div>

        <div className="illustration-bottom" aria-hidden="true">
          <img src="/get-started-image.png" alt="Pet care illustration" className="get-started-illustration" />
        </div>
      </div>
    </div>
  )
}

export default GetStarted

