import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import "./Home.css"

function Home() {
  const aboutImgRef = useRef(null)

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
    if (aboutImgRef.current) observer.observe(aboutImgRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <main className="home">

      <section className="home-tagline reveal">
        Uma solução dedicada à Suinocultura.
      </section>

      <section className="home-about reveal">
        <img
          ref={aboutImgRef}
          src="/about_pig.jpg"
          alt="Suínos no campo"
          className="home-about-img"
        />
        <p className="home-about-text">
          O Swine DataMed é um sistema especialista desenvolvido para auxiliar produtores e
          profissionais da suinocultura na identificação de doenças e na recomendação de tratamentos
          adequados. Integrando um bulário digital de medicamentos veterinários com uma base de conhecimento
          estruturada, o sistema analisa sintomas informados pelo usuário e sugere possíveis diagnósticos,
          além de indicar medicamentos recomendados, posologia e orientações de uso.
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