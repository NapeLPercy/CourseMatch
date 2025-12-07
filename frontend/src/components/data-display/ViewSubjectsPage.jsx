// ViewSubjectsPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ViewSubjects from "./ViewSubjects";

export default function ViewSubjectsPage() {
  const [studentId, setStudentId] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const USER_KEY = "student";

  //Load the logged-in user from session
  useEffect(() => {
    const userData = sessionStorage.getItem(USER_KEY);

    if (userData) {
      const student = JSON.parse(userData);
      setStudentId(student.studentId);
    }
  }, []);

  //Fetch subjects once we have the studentId
  useEffect(() => {
    if (!studentId) return;

    const fetchSubjects = async () => {
      try {
        console.log("About to view pages");
        const res = await axios.get(
          `http://localhost:5000/api/subjects/${studentId}`
        );
        
        console.log("This is the data",res.data);
        setSubjects(res.data);
      } catch (err) {
        console.error("Error loading subjects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [studentId]);

  if (loading) return <p>Loading student subjects...</p>;

  return <ViewSubjects subjects={subjects} />;
}
