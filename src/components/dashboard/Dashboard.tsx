
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ClipboardCheck, AlertTriangle, TrendingUp, UserCheck, Clock, BookOpen } from 'lucide-react';
import StatCard from './StatCard';
import AbsenceChart from './AbsenceChart';
import StudentsAtRisk from './StudentsAtRisk';
import CircularStat from './CircularStats';
import ModernDateTime from './ModernDateTime';

interface DashboardProps {
  user: any;
}

const Dashboard = ({ user }: DashboardProps) => {
  const [stats, setStats] = useState({
    totalStudents: 1250,
    presentToday: 1180,
    absentToday: 70,
    alertStudents: 15
  });

  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    // Récupérer le nom complet depuis le localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setDisplayName(userData.fullName || userData.username || user.username);
      } catch (error) {
        console.error('Erreur lors de la lecture des données utilisateur:', error);
        setDisplayName(user.fullName || user.username);
      }
    } else {
      setDisplayName(user.fullName || user.username);
    }
  }, [user]);

  const [chartData] = useState([
    { name: 'Lun', absences: 45, presents: 1205 },
    { name: 'Mar', absences: 52, presents: 1198 },
    { name: 'Mer', absences: 38, presents: 1212 },
    { name: 'Jeu', absences: 70, presents: 1180 },
    { name: 'Ven', absences: 33, presents: 1217 },
    { name: 'Sam', absences: 28, presents: 1222 },
    { name: 'Dim', absences: 15, presents: 1235 }
  ]);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-3">
            Bienvenue, {displayName}
          </h1>
          <p className="text-slate-400 text-lg">
            Tableau de bord - {user.role === 'formateur' ? 'Saisie des absences' : 'Vue d\'ensemble'}
          </p>
        </div>
        <ModernDateTime />
      </div>

      {/* Stats Cards Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-white mb-4">Vue d'ensemble</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Stagiaires"
            value={stats.totalStudents.toLocaleString()}
            icon={Users}
            color="blue"
            trend="+2.5%"
          />
          <StatCard
            title="Présents Aujourd'hui"
            value={stats.presentToday.toLocaleString()}
            icon={ClipboardCheck}
            color="green"
            trend="+1.2%"
          />
          <StatCard
            title="Absents Aujourd'hui"
            value={stats.absentToday.toString()}
            icon={AlertTriangle}
            color="red"
            trend="-0.8%"
          />
          <StatCard
            title="Alertes (+2 abs)"
            value={stats.alertStudents.toString()}
            icon={TrendingUp}
            color="orange"
            trend="+5.2%"
          />
        </div>
      </div>

      {/* Circular Statistics Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-white mb-4">Statistiques en temps réel</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <CircularStat
            title="Taux de présence"
            value={94}
            max={100}
            color="#22c55e"
            icon={<UserCheck className="w-5 h-5 text-green-400" />}
          />
          <CircularStat
            title="Ponctualité"
            value={87}
            max={100}
            color="#3b82f6"
            icon={<Clock className="w-5 h-5 text-blue-400" />}
          />
          <CircularStat
            title="Engagement"
            value={92}
            max={100}
            color="#8b5cf6"
            icon={<BookOpen className="w-5 h-5 text-purple-400" />}
          />
          <CircularStat
            title="Satisfaction"
            value={89}
            max={100}
            color="#f59e0b"
            icon={<TrendingUp className="w-5 h-5 text-orange-400" />}
          />
        </div>
      </div>

      {/* Charts and Activity Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-white mb-4">Analyse et alertes</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AbsenceChart data={chartData} />
          </div>
          <div>
            <StudentsAtRisk />
          </div>
        </div>
      </div>

      {/* Quick Actions for Formateur */}
      {user.role === 'formateur' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white mb-4">Actions rapides</h2>
          <Card className="bg-slate-800/50 backdrop-blur-xl border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <ClipboardCheck className="w-5 h-5 text-blue-400" />
                <span>Gestion des absences</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <button className="p-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 transform hover:scale-105">
                  <div className="text-center">
                    <ClipboardCheck className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                    <p className="text-white font-medium text-lg">Saisir Absences</p>
                    <p className="text-slate-400 text-sm">Séance en cours</p>
                  </div>
                </button>
                <button className="p-6 bg-slate-700/50 border border-slate-600 rounded-xl hover:bg-slate-600/50 transition-all duration-300 transform hover:scale-105">
                  <div className="text-center">
                    <Users className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                    <p className="text-slate-300 font-medium text-lg">Voir Historique</p>
                    <p className="text-slate-400 text-sm">Mes saisies</p>
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
