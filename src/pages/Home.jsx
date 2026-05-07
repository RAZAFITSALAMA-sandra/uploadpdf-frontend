import { Link } from 'react-router-dom';
import '../styles/home.css';

export default function Home() {
  return (
    <div className="home">
      <div className="home-hero">
        <h1 className="home-title">Bibliothèque de Leçons</h1>
        <p className="home-subtitle">
          Accède aux supports de cours de L1, L2 et L3 en PDF.
          Centralise et partage facilement les leçons de ta faculté.
        </p>
        <div className="home-actions">
          <Link to="/lessons" className="btn-primary" style={{textDecoration:'none',padding:'0.75rem 1.8rem',borderRadius:'8px',background:'var(--accent)',color:'white',fontFamily:'var(--font-body)',fontWeight:500}}>
            Voir les leçons
          </Link>
          <Link to="/upload" className="btn-outline">
            Uploader un PDF
          </Link>
        </div>
      </div>
      <div className="home-cards">
        {['L1', 'L2', 'L3'].map((level) => (
          <Link to={`/lessons?level=${level}`} key={level} className="level-card">
            <span className="level-badge">{level}</span>
            <p>Voir les leçons de {level}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}