import axios from 'axios';

const API = axios.create({
  baseURL: 'https://uploadpdf-3fdw.onrender.com/api',
});

export const getLessons = (filters) => API.get('/lessons', { params: filters });
export const uploadLesson = (formData) =>
  API.post('/lessons', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const deleteLesson = (id) => API.delete(`/lessons/${id}`);