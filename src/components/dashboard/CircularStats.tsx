
import { Card, CardContent } from '@/components/ui/card';

interface CircularStatProps {
  title: string;
  value: number;
  max: number;
  color: string;
  icon: React.ReactNode;
  suffix?: string;
}

const CircularStat = ({ title, value, max, color, icon, suffix = '%' }: CircularStatProps) => {
  const percentage = (value / max) * 100;
  const strokeDasharray = 2 * Math.PI * 40;
  const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100;

  return (
    <Card className="bg-slate-800/50 backdrop-blur-xl border-blue-500/20 p-6">
      <CardContent className="p-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {icon}
            <h3 className="text-white font-medium text-sm">{title}</h3>
          </div>
        </div>
        
        <div className="relative flex items-center justify-center">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-slate-700"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke={color}
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-in-out"
            />
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {value}{suffix}
            </span>
            <span className="text-xs text-slate-400">
              sur {max}{suffix}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CircularStat;
