"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import JsonView from '@uiw/react-json-view';
import { vscodeTheme } from '@uiw/react-json-view/vscode';

export default function APIPlayground({ endpoint, method, parameters = [] }) {
  const [formData, setFormData] = useState({});
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect dark mode
  useEffect(() => {
    // Check if document is available (client-side only)
    if (typeof document !== 'undefined') {
      // Initial check
      setIsDarkMode(document.documentElement.classList.contains('dark'));
      
      // Watch for theme changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'class') {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
          }
        });
      });
      
      observer.observe(document.documentElement, { attributes: true });
      
      return () => observer.disconnect();
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const url = `http://localhost:8080${endpoint}?${new URLSearchParams(formData).toString()}`;
      const res = await axios.get(url);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setResponse(null);
    }
  };

  // Theme-aware styles
  const styles = {
    container: {
      padding: '1.5rem',
      border: `1px solid ${isDarkMode ? '#333' : '#e0e0e0'}`,
      borderRadius: '0.5rem',
      marginBottom: '1.5rem',
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: '600',
      marginBottom: '1rem',
      color: isDarkMode ? '#fff' : '#111',
    },
    card: {
      padding: '1rem',
      backgroundColor: isDarkMode ? '#222' : '#f8f8f8',
      borderRadius: '0.375rem',
      border: `1px solid ${isDarkMode ? '#444' : '#ddd'}`,
    },
    cardTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      marginBottom: '0.75rem',
      color: isDarkMode ? '#fff' : '#111',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    formGroup: {
      marginBottom: '1rem',
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: '500',
      color: isDarkMode ? '#eee' : '#333',
    },
    input: {
      width: '100%',
      padding: '0.5rem',
      border: `1px solid ${isDarkMode ? '#555' : '#ccc'}`,
      borderRadius: '0.25rem',
      backgroundColor: isDarkMode ? '#333' : '#fff',
      color: isDarkMode ? '#fff' : '#333',
    },
    button: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.5rem 1rem',
      backgroundColor: '#0070f3',
      color: 'white',
      borderRadius: '0.25rem',
      fontWeight: '500',
      cursor: 'pointer',
      border: 'none',
      marginTop: '0.5rem',
    },
    responseSection: {
      marginTop: '1.5rem',
    },
    responseTitle: {
      fontSize: '1rem',
      fontWeight: '600',
      marginBottom: '0.5rem',
      color: isDarkMode ? '#eee' : '#333',
    },
    error: {
      padding: '0.75rem',
      backgroundColor: isDarkMode ? '#3a1212' : '#FEE2E2',
      color: isDarkMode ? '#f88' : '#B91C1C',
      borderRadius: '0.375rem',
      marginTop: '1rem',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>API Playground</div>

      <div style={styles.card}>
        <div style={styles.cardTitle}>
          {endpoint} ({method})
        </div>
        <div style={styles.form}>
          {parameters.map((param) => (
            <div key={param.name} style={styles.formGroup}>
              <label style={styles.label}>
                {param.name} {param.required && <span style={{ color: '#ff4040' }}>*</span>}
              </label>
              <input
                style={styles.input}
                type="text"
                name={param.name}
                placeholder={param.description}
                onChange={handleInputChange}
              />
            </div>
          ))}
          <button style={styles.button} onClick={handleSubmit}>
            Try it out
          </button>
        </div>
        
        {response && (
          <div style={styles.responseSection}>
            <div style={styles.responseTitle}>Response</div>
            <JsonView
              value={response}
              style={vscodeTheme}
              collapsed={1}
              shortenTextAfterLength={50}
              displayDataTypes={false}
            />
          </div>
        )}
        
        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
}