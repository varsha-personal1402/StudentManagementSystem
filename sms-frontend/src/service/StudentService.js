import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "https://studentmanagementsystem-production-ab75.up.railway.app/api/students",
  withCredentials: true, // important if your backend requires credentials
  headers: {
    "Content-Type": "application/json"
  }
});

class StudentService {
  getAllStudents() { return axiosInstance.get("/").then(res => res.data); }
  getStudentById(id) { return axiosInstance.get(`/${id}`).then(res => res.data); }
  addStudent(student) { return axiosInstance.post("/", student).then(res => res.data); }
  updateStudent(id, student) { return axiosInstance.put(`/${id}`, student).then(res => res.data); }
  deleteStudent(id) { return axiosInstance.delete(`/${id}`).then(res => res.data); }
}

export default new StudentService();
