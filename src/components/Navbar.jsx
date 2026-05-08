import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/navbar.css';

export default function Navbar() {
  const { pathname } = useLocation();
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">L</span>
          <span className="brand-text">LeçonEmit</span>
        </Link>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/" className={pathname === '/' ? 'active' : ''} onClick={() => setMenuOpen(false)}>Accueil</Link>
          <Link to="/lessons" className={pathname === '/lessons' ? 'active' : ''} onClick={() => setMenuOpen(false)}>Leçons</Link>
          <Link to="/upload" className={`nav-cta ${pathname === '/upload' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
            + Uploader
          </Link>
        </div>

        <div className="navbar-right">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Changer le thème">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button className="hamburger" onClick={() => setMenuOpen(m => !m)} aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}