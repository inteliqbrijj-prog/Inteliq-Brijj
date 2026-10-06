import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Process from './pages/Process';
import Work from './pages/Work';
import Insights from './pages/Insights';
import ITSolutions from './pages/ITSolutions';
import DigitalMarketing from './pages/DigitalMarketing';
import Industries from './pages/Industries';
import Contact from './pages/Contact';

export default function App() {
  useEffect(() => {
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
        raf = 0;
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#fbfcfb]">
      <div className="grain-overlay" aria-hidden="true" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/it-solutions" element={<ITSolutions />} />
        <Route path="/digital-marketing" element={<DigitalMarketing />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/process" element={<Process />} />
        <Route path="/work" element={<Work />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}
