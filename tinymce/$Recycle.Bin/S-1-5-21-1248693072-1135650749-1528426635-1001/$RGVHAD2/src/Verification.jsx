import { useState } from 'react'
import './Verification.css'
import Services from './Services'

function Verification({ onBack, onContinue, onShowHome, onSaveUser, phoneNumber, countryCode }) {
  const [showServices, setShowServices] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const [showGenderDropdown, setShowGenderDropdown] = useState(false)
  const [profileImage, setProfileImage] = useState(null)
  const [aadharFile, setAadharFile] = useState(null)
  const [medicalLicenseFile, setMedicalLicenseFile] = useState(null)
  const [showMenu, setShowMenu] = useState(false)
  const [errors, setErrors] = useState({})

  const clearError = (field) => {
    setErrors((prev) => {
      if (!prev[field]) return prev
      const { [field]: removed, ...rest } = prev
      return rest
    })
  }

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileImage(file)
    }
  }

  const handleAadharChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAadharFile(file)
    }
  }

  const handleMedicalLicenseChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setMedicalLicenseFile(file)
    }
  }

  const handleContinue = () => {
    const newErrors = {}

    if (!name.trim()) {
      newErrors.name = 'Please enter your full name'
    }

    const trimmedEmail = email.trim()
    if (!trimmedEmail) {
      newErrors.email = 'Please enter your Gmail address'
    } else if (!/^[A-Za-z0-9._%+-]+@gmail\.com$/i.test(trimmedEmail)) {
      newErrors.email = 'Only Gmail addresses are allowed'
    }

    if (!gender) {
      newErrors.gender = 'Please select your gender'
    }

    if (!profileImage) {
      newErrors.profileImage = 'Profile image is required'
    }

    if (!aadharFile) {
      newErrors.aadhar = 'Aadhar card PDF is required'
    }

    if (!medicalLicenseFile) {
      newErrors.medical = 'Medical license PDF is required'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      if (onSaveUser) {
        onSaveUser({ name, email, gender })
      }
      setShowServices(true)
    }
  }

  if (showServices) {
    return (
      <Services
        onBack={() => setShowServices(false)}
        onNext={(selectedServices) => {
          if (onContinue) {
            onContinue({
              name,
              email,
              gender,
              profileImage,
              aadharFile,
              medicalLicenseFile,
              selectedServices
            })
          }
        }}
        onShowHome={onShowHome}
        phoneNumber={phoneNumber}
        countryCode={countryCode}
      />
    )
  }

  return (
    <div className="verification-container">
      <div className="verification-content">
        <div className="verification-header">
          <div className="verification-logo">
            <img src="/petify-logo.png" alt="Petifi Logo" className="logo-icon" />
          </div>
          <button
            className="hamburger-menu"
            onClick={() => setShowMenu((prev) => !prev)}
            aria-label="Open Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="3" y1="6" x2="21" y2="6" stroke="black" strokeWidth="2" strokeLinecap="round"/>
              <line x1="3" y1="12" x2="21" y2="12" stroke="black" strokeWidth="2" strokeLinecap="round"/>
              <line x1="3" y1="18" x2="21" y2="18" stroke="black" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {showMenu && (
          <div className="verification-menu-overlay" onClick={() => setShowMenu(false)}>
            <div className="verification-menu" onClick={(e) => e.stopPropagation()}>
              <div className="verification-menu-header">
                <h3>Menu</h3>
                <button
                  className="verification-menu-close"
                  onClick={() => setShowMenu(false)}
                  aria-label="Close Menu"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18" stroke="#FF6B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 6L18 18" stroke="#FF6B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              <button className="verification-menu-item" onClick={() => setShowMenu(false)}>
                <span className="menu-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 16.92V19a2 2 0 0 1-2 2h-3c-4 0-9-5-9-9V5a2 2 0 0 1 2-2h3.09a2 2 0 0 1 1.41.59l.91.91a2 2 0 0 1 .59 1.41V7a1 1 0 0 1-1 1h-3" stroke="#FF6B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                Support
              </button>
              <button className="verification-menu-item" onClick={() => setShowMenu(false)}>
                <span className="menu-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 9h18M5 9l1-4h12l1 4M10 5v4M14 5v4M4 9l1.34 8h13.32L20 9" stroke="#FF6B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                Shop
              </button>
              <button className="verification-menu-item" onClick={() => setShowMenu(false)}>
                <span className="menu-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 19a8 8 0 1 1 16 0H4Z" stroke="#FF6B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 3a4 4 0 0 1 4 4v2H8V7a4 4 0 0 1 4-4Z" stroke="#FF6B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                Pet Insurance
              </button>
              <button className="verification-menu-item" onClick={() => setShowMenu(false)}>
                <span className="menu-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 22v-5h4v5" stroke="#FF6B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 11l4-7h12l4 7-8 11H10L2 11Z" stroke="#FF6B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                Dog Training
              </button>
              <button className="verification-menu-item" onClick={() => setShowMenu(false)}>
                <span className="menu-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 3h16v18H4z" stroke="#FF6B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 7h8M8 11h8M8 15h5" stroke="#FF6B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                Privacy & Policy
              </button>
              <button className="verification-menu-item" onClick={() => setShowMenu(false)}>
                <span className="menu-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4h16v16H4z" stroke="#FF6B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 8h8M8 12h5" stroke="#FF6B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                Terms & Condition
              </button>
              <button className="verification-menu-item" onClick={() => setShowMenu(false)}>
                <span className="menu-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="m12 17 5 3-1.5-5.5L20 10l-5.6-.4L12 4l-2.4 5.6L4 10l4.5 4.5L7 20l5-3Z" stroke="#FF6B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                Rate Us
              </button>
              <button className="verification-menu-item logout" onClick={() => {
                setShowMenu(false)
                if (onBack) {
                  onBack()
                }
              }}>
                <span className="menu-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="#FF6B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 17l5-5-5-5" stroke="#FF6B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12H9" stroke="#FF6B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                Logout
              </button>
            </div>
          </div>
        )}

        <div className="verification-body">
          <div className="verification-title-section">
            <div className="verification-title-left">
              <h1 className="verification-title">Verification</h1>
              <p className="verification-subtitle">
                To ensure the highest quality of care, we require verification of your identity & credentials
              </p>
            </div>
            <div className="verification-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#FF6B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="#FF6B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="#FF6B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          <div className="personal-info-section">
            <div className="registiee-label">
              Registiee
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="#4A90E2"/>
              </svg>
            </div>

            <div className={`input-field ${errors.name ? 'field-error' : ''}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="8" r="4" stroke="#666" strokeWidth="2"/>
                <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="#666" strokeWidth="2"/>
              </svg>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  clearError('name')
                }}
                className="name-input"
              />
            </div>
            {errors.name && <p className="field-error-text">{errors.name}</p>}

            <div className={`input-field ${errors.email ? 'field-error' : ''}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#666" strokeWidth="2"/>
                <polyline points="22,6 12,13 2,6" stroke="#666" strokeWidth="2"/>
              </svg>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  clearError('email')
                }}
                className="email-input"
              />
            </div>
            {errors.email && <p className="field-error-text">{errors.email}</p>}

            <div className="gender-dropdown-wrapper">
              <button 
                className={`gender-dropdown ${gender ? 'selected' : ''} ${errors.gender ? 'has-error' : ''}`}
                onClick={() => {
                  setShowGenderDropdown(!showGenderDropdown)
                  clearError('gender')
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" className="gender-icon-path" strokeWidth="2"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" className="gender-icon-path" strokeWidth="2"/>
                </svg>
                <span>{gender || 'Gender'}</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 4.5L6 7.5L9 4.5" className="gender-icon-path" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {showGenderDropdown && (
                <div className="gender-dropdown-menu">
                  <button onClick={() => { setGender('Male'); setShowGenderDropdown(false); clearError('gender') }}>Male</button>
                  <button onClick={() => { setGender('Female'); setShowGenderDropdown(false); clearError('gender') }}>Female</button>
                  <button onClick={() => { setGender('Other'); setShowGenderDropdown(false); clearError('gender') }}>Other</button>
                </div>
              )}
            </div>
            {errors.gender && <p className="field-error-text">{errors.gender}</p>}
          </div>

          <div className="profile-upload-card">
            <label htmlFor="profile-upload" className={`profile-upload-label ${errors.profileImage ? 'upload-error' : ''}`}>
              <div className="profile-upload-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="white" strokeWidth="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5" fill="white"/>
                  <polyline points="21 15 16 10 5 21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="profile-upload-content">
                <h3 className="profile-upload-title">Profile Upload Card</h3>
                <p className="profile-upload-subtitle">Upload Your Profile Picture</p>
              </div>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  handleProfileImageChange(e)
                  clearError('profileImage')
                }}
                className="profile-upload-input"
              />
            </label>
            {profileImage && (
              <p className="file-name">{profileImage.name}</p>
            )}
            {errors.profileImage && <p className="field-error-text">{errors.profileImage}</p>}
          </div>

          <div className="documents-section">
            <h2 className="documents-heading">Documents Required</h2>
            <div className="documents-scroll">
              <div className="document-card">
                <label htmlFor="aadhar-upload" className={`document-upload-label ${errors.aadhar ? 'upload-error' : ''}`}>
                  <h3 className="document-title">Aadhar Card</h3>
                  <div className="document-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="4" y="2" width="16" height="20" rx="2" fill="#4A90E2" opacity="0.3"/>
                      <rect x="4" y="6" width="16" height="16" rx="2" fill="#4A90E2" opacity="0.5"/>
                      <line x1="8" y1="10" x2="16" y2="10" stroke="#4A90E2" strokeWidth="2"/>
                      <line x1="8" y1="14" x2="16" y2="14" stroke="#4A90E2" strokeWidth="2"/>
                    </svg>
                  </div>
                  <input
                    id="aadhar-upload"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      handleAadharChange(e)
                      clearError('aadhar')
                    }}
                    className="document-upload-input"
                  />
                </label>
                {aadharFile && (
                  <p className="file-name-small">{aadharFile.name}</p>
                )}
                {errors.aadhar && <p className="field-error-text">{errors.aadhar}</p>}
              </div>

              <div className="document-card">
                <label htmlFor="medical-upload" className={`document-upload-label ${errors.medical ? 'upload-error' : ''}`}>
                  <h3 className="document-title">Medical License</h3>
                  <div className="document-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="4" y="2" width="16" height="20" rx="2" fill="#4A90E2" opacity="0.3"/>
                      <rect x="4" y="6" width="16" height="16" rx="2" fill="#4A90E2" opacity="0.5"/>
                      <line x1="8" y1="10" x2="16" y2="10" stroke="#4A90E2" strokeWidth="2"/>
                      <line x1="8" y1="14" x2="16" y2="14" stroke="#4A90E2" strokeWidth="2"/>
                    </svg>
                  </div>
                  <input
                    id="medical-upload"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      handleMedicalLicenseChange(e)
                      clearError('medical')
                    }}
                    className="document-upload-input"
                  />
                </label>
                {medicalLicenseFile && (
                  <p className="file-name-small">{medicalLicenseFile.name}</p>
                )}
                {errors.medical && <p className="field-error-text">{errors.medical}</p>}
              </div>
            </div>
            <p className="upload-instruction">
              Upload Your Document In Pdf Format
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </p>
          </div>

          <button className="continue-button" onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default Verification

