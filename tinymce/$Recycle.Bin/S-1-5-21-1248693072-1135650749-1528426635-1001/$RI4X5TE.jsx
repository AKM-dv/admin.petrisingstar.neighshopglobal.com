import './BookingConfirmation.css'

function BookingConfirmation({ onBack, onNavigateHome }) {
  return (
    <div className="booking-confirmation-container">
      <div className="booking-confirmation-content">
        <div className="booking-confirmation-header">
          <button className="back-button" onClick={onBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 12H6M6 12L12 6M6 12L12 18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="booking-confirmation-title">Booking</h1>
        </div>

        <div className="confirmation-card">
          <div className="checkmark-icon">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="38" stroke="#4CAF50" strokeWidth="4"/>
              <path d="M25 40L35 50L55 30" stroke="#4CAF50" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="confirmation-title"> YourBooking is Confirmed</h2>
        </div>
      </div>
    </div>
  )
}

export default BookingConfirmation
