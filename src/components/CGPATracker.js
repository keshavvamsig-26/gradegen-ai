// components/CGPATracker.js
import { useState, useEffect } from 'react';

export default function CGPATracker() {
  const [semesters, setSemesters] = useState([{ gpa: '', credits: '' }]);
  const [cgpa, setCgpa] = useState(0);

  useEffect(() => {
    let totalCredits = 0;
    let weightedSum = 0;

    semesters.forEach(({ gpa, credits }) => {
      const g = parseFloat(gpa);
      const c = parseInt(credits);
      if (!isNaN(g) && !isNaN(c)) {
        weightedSum += g * c;
        totalCredits += c;
      }
    });

    setCgpa(totalCredits ? (weightedSum / totalCredits).toFixed(2) : 0);
  }, [semesters]);

  const handleChange = (index, key, value) => {
    const updated = [...semesters];
    updated[index][key] = value;
    setSemesters(updated);
  };

  const addSemester = () =>
    setSemesters([...semesters, { gpa: '', credits: '' }]);

  return (
    <div style={{ padding: '1rem' }}>
      <h3>CGPA Tracker</h3>
      {semesters.map((sem, index) => (
        <div key={index} style={{ marginBottom: '1rem' }}>
          <input
            type="number"
            placeholder="GPA"
            value={sem.gpa}
            step="0.1"
            onChange={(e) => handleChange(index, 'gpa', e.target.value)}
          />
          <input
            type="number"
            placeholder="Credits"
            value={sem.credits}
            onChange={(e) => handleChange(index, 'credits', e.target.value)}
            style={{ marginLeft: '0.5rem' }}
          />
        </div>
      ))}
      <button onClick={addSemester}>Add Semester</button>
      <h4>CGPA: {cgpa}</h4>
    </div>
  );
}