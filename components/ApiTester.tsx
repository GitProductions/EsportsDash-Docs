"use client";

import { useState } from 'react';

export default function ApiTester({ endpoint, method = "GET", baseUrl = "http://localhost:8080" }) {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);
  
  const styles = {
    container: {
      marginTop: '1rem',
      marginBottom: '1.5rem',
      border: '1px solid #e5e5e5',
      borderRadius: '0.375rem',
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    },
    header: {
      padding: '1rem',
      backgroundColor: '#f9f9f9',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    methodBadge: {
      fontFamily: 'monospace',
      fontSize: '0.875rem',
      backgroundColor: '#e5e5e5',
      padding: '0.25rem 0.5rem',
      borderRadius: '0.25rem',
      marginRight: '0.5rem'
    },
    endpointText: {
      fontFamily: 'monospace',
      fontSize: '0.875rem'
    },
    button: {
      padding: '0.5rem 1rem',
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '0.25rem',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    buttonHover: {
      backgroundColor: '#2563eb'
    },
    buttonDisabled: {
      backgroundColor: '#93c5fd',
      cursor: 'not-allowed'
    },
    responseContainer: {
      borderTop: '1px solid #e5e5e5'
    },
    errorContainer: {
      padding: '1rem',
      backgroundColor: '#fee2e2',
      color: '#dc2626'
    },
    statusHeader: {
      padding: '0.75rem',
      backgroundColor: '#f3f4f6',
      borderBottom: '1px solid #e5e5e5',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    statusIndicator: {
      display: 'inline-block',
      width: '0.75rem',
      height: '0.75rem',
      borderRadius: '9999px',
      marginRight: '0.5rem'
    },
    statusSuccess: {
      backgroundColor: '#22c55e'
    },
    statusError: {
      backgroundColor: '#ef4444'
    },
    statusWarning: {
      backgroundColor: '#eab308'
    },
    statusText: {
      fontFamily: 'monospace',
      fontSize: '0.875rem'
    },
    toggleButton: {
      background: 'none',
      border: 'none',
      fontSize: '0.875rem',
      color: '#6b7280',
      cursor: 'pointer'
    },
    preContainer: {
      fontFamily: 'monospace',
      fontSize: '0.875rem',
      padding: '1rem',
      backgroundColor: '#111827',
      color: '#f9fafb',
      overflow: 'auto',
      maxHeight: '24rem'
    },
    collapsedMessage: {
      padding: '0.75rem',
      textAlign: 'center',
      fontSize: '0.875rem',
      color: '#6b7280'
    }
  };

  const testApi = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch(`${baseUrl}${endpoint}`, { method });
      
      // Try to parse as JSON first, fall back to text
      let data;
      const contentType = res.headers.get("content-type");
      
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        data = await res.text();
      }
      
      setResponse({
        status: res.status,
        statusText: res.statusText,
        data
      });
    } catch (err) {
      setError('Failed to connect. Ensure the server is running on ' + baseUrl);
    } finally {
      setLoading(false);
    }
  };

  const formatResponse = (resp) => {
    if (typeof resp.data === 'object') {
      return JSON.stringify(resp.data, null, 2);
    }
    return resp.data;
  };

  const getStatusIndicatorStyle = (status) => {
    if (status >= 200 && status < 300) {
      return { ...styles.statusIndicator, ...styles.statusSuccess };
    } else if (status >= 400) {
      return { ...styles.statusIndicator, ...styles.statusError };
    } else {
      return { ...styles.statusIndicator, ...styles.statusWarning };
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <span style={styles.methodBadge}>{method}</span>
          <span style={styles.endpointText}>{endpoint}</span>
        </div>
        <button 
          onClick={testApi}
          disabled={loading}
          style={{
            ...styles.button,
            ...(loading ? styles.buttonDisabled : {})
          }}
          onMouseOver={(e) => {
            if (!loading) e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor;
          }}
          onMouseOut={(e) => {
            if (!loading) e.currentTarget.style.backgroundColor = styles.button.backgroundColor;
          }}
        >
          {loading ? 'Testing...' : 'Run Test'}
        </button>
      </div>
      
      {(response || error) && (
        <div style={styles.responseContainer}>
          {error ? (
            <div style={styles.errorContainer}>
              <p style={{ fontWeight: '500', marginTop: 0, marginBottom: '0.5rem' }}>Error</p>
              <p style={{ margin: 0 }}>{error}</p>
            </div>
          ) : (
            <div>
              <div style={styles.statusHeader}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={getStatusIndicatorStyle(response.status)}></span>
                  <span style={styles.statusText}>
                    Status: {response.status} {response.statusText}
                  </span>
                </div>
                <button 
                  onClick={() => setExpanded(!expanded)}
                  style={styles.toggleButton}
                >
                  {expanded ? 'Collapse' : 'Expand'}
                </button>
              </div>
              
              {(expanded || (typeof response.data === 'string' ? response.data.length < 500 : JSON.stringify(response.data).length < 500)) && (
                <div>
                  <pre style={styles.preContainer}>
                    {formatResponse(response)}
                  </pre>
                </div>
              )}
              
              {/* {!expanded && (typeof response.data === 'string' ? response.data.length >= 500 : JSON.stringify(response.data).length >= 500) && (
                <div style={styles.collapsedMessage}>
                  Response is {typeof response.data === 'string' ? response.data.length : JSON.stringify(response.data).length} characters long. Click expand to view.
                </div>
              )} */}
            </div>
          )}
        </div>
      )}
    </div>
  );
}