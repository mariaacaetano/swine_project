import { useState } from "react"
import "./Header.css"

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="header">
      <nav className="navbar">

        <div className="navbar-logo">
          <img src="/pig_logo.png" alt="logo" />
        </div>

        <div className="navbar-items">
          <a href="#">home</a>
          <a href="#">serviços</a>
          <a href="#">sobre nós</a>
        </div>

        <div className="navbar-login">
          <a href="#">Faça seu login</a>
          <div className="user-icon">👤</div>
        </div>

        {/* Botão hamburguer — só aparece no mobile */}
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

      {/* Menu mobile expandido */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <a href="#" onClick={() => setMenuOpen(false)}>home</a>
        <a href="#" onClick={() => setMenuOpen(false)}>serviços</a>
        <a href="#" onClick={() => setMenuOpen(false)}>sobre nós</a>
        <a href="#" onClick={() => setMenuOpen(false)}>Faça seu login</a>
      </div>

      <div className="hero">
        <h1 className="title">SWINE</h1>
        <img className="hero-pig" src="/swine_header.png" alt="porco" />
        <h1 className="title">DATAMED</h1>
      </div>
    </header>
  )
}

export default Header