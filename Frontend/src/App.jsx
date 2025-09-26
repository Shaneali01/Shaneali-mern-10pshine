import React from 'react';
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import { Routes, Route } from 'react-router-dom';

const App = () => {
  const islogin = localStorage.getItem("islogin");

  return (
    <div>
       <Routes>
       {islogin ? (
          <Route path="/*" element={<Dashboard />} />
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