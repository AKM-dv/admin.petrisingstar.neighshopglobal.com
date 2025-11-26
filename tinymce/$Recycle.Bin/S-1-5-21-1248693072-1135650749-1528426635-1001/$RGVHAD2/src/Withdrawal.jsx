import { useState } from 'react'
import './Withdrawal.css'
import BottomNavigation from './BottomNavigation'

function Withdrawal({ onBack, activeNavTab, onNavChange }) {
  const [activeNav, setActiveNav] = useState(activeNavTab || 'Withdrawal')

  const transactions = [
    {
      id: 1,
      username: 'Anshika',
      withdrawal: '3000',
      taxId: '15986AuDC',
      taxes: '50 INR'
    },
    {
      id: 2,
      username: 'Anshika',
      withdrawal: '2500',
      taxId: '15986AuDC',
      taxes: '45 INR'
    },
    {
      id: 3,
      username: 'Anshika',
      withdrawal: '4000',
      taxId: '15986AuDC',
      taxes: '60 INR'
    },
    {
      id: 4,
      username: 'Anshika',
      withdrawal: '2000',
      taxId: '15986AuDC',
      taxes: '40 INR'
    },
    {
      id: 5,
      username: 'Anshika',
      withdrawal: '3500',
      taxId: '15986AuDC',
      taxes: '55 INR'
    }
  ]

  const handleNavChange = (tab) => {
    setActiveNav(tab)
    if (onNavChange) {
      onNavChange(tab)
    }
    if (tab === 'Home') {
      onBack()
    }
  }

  return (
    <div className="withdrawal-container">
      <div className="withdrawal-content">
        <div className="withdrawal-header">
          <button className="withdrawal-back-button" onClick={onBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="18" y1="12" x2="6" y2="12" stroke="black" strokeWidth="2" strokeLinecap="round"/>
              <path d="M6 12L12 6M6 12L12 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="withdrawal-title">Withdrawal</h1>
        </div>

        <div className="withdrawal-body">
          <div className="transactions-section">
            <h2 className="transactions-heading">Transactions</h2>
            <div className="transactions-table-container">
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Withdrawal</th>
                    <th>Tax ID</th>
                    <th>Taxes</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <tr key={transaction.id} className={index % 2 === 1 ? 'highlighted-row' : ''}>
                      <td>{transaction.username}</td>
                      <td>{transaction.withdrawal}</td>
                      <td>{transaction.taxId}</td>
                      <td>{transaction.taxes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <BottomNavigation 
          activeTab={activeNav}
          onTabChange={handleNavChange}
        />
      </div>
    </div>
  )
}

export default Withdrawal



