import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { User, Mail, Lock, ShieldCheck } from "lucide-react"
import "./Cadastro.css"

function Cadastro() {
  const [senha, setSenha] = useState("")

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
    <main className="cadastro-page">
      <div className="cadastro-container">

        {/* ── Lado esquerdo: marca ── */}
        <div className="cadastro-brand reveal">
          <img src="/pig_logo.png" alt="Swine DataMed" className="cadastro-logo" />
          <span className="cadastro-brand-name">
            S W I N E<br />D A T A M E D
          </span>
        </div>

        {/* ── Lado direito: formulário ── */}
        <div className="cadastro-form">
          <h1 className="cadastro-title reveal">Cadastro</h1>

          <label className="cadastro-field reveal">
            <User size={16} className="cadastro-field-icon" />
            <input
              type="text"
              placeholder="Digite seu nome"
              className="cadastro-input"
            />
          </label>

          <label className="cadastro-field reveal">
            <Mail size={16} className="cadastro-field-icon" />
            <input
              type="email"
              placeholder="Digite seu e-mail"
              className="cadastro-input"
            />
          </label>

          <label className="cadastro-field reveal">
            <Lock size={16} className="cadastro-field-icon" />
            <input
              type="password"
              placeholder="Digite sua senha"
              className="cadastro-input"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </label>

          <label className="cadastro-field reveal">
            <ShieldCheck size={16} className="cadastro-field-icon" />
            <input
              type="password"
              placeholder="Confirme sua senha"
              className="cadastro-input"
            />
          </label>

          <div className="cadastro-requisitos reveal">
            <p>Sua senha deve conter:</p>
            <ul>
              <li className={/[A-Z]/.test(senha) ? "ok" : ""}>Ao menos uma letra maiúscula</li>
              <li className={/[a-z]/.test(senha) ? "ok" : ""}>Ao menos uma letra minúscula</li>
              <li className={/[0-9]/.test(senha) ? "ok" : ""}>Ao menos um número</li>
              <li className={/[^A-Za-z0-9]/.test(senha) ? "ok" : ""}>Ao menos um caractere especial</li>
              <li>Caracteres permitidos: A-Z·0-9·@$%*#?&+-</li>
              <li className={senha.length >= 8 && senha.length <= 30 ? "ok" : ""}>Entre 8 e 30 caracteres</li>
            </ul>
          </div>

          <button className="cadastro-btn reveal">Cadastrar</button>

          <p className="cadastro-login reveal">
            Já tem uma conta?{" "}
            <Link to="/login">Faça Login.</Link>
          </p>
        </div>

      </div>
    </main>
  )
}

export default Cadastro
