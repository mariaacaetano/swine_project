import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'

import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'

import Home from "./pages/Home/Home.jsx"
import Login from "./pages/Login/Login.jsx"
import Cadastro from "./pages/Cadastro/Cadastro.jsx"
import Bulario from "./pages/Bulario/Bulario.jsx"
import Compass from "./pages/Compass/Compass.jsx"
import Error404 from "./pages/Erro/Erro404.jsx"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/bulario" element={<Bulario />} />
        <Route path="/compass" element={<Compass />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App