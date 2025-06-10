
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/hooks/useTheme';
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

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: any) => {
    console.log('Tentative de connexion:', userData);
    
    // Créer directement l'utilisateur avec les données fournies
    const newUser: User = {
      id: userData.email,
      username: userData.username || userData.email.split('@')[0],
      fullName: userData.fullName || userData.username || userData.email.split('@')[0],
      role: userData.role,
      email: userData.email
    };
    
    console.log('Utilisateur créé:', newUser);
    setUser(newUser);
    
    // Sauvegarder dans localStorage pour persister les données
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  if (!user) {
    return (
      <ThemeProvider defaultTheme="dark" storageKey="absenta-ui-theme">
        <Login onLogin={handleLogin} />
        <Toaster />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="absenta-ui-theme">
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
    </ThemeProvider>
  );
}

export default App;
