import './App.css'

function App() {
  return (
    <div className="landing-page">
      <header className="header">
        <div className="logo-container">
          <img src="/login-image.png" alt="Petifi Logo" className="logo" />
          <span className="app-name">Petifi</span>
        </div>
      </header>

      <main className="main-content">
        <div className="illustration-container">
          <div className="illustration-background">
            <img src="/login-image.png" alt="Person with dog" className="illustration" />
          </div>
        </div>

        <div className="text-content">
          <h1 className="main-heading">Pet Grooming - Vet On Call - Dog Walking</h1>
          <p className="tagline">We Connect Pet Parents With People Who'll Treat Their Pets Like Family</p>
        </div>
      </main>

      <div className="buttons-container">
        <button className="btn btn-login">Login</button>
        <button className="btn btn-register">Register</button>
      </div>
    </div>
  )
}

export default App
