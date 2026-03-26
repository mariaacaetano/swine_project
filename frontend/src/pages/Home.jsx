import { useEffect } from "react"
import { Link } from "react-router-dom"
import "./Home.css"

function Home() {

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.15 }
    )

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <main className="home">

      <section className="home-tagline reveal">
        Uma solução dedicada à Suinocultura.
      </section>

      <section className="home-about reveal">
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

      <section className="home-services reveal" id="servicos">
        <h2>Serviços</h2>
        <div className="services-grid">

          <div className="service-card reveal">
            <img src="/service_bulario.jpg" alt="Bulário" />
            <div className="service-card-body">
              <h3>Bulário dedicado à Suinocultura</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <Link to="/bulario">Acesse</Link>
            </div>
          </div>

          <div className="service-card reveal">
            <img src="/service_calculadora.jpg" alt="Calculadora de Doses" />
            <div className="service-card-body">
              <h3>Calculadora de Doses</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <a href="#">Acesse</a>
            </div>
          </div>

          <div className="service-card reveal">
            <img src="/service_diagnostico.jpg" alt="Sistema de Apoio Diagnóstico" />
            <div className="service-card-body">
              <h3>Sistema de Apoio Diagnóstico</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <Link to="/compass">Acesse</Link>
            </div>
          </div>

        </div>
      </section>

    </main>
  )
}

export default Home