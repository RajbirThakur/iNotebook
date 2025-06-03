import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import img from './notes-icon.png';

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    });

    const json = await response.json();
    if (json) {
      // Save the authToken and redirect
      localStorage.setItem('token', json);
      navigate('/');
    }
    else {
      // Show alert here
      console.log("Invalid credentials");
    }

    // Setting alert that user have been logged in
    props.showAlert('success', 'You have successfully logged in');
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <div className="info-section">
        <h1><img src={img} alt="" style={{
          height: '40px',
          width: '40px',
          borderRadius: '8px'
        }} /> Welcome to iNotebook</h1>
        <p><strong>Your Cloud-Powered Notebook, Reimagined.</strong></p>
        <ul>
          <li>📝 Jot down your thoughts.</li>
          <li>🔒 Keep them safe and accessible anytime, anywhere.</li>
          <li>🌐 Fast. Secure. Organized.</li>
        </ul>
        <blockquote>{`“Ideas are fleeting—capture them before they are gone.”`}</blockquote>
      </div>

      <div className="login-section">
        <h2>Log in to iNotebook</h2>
        <span>New user ? <span><Link to="/signup" style={{ textDecoration: 'none' }}> Signup</Link></span></span>
        <form onSubmit={handleSubmit} className='my-3' style={{ width: '34vw' }}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={onChange}
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
      <div className="footer">
        <footer className="footer">
          <p>© 2025 <strong>iNotebook</strong>. Crafted with ❤️ by <strong>Rajbir Thakur</strong>.</p>
        </footer>
      </div>
    </div>
  )
}

export default Login;
