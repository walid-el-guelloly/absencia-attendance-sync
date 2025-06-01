
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart3 } from 'lucide-react';

interface AbsenceChartProps {
  data: any[];
}

const AbsenceChart = ({ data }: AbsenceChartProps) => {
  return (
    <Card className="bg-slate-800/50 backdrop-blur-xl border-blue-500/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-blue-400" />
          <span>Évolution des Absences</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorAbsences" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPresents" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #3b82f6',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Area
                type="monotone"
                dataKey="absences"
                stroke="#ef4444"
                fillOpacity={1}
                fill="url(#colorAbsences)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="presents"
                stroke="#22c55e"
                fillOpacity={1}
                fill="url(#colorPresents)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AbsenceChart;
