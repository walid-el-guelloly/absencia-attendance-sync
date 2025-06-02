
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, User, TrendingUp } from 'lucide-react';

const StudentsAtRisk = () => {
  // Stagiaires en alerte avec les nouveaux noms
  const studentsAtRisk = [
    {
      id: 1,
      name: 'Fahd Adouch',
      class: 'Dev 101 1ème année',
      absences: 8,
      trend: 'up',
      risk: 'high'
    },
    {
      id: 2,
      name: 'Ferdaouss Etaqi',
      class: 'TSRI 1ère année',
      absences: 6,
      trend: 'up',
      risk: 'medium'
    },
    {
      id: 3,
      name: 'Ayoub Lemguitaa',
      class: 'TDM 1ère année',
      absences: 5,
      trend: 'stable',
      risk: 'medium'
    },
    {
      id: 4,
      name: 'Houssam Bahssi',
      class: 'TMSIR 1ère année',
      absences: 4,
      trend: 'down',
      risk: 'low'
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'medium': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'low': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-red-400" />;
      case 'down': return <TrendingUp className="w-3 h-3 text-green-400 rotate-180" />;
      default: return <div className="w-3 h-3 bg-orange-400 rounded-full" />;
    }
  };

  return (
    <Card className="bg-slate-800/50 backdrop-blur-xl border-blue-500/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-orange-400" />
          <span>Stagiaires en Alerte</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {studentsAtRisk.map((student) => (
            <div key={student.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-slate-300" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{student.name}</p>
                  <p className="text-slate-400 text-xs">{student.class}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs border ${getRiskColor(student.risk)}`}>
                  {student.absences} abs
                </span>
                {getTrendIcon(student.trend)}
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 py-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-200">
          Voir tous les stagiaires à risque →
        </button>
      </CardContent>
    </Card>
  );
};

export default StudentsAtRisk;
