
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'red' | 'orange';
  trend?: string;
}

const StatCard = ({ title, value, icon: Icon, color, trend }: StatCardProps) => {
  const colorClasses = {
    blue: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400',
    green: 'from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-400',
    red: 'from-red-500/20 to-pink-500/20 border-red-500/30 text-red-400',
    orange: 'from-orange-500/20 to-yellow-500/20 border-orange-500/30 text-orange-400'
  };

  return (
    <Card className={cn(
      "bg-gradient-to-br backdrop-blur-xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-xl",
      colorClasses[color]
    )}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center",
            color === 'blue' && 'bg-blue-500/20',
            color === 'green' && 'bg-green-500/20',
            color === 'red' && 'bg-red-500/20',
            color === 'orange' && 'bg-orange-500/20'
          )}>
            <Icon className="w-6 h-6" />
          </div>
          {trend && (
            <span className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              trend.startsWith('+') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            )}>
              {trend}
            </span>
          )}
        </div>
        <div>
          <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
          <p className="text-white text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
