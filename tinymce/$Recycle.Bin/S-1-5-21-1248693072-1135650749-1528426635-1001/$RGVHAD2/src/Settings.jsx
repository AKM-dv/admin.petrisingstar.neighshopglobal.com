import './Settings.css'

function Settings({ onBack }) {
  return (
    <div className="settings-container">
      <div className="settings-content">
        <header className="settings-header">
          <button className="settings-back-button" onClick={onBack} aria-label="Close settings">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="18" y1="12" x2="6" y2="12" stroke="black" strokeWidth="2" strokeLinecap="round" />
              <path d="M6 12L12 6M6 12L12 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="settings-title">Settings</h1>
        </header>

        <div className="settings-body">
          <section className="settings-section">
            <h2 className="settings-section-title">Profile</h2>
            <div className="settings-item">
              <span className="settings-item-label">Edit personal details</span>
              <button className="settings-secondary-button" type="button">Manage</button>
            </div>
            <div className="settings-item">
              <span className="settings-item-label">Notification preferences</span>
              <label className="settings-switch">
                <input type="checkbox" defaultChecked />
                <span className="settings-slider" />
              </label>
            </div>
          </section>

          <section className="settings-section">
            <h2 className="settings-section-title">Security</h2>
            <div className="settings-item">
              <span className="settings-item-label">Change password</span>
              <button className="settings-secondary-button" type="button">Update</button>
            </div>
            <div className="settings-item">
              <span className="settings-item-label">Two-factor authentication</span>
              <label className="settings-switch">
                <input type="checkbox" />
                <span className="settings-slider" />
              </label>
            </div>
          </section>

          <section className="settings-section">
            <h2 className="settings-section-title">Support</h2>
            <button className="settings-action-button" type="button">Help & Support</button>
            <button className="settings-action-button" type="button">Privacy Policy</button>
            <button className="settings-action-button" type="button">Terms & Conditions</button>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Settings

