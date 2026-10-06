import { Hexagon, Mail, MapPin, Phone, Github, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BRAND_NAME, BRAND_EMAIL } from '../data';

export default function Footer() {
  return (
    <footer className="bg-[#0a0f0d] text-white/70 py-16 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 text-white font-medium mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 shadow-md shadow-emerald-500/25">
                <Hexagon size={15} strokeWidth={2} className="text-white" />
              </span>
              {BRAND_NAME}
            </div>
            <p className="text-sm leading-relaxed text-white/60">
              A founder-led digital engineering studio focused on products that last — performance,
              craft and clear thinking.
            </p>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              {[
                'Web Applications',
                'Mobile Development',
                'SEO & Growth',
                'UI/UX Design',
                'Cloud & DevOps',
                'AI Systems',
              ].map((item) => (
                <li key={item}>
                  <Link to="/services" className="text-white/60 hover:text-emerald-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Home', path: '/' },
                { label: 'Services', path: '/services' },
                { label: 'IT Solutions', path: '/it-solutions' },
                { label: 'Digital Marketing', path: '/digital-marketing' },
                { label: 'Contact', path: '/contact' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.path} className="text-white/60 hover:text-emerald-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Mail size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                <a
                  href={`mailto:${BRAND_EMAIL}`}
                  className="text-white/60 hover:text-emerald-400 transition-colors"
                >
                  {BRAND_EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                <span className="text-white/60">Jaipur · Serving across India</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                <span className="text-white/60">Available on request</span>
              </li>
            </ul>
            <div className="flex items-center gap-3 mt-5">
              {[Github, Linkedin, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-emerald-500/20 hover:text-emerald-400 hover:border-emerald-500/30 transition-colors"
                  aria-label="Social"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>
            © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
          </p>
          <p className="text-emerald-400/80">Built with precision · Jaipur, India</p>
        </div>
      </div>
    </footer>
  );
}