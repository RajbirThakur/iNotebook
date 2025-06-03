import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: credentials.username,
        email: credentials.email,
        password: credentials.password
      })
    });

    const json = await response.json();
    if (json) {
      // Save the authToken and redirect
      localStorage.setItem('token', json);
      navigate('/');

      // Question/Query : While signup why do we need to save the authtoken or even create one, I mean that should only be done during signin, what's the point doing it here
      // Solution : In most of the modern app's like instagram/facebook after the signup the user gets automatically logged in instead of asking him to fill the form again for log in, that's why

    }
    else {
      // Show alert here
      console.log("Invalid credentials");
    }

    // Setting alert that user have been signed up
    props.showAlert('success', 'Your account have been created');
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  return (
    <div>
      <div>
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit} className='my-3'>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              onChange={onChange}
            />
          </div>
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
    </div>
  )
}

export default Signup
