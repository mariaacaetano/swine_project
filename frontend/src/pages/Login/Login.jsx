import { useEffect } from "react"
import { Link } from "react-router-dom"
import { Mail, Lock } from "lucide-react"
import "./Login.css"

function Login() {
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
    <main className="login-page">
      <div className="login-container">

        {/* ── Lado esquerdo: marca ── */}
        <div className="login-brand reveal">
          <img src="/pig_logo.png" alt="Swine DataMed" className="login-logo" />
          <span className="login-brand-name">
            S W I N E<br />D A T A M E D
          </span>
        </div>

        {/* ── Lado direito: formulário ── */}
        <div className="login-form">
          <h1 className="login-title reveal">Login</h1>

          <label className="login-field reveal">
            <Mail size={16} className="login-field-icon" />
            <input
              type="email"
              placeholder="Digite seu e-mail"
              className="login-input"
            />
          </label>

          <label className="login-field reveal">
            <Lock size={16} className="login-field-icon" />
            <input
              type="password"
              placeholder="Digite sua senha"
              className="login-input"
            />
          </label>

          <a href="#" className="login-forgot reveal">Esqueceu a senha?</a>

          <button className="login-btn reveal">Entrar</button>

          <p className="login-register reveal">
            Ainda não tem uma conta?{" "}
            <Link to="/cadastro">Cadastre-se.</Link>
          </p>
        </div>

      </div>
    </main>
  )
}

export default Login
