import "./Footer.css"

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* Coluna esquerda — marca */}
        <div className="footer-brand">
          <div className="footer-brand-logo">
            <img src="/pig_logo.png" alt="Swine Datamed logo" />
            <div className="footer-brand-name">
              <span>SWINE</span>
              <span>DATAMED</span>
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Coluna direita — parceiro IF */}
        <div className="footer-partner">
          <div className="footer-partner-logo">
            <img src="/logo_ifc_branco.png" alt="Instituto Federal logo" />
            <div className="footer-partner-info">
              <span>INSTITUTO FEDERAL</span>
              <span>Catarinense — Campus Araquari</span>
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer