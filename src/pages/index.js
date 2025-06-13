import { useState } from 'react';
import GPAInput from '../components/GPAInput';
import CGPATracker from '../components/CGPATracker';

export default function Home() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/gradegen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query }),
      });
      const data = await res.json();
      setResponse(data.result || 'No response from API');
    } catch (error) {
      setResponse('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="hero">
        <h1>GradeGen</h1>
        <p>Your GPA & CGPA Tracker with What-If Analysis</p>
        <button className="cta-btn">Try Now</button>
      </header>

      <section className="features">
        <div className="card">
          <h2>GPA Input</h2>
          <GPAInput />
        </div>

        <div className="card">
          <h2>CGPA Tracker</h2>
          <CGPATracker />
        </div>
      </section>

      <section className="ai-helper">
        <h2>Ask GradeGen AI</h2>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., How do I improve my CGPA?"
        />
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Thinking...' : 'Ask'}
        </button>
        <div className="response-box">{response}</div>
      </section>

      <style jsx>{`
        .container {
          padding: 2rem;
          font-family: Arial, sans-serif;
        }
        .hero {
          text-align: center;
           padding: 4rem 2rem;
           background: linear-gradient(135deg, #1e3a8a, #2563eb);
           border-radius: 16px;
           margin-bottom: 3rem;
        }
        .cta-btn {
          margin-top: 1rem;
          padding: 0.5rem 1rem;
          background-color:rgb(226, 185, 0);
          color: white;
          border: none;
          border-radius: 6px;
        }
        .features {
          display: flex;
          justify-content: space-around;
          margin-top: 2rem;
          gap: 1rem;
        }
        .card {
          background-color: #1e293b;
          padding: 2rem;
          border-radius: 16px;
          width: 100%;
          max-width: 500px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        .ai-helper {
          color: #1e3a8a
          margin-top: 2rem;
          text-align: center;
        }
        .ai-helper input {
          padding: 0.5rem;
          width: 60%;
          margin-bottom: 1rem;
          border: 1px solid #ccc;
          border-radius: 6px;
        }
        .ai-helper button {
          padding: 0.5rem 1rem;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 6px;
        }
        .response-box {
          margin-top: 1rem;
          padding: 1rem;
          background: #e6f7ff;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
}
