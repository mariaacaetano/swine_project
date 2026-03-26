import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'

import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import Home from "./pages/Home"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App