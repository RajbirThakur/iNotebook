import './App.css';
import About from './components/About';
import NoteState from './components/context/notes/NoteState';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Alert from './components/Alert';
import { useState } from 'react';

//NoteState is used here to wrap every component in app.js in it so that contextAPI could be used for every component
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (typ, msg)=>{
    setAlert({
      type: typ,
      message: msg
    });
  }
  setTimeout(() => {
    setAlert(null);
  }, 4000);
  return (
    <>
      <NoteState>
        <Router>
          <Navbar showAlert={showAlert} />
          <Alert alert={alert} />
          <div className="container my-2">
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert} />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login showAlert={showAlert} />} />
              <Route path="/signup" element={<Signup showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
