import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Hexagon } from 'lucide-react';
import { navLinks, BRAND_NAME } from '../data';

/**
 * Clean full-width navbar — inspired by modern agency sites (logo left,
 * links center, CTA right) with white + green brand accents.
 */
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-[0_1px_0_rgba(15,23,42,0.04)]'
            : 'bg-white border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 h-[64px] sm:h-[72px] flex items-center justify-between gap-6">
          {/* Logo */}
          <NavLink
            to="/"
            className="flex items-center gap-2.5 text-slate-900 font-semibold text-[17px] tracking-tight shrink-0"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 shadow-sm shadow-emerald-500/25">
              <Hexagon size={15} strokeWidth={2.25} className="text-white" />
            </span>
            <span className="hidden xs:inline sm:inline">{BRAND_NAME}</span>
          </NavLink>

          {/* Center links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 text-[14px] font-medium rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'text-emerald-700 bg-emerald-50'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <NavLink
              to="/contact"
              className="text-[14px] font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Contact
            </NavLink>
            <NavLink
              to="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 text-[14px] font-semibold text-slate-900 rounded-full border border-slate-300 bg-white hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50/50 transition-all duration-200"
            >
              Start Project
            </NavLink>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white px-5 py-4 flex flex-col gap-1 shadow-lg">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-[15px] font-medium ${
                    isActive
                      ? 'text-emerald-700 bg-emerald-50'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 text-center px-4 py-3 rounded-full text-[14px] font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600"
            >
              Start Project
            </NavLink>
          </div>
        )}
      </header>
    </>
  );
}
