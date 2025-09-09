import axios from 'axios';

// Base URL from environment variable
const BASE_URL = process.env.REACT_APP_BASE_URL;

class StudentService {
  getAllStudents() {
    return axios.get(BASE_URL)
      .then(res => res.data)
      .catch(err => { console.error("Error fetching students:", err); throw err; });
  }

  getStudentById(id) {
    return axios.get(`${BASE_URL}/${id}`)
      .then(res => res.data)
      .catch(err => { console.error(`Error fetching student ${id}:`, err); throw err; });
  }

  addStudent(student) {
    return axios.post(BASE_URL, student)
      .then(res => res.data)
      .catch(err => { console.error("Error adding student:", err); throw err; });
  }

  updateStudent(id, student) {
    return axios.put(`${BASE_URL}/${id}`, student)
      .then(res => res.data)
      .catch(err => { console.error(`Error updating student ${id}:`, err); throw err; });
  }

  deleteStudent(id) {
    return axios.delete(`${BASE_URL}/${id}`)
      .then(res => res.data)
      .catch(err => { console.error(`Error deleting student ${id}:`, err); throw err; });
  }
}

export default new StudentService();
