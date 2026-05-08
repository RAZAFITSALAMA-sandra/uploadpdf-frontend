import { Link } from 'react-router-dom';
import '../styles/home.css';

export default function Home() {
  return (
    <div className="home">
      <div className="home-hero">
        <span className="hero-eyebrow">📚 Bibliothèque universitaire</span>
        <h1 className="home-title">
          Vos leçons,<br />
          <span>toujours à portée</span>
        </h1>
        <p className="home-subtitle">
          Accédez et partagez les supports de cours de L1, L2 et L3 en PDF, Word, Excel et PowerPoint.
        </p>
        <div className="home-actions">
          <Link to="/lessons" className="btn-hero btn-hero-primary">
            Voir les leçons →
          </Link>
          <Link to="/upload" className="btn-hero btn-hero-secondary">
            + Uploader un fichier
          </Link>
        </div>
      </div>

      <hr className="home-divider" />

      <h2 className="home-levels-title">Parcourir par niveau</h2>
      <div className="home-cards">
        {[
          { level: 'L1', label: 'Licence 1', desc: 'Première année' },
          { level: 'L2', label: 'Licence 2', desc: 'Deuxième année' },
          { level: 'L3', label: 'Licence 3', desc: 'Troisième année' },
        ].map(({ level, label, desc }) => (
          <Link to={`/lessons?level=${level}`} key={level} className="level-card">
            <span className="level-number">{level}</span>
            <span className="level-label">{label}</span>
            <span className="level-desc">{desc}</span>
            <span className="level-arrow">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}