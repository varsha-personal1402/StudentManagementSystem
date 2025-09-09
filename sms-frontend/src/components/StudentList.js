import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_URL || "https://studentmanagementsystem-production-6a5a.up.railway.app/api/students";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/students`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch students");
        return r.json();
      })
      .then((data) => setStudents(data))
      .catch((err) => console.error("Error:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/students/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete student");
      setStudents((s) => s.filter((st) => st.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>All Students</h2>
      {students.length === 0 && <p>No students found.</p>}
      {students.map((s) => (
        <div key={s.id} className="card mb-2">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <strong>{s.name}</strong> (ID: {s.id}) <br />
              <small>{s.email}</small>
            </div>
            <div>
              <button
                className="btn btn-sm btn-info me-2"
                onClick={() => navigate(`/view-student/${s.id}`)}
              >
                View
              </button>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => navigate(`/edit-student/${s.id}`)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(s.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentList;
