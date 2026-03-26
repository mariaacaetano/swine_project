import "./Home.css"

function Home() {
  return (
    <main className="home">

      {/* ── TAGLINE ── */}
      <section className="home-tagline">
        Uma solução dedicada à Suinocultura.
      </section>

      {/* ── SOBRE ── */}
      <section className="home-about">
        <img
          src="/about_pig.jpg"
          alt="Suínos no campo"
          className="home-about-img"
        />
        <p className="home-about-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
          non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </section>

      {/* ── SERVIÇOS ── */}
      <section className="home-services">
        <h2>Serviços</h2>
        <div className="services-grid">

          <div className="service-card">
            <img src="/service_bulario.jpg" alt="Bulário" />
            <div className="service-card-body">
              <h3>Bulário dedicado à Suinocultura</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
              <a href="#">Acesse</a>
            </div>
          </div>

          <div className="service-card">
            <img src="/service_calculadora.jpg" alt="Calculadora de Doses" />
            <div className="service-card-body">
              <h3>Calculadora de Doses</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
              <a href="#">Acesse</a>
            </div>
          </div>

          <div className="service-card">
            <img src="/service_diagnostico.jpg" alt="Sistema de Apoio Diagnóstico" />
            <div className="service-card-body">
              <h3>Sistema de Apoio Diagnóstico</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
              <a href="#">Acesse</a>
            </div>
          </div>

        </div>
      </section>

    </main>
  )
}

export default Home
