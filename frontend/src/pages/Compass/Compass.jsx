import { useEffect } from "react"
import "./Compass.css"

function Compass() {

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible")
        })
      },
      { threshold: 0.15 }
    )
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <main className="compass">

      <section className="compass-hero reveal">
        <img src="/compass_logo.png" alt="Swine Compass" className="compass-icon" />
        <h1 className="compass-title">
          Swine<br />Compass
        </h1>
        <p className="compass-subtitle">
          Sistema Especialista para Apoio Veterinário<br />em Diagnósticos
        </p>
        <div className="compass-buttons">
          <button className="btn-sobre">Sobre</button>
          <button className="btn-comecar">Começar</button>
        </div>
      </section>

    </main>
  )
}

export default Compass