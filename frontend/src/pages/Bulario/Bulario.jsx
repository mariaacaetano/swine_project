import { useEffect, useState } from "react"
import "./Bulario.css"

function Bulario() {
  const [busca, setBusca] = useState("")

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
    <main className="bulario">

      <section className="bulario-hero reveal">
        <img src="/pig_logo.png" alt="logo porco" className="bulario-icon" />
        <h1 className="bulario-title">
          Bulário Digital Dedicado<br />a Suínocultura
        </h1>
        <p className="bulario-subtitle">
          Busque medicamentos por nome ou princípio ativo
        </p>
        <div className="bulario-search">
          <input
            type="text"
            placeholder="Busque por um medicamento..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
            <button aria-label="Buscar">
                <img src="/search_icon.png" alt="buscar" />
            </button>
        </div>
      </section>

    </main>
  )
}

export default Bulario