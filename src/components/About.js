import React from 'react';

export default function About() {
  return (
    <div style={{
      minHeight: '50vh',
      padding: '3rem 1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        maxWidth: '800px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        padding: '2rem',
        textAlign: 'center',
      }}>
        <h1 style={{ color: '#0077b6', marginBottom: '1rem' }}>About iNotebook</h1>
        <p style={{ color: '#333', lineHeight: '1.6' }}>
          <strong>iNotebook</strong> is your digital notebook for creating, organizing, and managing notes seamlessly. Built with simplicity and security in mind, it lets you:
        </p>
        <ul style={{ textAlign: 'left', paddingLeft: '1.2rem', color: '#444', marginTop: '1rem' }}>
          <li>📝 Write and manage notes in real-time</li>
          <li>🔐 Keep your data private and secure</li>
          <li>📱 Access notes from any device</li>
          <li>🎯 Use a clean, distraction-free interface</li>
        </ul>
        <p style={{ marginTop: '1.5rem', color: '#555' }}>
          Whether you're a student, professional, or someone who just loves staying organized — iNotebook is your perfect companion.
        </p>
      </div>
    </div>
  );
}
