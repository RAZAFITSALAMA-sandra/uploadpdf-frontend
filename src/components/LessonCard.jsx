import '../styles/lessoncard.css';

const getFileIcon = (fileType) => {
  if (!fileType) return '📄';
  if (fileType.includes('pdf')) return '📕';
  if (fileType.includes('word') || fileType.includes('doc')) return '📘';
  if (fileType.includes('excel') || fileType.includes('sheet')) return '📗';
  if (fileType.includes('presentation') || fileType.includes('ppt')) return '📙';
  return '📄';
};

const getFileLabel = (fileType) => {
  if (!fileType) return 'Fichier';
  if (fileType.includes('pdf')) return 'PDF';
  if (fileType.includes('word') || fileType.includes('doc')) return 'Word';
  if (fileType.includes('excel') || fileType.includes('sheet')) return 'Excel';
  if (fileType.includes('presentation') || fileType.includes('ppt')) return 'PowerPoint';
  return 'Fichier';
};

export default function LessonCard({ lesson, onDelete }) {
  const date = new Date(lesson.createdAt).toLocaleDateString('fr-FR');
  const icon = getFileIcon(lesson.fileType);
  const label = getFileLabel(lesson.fileType);

  const viewUrl = lesson.fileUrl
    ? lesson.fileUrl.replace('/fl_attachment/', '/')
    : '#';

  const downloadUrl = lesson.fileUrl || '#';

  return (
    <div className="lesson-card">
      <div className="card-top">
        <span className="card-level">{lesson.level}</span>
        <span className="card-semester">{lesson.semester}</span>
        <span className="card-filetype">{icon} {label}</span>
      </div>
      <h3 className="card-title">{lesson.title}</h3>
      <p className="card-subject">{lesson.subject}</p>
      {lesson.fileName && (
        <p className="card-filename">📎 {lesson.fileName}</p>
      )}
      <p className="card-date">{date}</p>
      <div className="card-actions">
        <a href={viewUrl} target="_blank" rel="noreferrer" className="btn-view">
          👁 Voir
        </a>
        <a href={downloadUrl} target="_blank" rel="noreferrer" className="btn-download">
          ⬇ Télécharger
        </a>
        <button className="btn-danger" onClick={() => onDelete(lesson._id)}>
          Supprimer
        </button>
      </div>
    </div>
  );
}