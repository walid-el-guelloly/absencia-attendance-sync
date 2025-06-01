
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Monitor,
  Users,
  ClipboardCheck,
  Settings,
  BarChart3,
  Info
} from 'lucide-react';

interface SidebarProps {
  user: any;
}

const Sidebar = ({ user }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: Monitor,
      label: 'Dashboard',
      path: '/',
      roles: ['admin', 'directeur', 'surveillant', 'formateur']
    },
    {
      icon: Users,
      label: 'Gestion Stagiaires',
      path: '/students',
      roles: ['admin', 'directeur', 'surveillant']
    },
    {
      icon: ClipboardCheck,
      label: 'Saisie Absences',
      path: '/absence-entry',
      roles: ['formateur']
    },
    {
      icon: Settings,
      label: 'Admin Absences',
      path: '/absence-admin',
      roles: ['admin', 'directeur', 'surveillant']
    },
    {
      icon: BarChart3,
      label: 'Statistiques',
      path: '/statistics',
      roles: ['admin', 'directeur', 'surveillant']
    },
    {
      icon: Info,
      label: 'À propos',
      path: '/about',
      roles: ['admin', 'directeur', 'surveillant', 'formateur']
    }
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user.role)
  );

  const handleNavigation = (path: string, roles: string[]) => {
    if (roles.includes(user.role)) {
      navigate(path);
    }
  };

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-slate-800/50 backdrop-blur-xl border-r border-blue-500/20 z-40">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          const isAccessible = item.roles.includes(user.role);
          
          return (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path, item.roles)}
              disabled={!isAccessible}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 text-left",
                isActive && isAccessible
                  ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-white shadow-lg"
                  : isAccessible
                  ? "text-slate-300 hover:text-white hover:bg-slate-700/50 hover:border-slate-600"
                  : "text-slate-500 cursor-not-allowed opacity-50",
                "border border-transparent"
              )}
            >
              <Icon className={cn(
                "w-5 h-5",
                isActive && isAccessible ? "text-blue-400" : ""
              )} />
              <span className="font-medium">{item.label}</span>
              {!isAccessible && user.role === 'formateur' && (
                <div className="ml-auto w-2 h-2 bg-red-500 rounded-full"></div>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
