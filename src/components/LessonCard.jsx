import '../styles/lessoncard.css';

const getFileInfo = (fileType) => {
  if (!fileType) return { icon: '📄', label: 'Fichier' };
  if (fileType.includes('pdf')) return { icon: '📕', label: 'PDF' };
  if (fileType.includes('word') || fileType.includes('doc')) return { icon: '📘', label: 'Word' };
  if (fileType.includes('excel') || fileType.includes('sheet')) return { icon: '📗', label: 'Excel' };
  if (fileType.includes('presentation') || fileType.includes('ppt')) return { icon: '📙', label: 'PPT' };
  return { icon: '📄', label: 'Fichier' };
};

export default function LessonCard({ lesson, onDelete }) {
  const date = new Date(lesson.createdAt).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'short', year: 'numeric'
  });
  const { icon, label } = getFileInfo(lesson.fileType);

  const viewUrl = lesson.fileUrl
    ? lesson.fileUrl.replace('/fl_attachment/', '/')
    : '#';

  const downloadUrl = lesson.fileUrl || '#';

  return (
    <div className="lesson-card">
      <div className="card-top">
        <span className="card-level">{lesson.level}</span>
        {lesson.semester && <span className="card-semester">{lesson.semester}</span>}
        <span className="card-filetype">{icon} {label}</span>
      </div>
      <h3 className="card-title">{lesson.title}</h3>
      <p className="card-subject">{lesson.subject}</p>
      {lesson.fileName && (
        <p className="card-filename">📎 {lesson.fileName}</p>
      )}
      <p className="card-date">🗓 {date}</p>
      <div className="card-actions">
        <a href={viewUrl} target="_blank" rel="noreferrer" className="btn-view">
          👁 Voir
        </a>
        <a href={downloadUrl} target="_blank" rel="noreferrer" className="btn-download">
          ⬇ Télécharger
        </a>
        <button className="btn-danger" onClick={() => onDelete(lesson._id)}>
          🗑
        </button>
      </div>
    </div>
  );
}