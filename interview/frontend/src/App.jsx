import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from '../pages/login';
import Register from '../pages/register';
import Dashboard from '../pages/dashboard';
import Navbar from '../components/navbar';

function AppContent() {
  const location = useLocation();
  const hideNavbar = ['/login', '/register', '/'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-indigo-500/30">
      {!hideNavbar && <Navbar />}
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
