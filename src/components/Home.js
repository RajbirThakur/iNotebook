import React, { useEffect } from 'react';
import Notes from './Notes';
import { useNavigate } from 'react-router-dom';

const Home = (props) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  if (!token) {
    // Optionally, show nothing or a loading spinner while redirecting
    return (null);
  }

  return (
    <div>
      <Notes showAlert={props.showAlert}/>
    </div>
  );
};

export default Home;


/* 

Approach to this code:
  if (!token) {
    return null;  // Prevents rendering Notes component while redirecting
  }
  Step 3: If no token, render nothing
  This check is there to safely stop rendering the rest of the component if the user is unauthenticated. Because useEffect works or is implemented only after the first rendering, so in this case if user is not authenticated we render null(safe) and then go to useEffect, hence preventing notes to get displayed

  Prevents showing the Notes component for a brief moment during redirect.

*/
