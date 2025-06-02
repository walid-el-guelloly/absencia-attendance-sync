
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
  email: string;
}

// Mock users avec noms complets
const mockUsers: User[] = [
  { id: '1', username: 'admin', fullName: 'Mohammed Alami', role: 'admin', email: 'admin@cfm.ofppt.ma' },
  { id: '2', username: 'directeur', fullName: 'Fatima Benali', role: 'directeur', email: 'directeur@cfm.ofppt.ma' },
  { id: '3', username: 'surveillant', fullName: 'Youssef Idrissi', role: 'surveillant', email: 'surveillant@cfm.ofppt.ma' },
  { id: '4', username: 'formateur', fullName: 'Aicha Zahra', role: 'formateur', email: 'formateur@cfm.ofppt.ma' }
];

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: any) => {
    console.log('Tentative de connexion:', userData);
    
    // Trouver l'utilisateur correspondant basé sur l'email et le rôle
    const foundUser = mockUsers.find(u => 
      u.email === userData.email && u.role === userData.role
    );
    
    if (foundUser) {
      // Utiliser le username fourni ou celui par défaut
      const userWithUsername = {
        ...foundUser,
        username: userData.username || foundUser.username
      };
      setUser(userWithUsername);
      console.log('Connexion réussie pour:', userWithUsername);
    } else {
      console.log('Échec de la connexion');
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
