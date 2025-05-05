import React, { useState } from 'react';
import './App.css';

function App() {
  const [code, setCode] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch('http://localhost:5003/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });

    const data = await res.json();
    setResponse(data.answer || 'No response');
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>DSA Code Analyzer</h1>
      <textarea
        placeholder="Paste your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>
      {response && <div className="result">{response}</div>}
    </div>
  );
}

export default App;
