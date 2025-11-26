import { useState } from 'react'
import './Services.css'
import AccountVerification from './AccountVerification'

function Services({ onBack, onNext, onShowHome, phoneNumber, countryCode }) {
  const [selectedServices, setSelectedServices] = useState([])
  const [showAccountVerification, setShowAccountVerification] = useState(false)
  const [error, setError] = useState('')

  const services = [
    { id: 'grooming', name: 'Pet Grooming', image: '/Service1.png' },
    { id: 'vet', name: 'Vet On Call', image: '/Service2.png' },
    { id: 'walking', name: 'Dog Walking', image: '/Service3.png' },
    { id: 'boarding', name: 'Pet Boarding', image: '/Service4.png' }
  ]

  const toggleService = (serviceId) => {
    setSelectedServices(prev => {
      if (prev.includes(serviceId)) {
        const updated = prev.filter(id => id !== serviceId)
        if (updated.length === 0) {
          setError('Select at least one service to continue')
        }
        return updated
      } else {
        setError('')
        return [...prev, serviceId]
      }
    })
  }

  const handleNext = () => {
    if (selectedServices.length === 0) {
      setError('Select at least one service to continue')
      return
    }
    setShowAccountVerification(true)
  }

  if (showAccountVerification) {
    return (
      <AccountVerification
        onBack={() => setShowAccountVerification(false)}
        onContinue={(accountData) => {
          if (onNext) {
            onNext({
              selectedServices,
              ...accountData
            })
          }
        }}
        onShowHome={(phoneData) => {
          if (onShowHome) {
            onShowHome(phoneData)
          }
        }}
        phoneNumber={phoneNumber}
        countryCode={countryCode}
      />
    )
  }

  return (
    <div className="services-container">
      <div className="services-content">
        <div className="services-header">
          <button className="back-button" onClick={onBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="18" y1="12" x2="6" y2="12" stroke="black" strokeWidth="2" strokeLinecap="round"/>
              <path d="M6 12L12 6M6 12L12 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="services-logo">
            <img src="/petify-logo.png" alt="Petifi Logo" className="logo-icon" />
          </div>
        </div>

        <div className="services-body">
          <h1 className="services-title">Services</h1>

          <div className="services-list">
            {services.map((service) => (
              <div 
                key={service.id} 
                className={`service-card ${selectedServices.includes(service.id) ? 'selected' : ''}`}
                onClick={() => toggleService(service.id)}
              >
                <div className="service-image-wrapper">
                  <img src={service.image} alt={service.name} className="service-image" />
                </div>
                <div className="service-info">
                  <h3 className="service-name">{service.name}</h3>
                  <p className="service-join">Join Now</p>
                </div>
              </div>
            ))}
          </div>

          {error && <p className="services-error-text">{error}</p>}

          <button
            className={`services-next-button ${selectedServices.length === 0 ? 'disabled' : ''}`}
            onClick={handleNext}
            disabled={selectedServices.length === 0}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Services

