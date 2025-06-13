
// components/GPAInput.js
import { useState, useEffect } from 'react';

export default function GPAInput() {
  const [grades, setGrades] = useState(['']);
  const [gpa, setGpa] = useState(0);

  useEffect(() => {
    const total = grades.reduce((acc, grade) => acc + parseFloat(grade || 0), 0);
    setGpa((grades.length > 0) ? (total / grades.length).toFixed(2) : 0);
  }, [grades]);

  const handleGradeChange = (index, value) => {
    const newGrades = [...grades];
    newGrades[index] = value;
    setGrades(newGrades);
  };

  const addGradeField = () => setGrades([...grades, '']);

  return (
    <div style={{ padding: '1rem' }}>
      <h3>Enter Semester Grades</h3>
      {grades.map((grade, index) => (
        <input
          key={index}
          type="number"
          step="0.1"
          placeholder={`Grade ${index + 1}`}
          value={grade}
          onChange={(e) => handleGradeChange(index, e.target.value)}
          style={{ marginBottom: '0.5rem', display: 'block' }}
        />
      ))}
      <button onClick={addGradeField}>Add Grade</button>
      <h4>GPA: {gpa}</h4>
    </div>
  );
}
