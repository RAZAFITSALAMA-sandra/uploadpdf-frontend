import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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

  const fetch = async () => {
    setLoading(true);
    try {
      const { data } = await getLessons({ level, subject });
      setLessons(data);
    } catch { toast.error('Erreur de chargement'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, [level, subject]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Supprimer cette leçon ?',
      text: 'Cette action est irréversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#c0392b',
    });
    if (!result.isConfirmed) return;
    try {
      await deleteLesson(id);
      toast.success('Leçon supprimée');
      fetch();
    } catch { toast.error('Erreur lors de la suppression'); }
  };

  return (
    <div className="lessons-page">
      <div className="lessons-header">
        <h1>Leçons disponibles</h1>
        <div className="filters">
          <select value={level} onChange={e => setSearchParams({ level: e.target.value, subject })}>
            <option value="">Tous les niveaux</option>
            {['L1','L2','L3'].map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <input
            placeholder="Filtrer par matière..."
            value={subject}
            onChange={e => setSearchParams({ level, subject: e.target.value })}
            style={{ width: '200px' }}
          />
        </div>
      </div>
      {loading ? (
        <p className="lessons-status">Chargement...</p>
      ) : lessons.length === 0 ? (
        <p className="lessons-status">Aucune leçon trouvée.</p>
      ) : (
        <div className="lessons-grid">
          {lessons.map(l => <LessonCard key={l._id} lesson={l} onDelete={handleDelete} />)}
        </div>
      )}
    </div>
  );
}