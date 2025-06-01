
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'absence',
      message: 'Ahmed Benali - TSDI2 absent',
      time: '10:30',
      status: 'warning',
      icon: AlertCircle
    },
    {
      id: 2,
      type: 'justification',
      message: 'Fatima Zahra - Justificatif validé',
      time: '09:15',
      status: 'success',
      icon: CheckCircle
    },
    {
      id: 3,
      type: 'absence',
      message: 'Mohammed Alami - TDM1 absent (2e fois)',
      time: '08:45',
      status: 'error',
      icon: XCircle
    },
    {
      id: 4,
      type: 'entry',
      message: 'Saisie absences - TSRI1 par M. Bennani',
      time: '08:30',
      status: 'info',
      icon: Clock
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-400 bg-green-500/20';
      case 'error': return 'text-red-400 bg-red-500/20';
      case 'warning': return 'text-orange-400 bg-orange-500/20';
      case 'info': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  return (
    <Card className="bg-slate-800/50 backdrop-blur-xl border-blue-500/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <Clock className="w-5 h-5 text-blue-400" />
          <span>Activité Récente</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors duration-200">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(activity.status)}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium leading-tight">
                    {activity.message}
                  </p>
                  <p className="text-slate-400 text-xs mt-1">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
        <button className="w-full mt-4 py-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-200">
          Voir toute l'activité →
        </button>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
