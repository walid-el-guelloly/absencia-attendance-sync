
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/auth/Login';
import Dashboard from '../components/dashboard/Dashboard';
import StudentManagement from '../components/students/StudentManagement';
import AbsenceEntry from '../components/absence/AbsenceEntry';
import AbsenceAdmin from '../components/absence/AbsenceAdmin';
import Statistics from '../components/statistics/Statistics';
import About from '../components/about/About';
import Layout from '../components/layout/Layout';

interface User {
  email: string;
  role: 'admin' | 'directeur' | 'surveillant' | 'formateur';
  username?: string;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('absencia_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('absencia_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('absencia_user');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout user={user} onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<Dashboard user={user} />} />
        {(user.role === 'admin' || user.role === 'directeur' || user.role === 'surveillant') && (
          <>
            <Route path="/students" element={<StudentManagement />} />
            <Route path="/absence-admin" element={<AbsenceAdmin />} />
            <Route path="/statistics" element={<Statistics />} />
          </>
        )}
        {user.role === 'formateur' && (
          <Route path="/absence-entry" element={<AbsenceEntry user={user} />} />
        )}
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

export default Index;
