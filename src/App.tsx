
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Login from '@/components/auth/Login';
import Layout from '@/components/layout/Layout';
import Dashboard from '@/components/dashboard/Dashboard';
import StudentManagement from '@/components/students/StudentManagement';
import AbsenceEntry from '@/components/absence/AbsenceEntry';
import AbsenceAdmin from '@/components/absence/AbsenceAdmin';
import Statistics from '@/components/statistics/Statistics';
import About from '@/components/about/About';

interface User {
  id: string;
  username: string;
  fullName: string;
  role: 'admin' | 'directeur' | 'surveillant' | 'formateur';
}

// Mock users with full names
const mockUsers: User[] = [
  { id: '1', username: 'admin', fullName: 'Mohammed Alami', role: 'admin' },
  { id: '2', username: 'directeur', fullName: 'Fatima Benali', role: 'directeur' },
  { id: '3', username: 'surveillant', fullName: 'Youssef Idrissi', role: 'surveillant' },
  { id: '4', username: 'formateur', fullName: 'Aicha Zahra', role: 'formateur' }
];

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (username: string, password: string) => {
    console.log('Tentative de connexion:', { username, password });
    
    // Simple authentication logic
    const foundUser = mockUsers.find(u => u.username === username && password === 'password');
    
    if (foundUser) {
      setUser(foundUser);
      console.log('Connexion réussie pour:', foundUser);
      return true;
    } else {
      console.log('Échec de la connexion');
      return false;
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return (
      <>
        <Login onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  return (
    <Router>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Dashboard user={user} />} />
          <Route 
            path="/students" 
            element={
              ['admin', 'directeur', 'surveillant'].includes(user.role) ? 
              <StudentManagement /> : 
              <Navigate to="/" replace />
            } 
          />
          <Route 
            path="/absence-entry" 
            element={
              user.role === 'formateur' ? 
              <AbsenceEntry user={user} /> : 
              <Navigate to="/" replace />
            } 
          />
          <Route 
            path="/absence-admin" 
            element={
              ['admin', 'directeur', 'surveillant'].includes(user.role) ? 
              <AbsenceAdmin /> : 
              <Navigate to="/" replace />
            } 
          />
          <Route 
            path="/statistics" 
            element={
              ['admin', 'directeur', 'surveillant'].includes(user.role) ? 
              <Statistics /> : 
              <Navigate to="/" replace />
            } 
          />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
      <Toaster />
    </Router>
  );
}

export default App;
