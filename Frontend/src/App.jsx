import React from 'react';
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import { Routes, Route } from 'react-router-dom';
import NoteFlowDashboard from './Pages/Dashboard';

const App = () => {
  const islogin = "true";

  return (
    <div>
       <Routes>
       {islogin ? (
          <Route path="/*" element={<NoteFlowDashboard />} />
        ) : (
          <Route path="/" element={<Login />} />
        )}
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup />} />
        </Routes>

    </div>
  );
};

export default App;