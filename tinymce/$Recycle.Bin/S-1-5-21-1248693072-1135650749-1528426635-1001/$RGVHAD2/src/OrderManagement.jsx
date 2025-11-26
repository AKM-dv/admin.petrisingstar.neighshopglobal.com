import { useState } from 'react'
import './OrderManagement.css'
import BottomNavigation from './BottomNavigation'

const ORDER_TABS = ['Current', 'Pending', 'Completed']

const CUSTOMERS = [
  {
    id: 1,
    name: 'Riya Malhotra',
    service: 'Pet Grooming',
    amount: '₹450',
    address: 'Green Park, New Delhi',
    petName: 'Bruno',
    appointment: 'Today • 10:30 AM',
    status: 'Current',
    nameClass: 'current-name'
  },
  {
    id: 2,
    name: 'Aarav Sharma',
    service: 'Vet Consultation',
    amount: '₹650',
    address: 'Sector 21, Gurugram',
    petName: 'Simba',
    appointment: 'Today • 01:00 PM',
    status: 'Current',
    nameClass: 'current-name'
  },
  {
    id: 3,
    name: 'Kavya Patel',
    service: 'Dog Walking',
    amount: '₹300',
    address: 'Prahlad Nagar, Ahmedabad',
    petName: 'Snow',
    appointment: 'Tomorrow • 07:00 AM',
    status: 'Pending',
    nameClass: 'previous-green'
  },
  {
    id: 4,
    name: 'Anshika Jain',
    service: 'Nursing Assistance',
    amount: '₹520',
    address: 'Civil Lines, Sonipat',
    petName: 'Oreo',
    appointment: 'Yesterday • 05:30 PM',
    status: 'Completed',
    nameClass: 'previous-red'
  }
]

function OrderManagement({ onBack, activeNavTab, onNavChange }) {
  const [activeNav, setActiveNav] = useState(activeNavTab || 'Orders')
  const [activeTab, setActiveTab] = useState('Current')
  const [expandedCustomer, setExpandedCustomer] = useState(null)

  const handleNavChange = (tab) => {
    setActiveNav(tab)
    onNavChange?.(tab)
    if (tab === 'Home') {
      onBack?.()
    }
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setExpandedCustomer(null)
  }

  const handleDropdownClick = (customerId) => {
    setExpandedCustomer((prev) => (prev === customerId ? null : customerId))
  }

  const visibleCustomers = CUSTOMERS.filter((customer) =>
    activeTab === 'Current' ? customer.status === 'Current' :
    activeTab === 'Pending' ? customer.status === 'Pending' :
    customer.status === 'Completed'
  )

  return (
    <div className="order-management-container">
      <div className="order-management-content">
        <div className="order-management-content-with-nav">
          <header className="order-management-header">
            <button className="order-management-back-button" onClick={onBack} aria-label="Go back">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="18" y1="12" x2="6" y2="12" stroke="black" strokeWidth="2" strokeLinecap="round" />
                <path d="M6 12L12 6M6 12L12 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="order-management-logo-section">
              <img src="/petify-logo.png" alt="Petifi Logo" className="order-management-logo-icon" />
            </div>

            <button className="order-management-profile-button" aria-label="Notifications">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2C6.68629 2 4 4.68629 4 8V11.382L2.44721 12.8944C1.77124 13.5521 2.23926 14.6667 3.17157 14.6667H16.8284C17.7607 14.6667 18.2288 13.5521 17.5528 12.8944L16 11.382V8C16 4.68629 13.3137 2 10 2Z" stroke="#1F1F1F" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 16H12" stroke="#1F1F1F" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </header>

          <div className="order-management-title-section">
            <h1 className="order-management-title">Order Management</h1>
          </div>

          <div className="order-management-tabs">
            {ORDER_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                className={`order-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => handleTabChange(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="order-management-body">
            <h2 className="customers-heading">Customers</h2>
            <div className="customers-list">
              {visibleCustomers.map((customer) => {
                const isExpanded = expandedCustomer === customer.id
                return (
                  <div key={customer.id} className={`customer-card ${customer.status === 'Current' ? 'current-order' : ''}`}>
                    <div className="customer-profile">
                      <div className="customer-avatar-placeholder">
                        <span>{customer.name.charAt(0)}</span>
                      </div>
                    </div>

                    <div className="customer-info">
                      <h3 className={`customer-name ${customer.nameClass || ''}`}>{customer.name}</h3>
                      <p className="customer-service">{customer.service}</p>
                      <p className="customer-service">{customer.address}</p>
                    </div>

                    <div className="customer-amount">
                      <span className="amount-value">{customer.amount}</span>
                    </div>

                    <button
                      className="customer-dropdown"
                      onClick={() => handleDropdownClick(customer.id)}
                      aria-expanded={isExpanded}
                      aria-label={isExpanded ? 'Hide details' : 'Show details'}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 6L8 10L12 6" stroke="#1F1F1F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    {isExpanded && (
                      <div className="customer-detail-card">
                        <div className="detail-profile-section">
                          <div className="detail-avatar-placeholder">
                            <span>{customer.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="detail-customer-name">{customer.name}</p>
                            <p className="customer-service">{customer.petName} • {customer.service}</p>
                          </div>
                        </div>

                        <div className="detail-info-section">
                          <div className="detail-row">
                            <span className="detail-label">Appointment</span>
                            <span className="detail-value">{customer.appointment}</span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">Address</span>
                            <span className="detail-value">{customer.address}</span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">Service Fee</span>
                            <span className="detail-value">{customer.amount}</span>
                          </div>
                        </div>

                        <div className="detail-actions">
                          <button className="close-button" type="button" onClick={() => setExpandedCustomer(null)}>
                            Close
                          </button>
                          <button className="mark-complete-button" type="button">
                            Mark Complete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <BottomNavigation activeTab={activeNav} onTabChange={handleNavChange} />
      </div>
    </div>
  )
}

export default OrderManagement

