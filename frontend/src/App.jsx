import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'

import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'

import Home from "./pages/Home"
import Bulario from "./pages/Bulario/Bulario.jsx"
import Compass from "./pages/Compass/Compass.jsx"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bulario" element={<Bulario />} />
        <Route path="/compass" element={<Compass />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App