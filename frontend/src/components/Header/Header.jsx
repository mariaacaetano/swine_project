import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Header.css"

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleServicos = (e) => {
    e.preventDefault()
    navigate("/")
    setTimeout(() => {
      document.getElementById("servicos")?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const handleHome = (e) => {
    e.preventDefault()
    navigate("/")
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 100)
  }
  
    const handleLogin = (e) => {
    e.preventDefault()
    navigate("/login")
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 100)
  }

  return (
    <header className="header">
      <nav className="navbar">

        <div className="navbar-logo">
          <img src="/pig_logo.png" alt="logo" />
        </div>

        <div className="navbar-items">
          <a href="/" onClick={handleHome}>home</a>
          <a href="#servicos" onClick={handleServicos}>serviços</a>
          <Link to="/sobre">sobre nós</Link>
        </div>

        <div className="navbar-login">
          <a href="/login" onClick={handleLogin}>Faça seu login</a>
          <img src="/profile_default.jpg" alt="perfil" className="user-icon" />
        </div>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menu"
        >
          <span />
          <span />
          <span />
        </button>

      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <a href="/" onClick={(e) => { handleHome(e); setMenuOpen(false) }}>home</a>
        <a href="#servicos" onClick={(e) => { handleServicos(e); setMenuOpen(false) }}>serviços</a>
        <Link to="/sobre" onClick={() => setMenuOpen(false)}>sobre nós</Link>
        <a href="#" onClick={() => setMenuOpen(false)}>Faça seu login</a>
      </div>

      <div className="hero">
        <h1 className="title">S W I N E</h1>
        <img className="hero-pig" src="/swine_header.png" alt="porco" />
        <h1 className="title">DATAMED</h1>
      </div>
    </header>
  )
}

export default Header