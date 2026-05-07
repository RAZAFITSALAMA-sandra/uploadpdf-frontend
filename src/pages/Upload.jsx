import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { uploadLesson } from '../api/lessons';
import '../styles/upload.css';

const LEVELS = ['L1', 'L2', 'L3'];
const SEMESTERS = ['S1', 'S2'];
const ACCEPTED = '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx';

export default function Upload() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '', subject: '', level: '', semester: '',
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (f) setFile(f);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return toast.error('Veuillez sélectionner un fichier');
    if (!form.title || !form.subject || !form.level || !form.semester)
      return toast.error('Remplissez tous les champs');

    const confirm = await Swal.fire({
      title: "Confirmer l'upload ?",
      html: `<strong>${form.title}</strong><br>${form.level} — ${form.semester}<br><small>${file.name}</small>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui, uploader',
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#2d5016',
    });
    if (!confirm.isConfirmed) return;

    setLoading(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    fd.append('file', file);

    try {
      await uploadLesson(fd);

      await Swal.fire({
        title: 'Upload réussi !',
        text: 'La leçon a été ajoutée à la bibliothèque.',
        icon: 'success',
        confirmButtonText: 'Voir les leçons',
        confirmButtonColor: '#2d5016',
      });

      // Rediriger vers la page leçons
      navigate('/lessons');

    } catch (err) {
      toast.error(err.response?.data?.message || "Erreur lors de l'upload");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-page">
      <div className="upload-header">
        <h1>Uploader une leçon</h1>
        <p>Formats acceptés : PDF, Word, Excel, PowerPoint</p>
      </div>
      <form className="upload-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Titre de la leçon *</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Ex: Introduction à l'algèbre"
          />
        </div>
        <div className="form-group">
          <label>Matière *</label>
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Ex: Mathématiques"
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Niveau *</label>
            <select name="level" value={form.level} onChange={handleChange}>
              <option value="">-- Choisir --</option>
              {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Semestre *</label>
            <select name="semester" value={form.semester} onChange={handleChange}>
              <option value="">-- Choisir --</option>
              {SEMESTERS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label>Fichier *</label>
          <div
            className="file-zone"
            onClick={() => document.getElementById('fileInput').click()}
          >
            {file ? (
              <div className="file-selected">
                <span className="file-icon">
                  {file.type.includes('pdf') ? '📕' :
                   file.type.includes('word') ? '📘' :
                   file.type.includes('excel') || file.type.includes('sheet') ? '📗' :
                   file.type.includes('ppt') ? '📙' : '📄'}
                </span>
                <span className="file-name">{file.name}</span>
                <span className="file-size">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
            ) : (
              <div className="file-placeholder">
                <span style={{ fontSize: '2rem' }}>📂</span>
                <span>Cliquer pour choisir un fichier</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  PDF, Word, Excel, PowerPoint
                </span>
              </div>
            )}
            <input
              id="fileInput"
              type="file"
              accept={ACCEPTED}
              onChange={handleFile}
              style={{ display: 'none' }}
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn-primary btn-full"
          disabled={loading}
        >
          {loading ? '⏳ Upload en cours...' : '⬆ Uploader la leçon'}
        </button>
      </form>
    </div>
  );
}