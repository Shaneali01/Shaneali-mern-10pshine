import React from 'react';
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import { Routes, Route } from 'react-router-dom';
import NoteFlowDashboard from './Pages/Dashboard';
import NoteEditor from './Pages/NoteEditor';
import ProfilePage from './Pages/Profile';

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
          <Route path="/editor" element={<NoteEditor />} />
          <Route path="/profile" element={<ProfilePage />} />


        </Routes>

    </div>
  );
};

export default App;