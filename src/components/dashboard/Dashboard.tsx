
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ClipboardCheck, AlertTriangle, TrendingUp } from 'lucide-react';
import StatCard from './StatCard';
import AbsenceChart from './AbsenceChart';
import RecentActivity from './RecentActivity';

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Bienvenue, {user.username}
          </h1>
          <p className="text-slate-400">
            Tableau de bord - {user.role === 'formateur' ? 'Saisie des absences' : 'Vue d\'ensemble'}
          </p>
        </div>
        <div className="text-right">
          <p className="text-slate-400 text-sm">Aujourd'hui</p>
          <p className="text-white font-semibold">{new Date().toLocaleDateString('fr-FR')}</p>
        </div>
      </div>

      {/* Stats Cards */}
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

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AbsenceChart data={chartData} />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>

      {/* Quick Actions for Formateur */}
      {user.role === 'formateur' && (
        <Card className="bg-slate-800/50 backdrop-blur-xl border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <ClipboardCheck className="w-5 h-5 text-blue-400" />
              <span>Actions Rapides</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300">
                <div className="text-center">
                  <ClipboardCheck className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <p className="text-white font-medium">Saisir Absences</p>
                  <p className="text-slate-400 text-sm">Séance en cours</p>
                </div>
              </button>
              <button className="p-4 bg-slate-700/50 border border-slate-600 rounded-lg hover:bg-slate-600/50 transition-all duration-300">
                <div className="text-center">
                  <Users className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-300 font-medium">Voir Historique</p>
                  <p className="text-slate-400 text-sm">Mes saisies</p>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
