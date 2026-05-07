import { Link, useLocation } from 'react-router-dom';
import '../styles/navbar.css';

export default function Navbar() {
  const { pathname } = useLocation();
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">📚</span>
          <span>UploadPDF</span>
        </Link>
        <div className="navbar-links">
          <Link to="/" className={pathname === '/' ? 'active' : ''}>Accueil</Link>
          <Link to="/lessons" className={pathname === '/lessons' ? 'active' : ''}>Leçons</Link>
          <Link to="/upload" className={`nav-upload ${pathname === '/upload' ? 'active' : ''}`}>
            + Uploader
          </Link>
        </div>
      </div>
    </nav>
  );
}