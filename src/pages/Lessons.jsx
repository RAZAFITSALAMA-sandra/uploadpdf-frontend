import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { getLessons, deleteLesson } from '../api/lessons';
import LessonCard from '../components/LessonCard';
import '../styles/lessons.css';

export default function Lessons() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const level = searchParams.get('level') || '';
  const subject = searchParams.get('subject') || '';

  const fetchLessons = async () => {
    setLoading(true);
    try {
      const { data } = await getLessons({ level, subject });
      setLessons(data);
    } catch {
      toast.error('Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLessons(); }, [level, subject]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Supprimer cette leçon ?',
      text: 'Cette action est irréversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#b83232',
    });
    if (!result.isConfirmed) return;
    try {
      await deleteLesson(id);
      toast.success('Leçon supprimée');
      fetchLessons();
    } catch {
      toast.error('Erreur lors de la suppression');
    }
  };

  return (
    <div className="lessons-page">
      <div className="lessons-header">
        <h1>Leçons disponibles</h1>
        <div className="filters">
          <select value={level} onChange={e => setSearchParams({ level: e.target.value, subject })}>
            <option value="">Tous les niveaux</option>
            {['L1', 'L2', 'L3'].map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <select value={subject ? '' : ''} onChange={e => setSearchParams({ level, subject: e.target.value })}>
            <option value="">Tous les semestres</option>
            <option value="S1">S1</option>
            <option value="S2">S2</option>
          </select>
          <input
            className="filter-search"
            placeholder="🔍 Rechercher une matière..."
            value={subject}
            onChange={e => setSearchParams({ level, subject: e.target.value })}
          />
        </div>
        {!loading && (
          <p className="lessons-count">
            {lessons.length} leçon{lessons.length !== 1 ? 's' : ''} trouvée{lessons.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {loading ? (
        <div className="lessons-loading">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="skeleton-card">
              <div className="skeleton-line" style={{ height: 12, width: '40%' }} />
              <div className="skeleton-line" style={{ height: 18, width: '80%' }} />
              <div className="skeleton-line" style={{ height: 12, width: '55%' }} />
              <div className="skeleton-line" style={{ height: 12, width: '30%' }} />
            </div>
          ))}
        </div>
      ) : lessons.length === 0 ? (
        <div className="lessons-empty">
          <div className="lessons-empty-icon">📭</div>
          <h3>Aucune leçon trouvée</h3>
          <p>Essayez d'autres filtres ou <Link to="/upload" style={{ color: 'var(--accent)' }}>uploadez une leçon</Link></p>
        </div>
      ) : (
        <div className="lessons-grid">
          {lessons.map(l => (
            <LessonCard key={l._id} lesson={l} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}