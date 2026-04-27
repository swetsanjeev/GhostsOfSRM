import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AddMemberPage from './pages/AddMemberPage';
import ViewMembersPage from './pages/ViewMembersPage';
import MemberDetailsPage from './pages/MemberDetailsPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddMemberPage />} />
            <Route path="/view" element={<ViewMembersPage />} />
            <Route path="/member/:id" element={<MemberDetailsPage />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>© 2025 Ghosts of SRM · SRM Institute of Science and Technology · 21CSS301T Full Stack Development</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
