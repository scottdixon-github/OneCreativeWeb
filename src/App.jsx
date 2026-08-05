import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import MindMap from './components/MindMap.jsx'
import Cat from './components/Cat.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Home from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import ServiceDetail from './pages/ServiceDetail.jsx'
import Portfolio from './pages/Portfolio.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'

export default function App() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      {isHome && <MindMap />}
      {isHome && <Cat />}
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
