
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, TrendingUp, Users, AlertTriangle } from 'lucide-react';

const Statistics = () => {
  const weeklyData = [
    { day: 'Lun', absences: 45, presents: 1205, retards: 12 },
    { day: 'Mar', absences: 52, presents: 1198, retards: 8 },
    { day: 'Mer', absences: 38, presents: 1212, retards: 15 },
    { day: 'Jeu', absences: 70, presents: 1180, retards: 20 },
    { day: 'Ven', absences: 33, presents: 1217, retards: 5 }
  ];

  const filiereData = [
    { name: 'TSDI', absences: 85, total: 400, taux: 21.3 },
    { name: 'TSRI', absences: 72, total: 350, taux: 20.6 },
    { name: 'TDM', absences: 28, total: 150, taux: 18.7 },
    { name: 'TMSIR', absences: 35, total: 180, taux: 19.4 }
  ];

  const pieData = [
    { name: 'Présents', value: 1180, color: '#22c55e' },
    { name: 'Absents', value: 70, color: '#ef4444' },
    { name: 'Retards', value: 20, color: '#f59e0b' }
  ];

  const monthlyTrend = [
    { month: 'Jan', taux: 18.2 },
    { month: 'Fév', taux: 19.1 },
    { month: 'Mar', taux: 17.8 },
    { month: 'Avr', taux: 20.3 },
    { month: 'Mai', taux: 19.7 },
    { month: 'Jun', taux: 21.2 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Statistiques</h1>
          <p className="text-slate-400">Analyse des données d'absences et de présence</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select defaultValue="week">
            <SelectTrigger className="w-40 bg-slate-700/50 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="week" className="text-white">Cette semaine</SelectItem>
              <SelectItem value="month" className="text-white">Ce mois</SelectItem>
              <SelectItem value="year" className="text-white">Cette année</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                +2.3%
              </span>
            </div>
            <p className="text-slate-400 text-sm font-medium mb-1">Taux d'absence global</p>
            <p className="text-white text-2xl font-bold">19.8%</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl border-green-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                -1.2%
              </span>
            </div>
            <p className="text-slate-400 text-sm font-medium mb-1">Présence moyenne</p>
            <p className="text-white text-2xl font-bold">80.2%</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 backdrop-blur-xl border-orange-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-400" />
              </div>
              <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">
                +15%
              </span>
            </div>
            <p className="text-slate-400 text-sm font-medium mb-1">Retards hebdo</p>
            <p className="text-white text-2xl font-bold">60</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur-xl border-red-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">
                +8
              </span>
            </div>
            <p className="text-slate-400 text-sm font-medium mb-1">Alertes (+2 abs)</p>
            <p className="text-white text-2xl font-bold">23</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Absences */}
        <div className="lg:col-span-2">
          <Card className="bg-slate-800/50 backdrop-blur-xl border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                <span>Absences par Jour</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="day" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        border: '1px solid #3b82f6',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                    <Bar dataKey="absences" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="retards" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pie Chart */}
        <Card className="bg-slate-800/50 backdrop-blur-xl border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-400" />
              <span>Répartition Aujourd'hui</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #3b82f6',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {pieData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-slate-300 text-sm">{item.name}</span>
                  </div>
                  <span className="text-white font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filiere Comparison and Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Filiere Comparison */}
        <Card className="bg-slate-800/50 backdrop-blur-xl border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              <span>Comparaison par Filière</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filiereData.map((filiere, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">{filiere.name}</span>
                    <span className="text-slate-400 text-sm">{filiere.taux}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${filiere.taux}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>{filiere.absences} absents</span>
                    <span>{filiere.total} total</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trend */}
        <Card className="bg-slate-800/50 backdrop-blur-xl border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <span>Évolution Mensuelle</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #3b82f6',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="taux"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Statistics;
