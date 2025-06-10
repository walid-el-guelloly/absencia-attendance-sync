
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Monitor,
  Users,
  ClipboardCheck,
  Settings,
  BarChart3,
  Info,
  ExternalLink,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';

interface SidebarProps {
  user: any;
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ user, isOpen = true, onClose }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

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

  const handleNavigation = (path: string) => {
    console.log('Navigation vers:', path);
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={onClose} />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 bottom-0 w-64 z-40 flex flex-col transition-all duration-300 shadow-2xl",
        "md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
        isDark 
          ? "bg-slate-800/95 backdrop-blur-xl border-r border-blue-500/20" 
          : "bg-white/95 backdrop-blur-xl border-r border-blue-200/50"
      )}>
        {/* Header with logo */}
        <div className={cn(
          "p-6 border-b transition-colors",
          isDark ? "border-slate-700/50" : "border-slate-200/50"
        )}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/fa016c12-0e1b-4487-a570-54462274ce38.png" 
                alt="Absenta Logo" 
                className="w-10 h-10 object-contain"
              />
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Absenta
                </h1>
                <p className={cn(
                  "text-xs",
                  isDark ? "text-slate-400" : "text-slate-500"
                )}>Gestion des absences</p>
              </div>
            </div>
            
            {/* Mobile close button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className={cn(
                "md:hidden h-8 w-8 p-0 transition-colors",
                isDark
                  ? "text-slate-300 hover:text-white hover:bg-slate-700/50"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              )}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div className="mb-4">
            <h2 className={cn(
              "text-xs font-semibold uppercase tracking-wider mb-3 px-3",
              isDark ? "text-slate-400" : "text-slate-500"
            )}>
              Navigation
            </h2>
          </div>
          
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            const isAccessible = item.roles.includes(user.role);
            
            return (
              <button
                key={item.path}
                onClick={() => {
                  if (isAccessible) {
                    handleNavigation(item.path);
                  }
                }}
                disabled={!isAccessible}
                className={cn(
                  "w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 text-left group relative",
                  isActive && isAccessible
                    ? isDark
                      ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-white shadow-lg shadow-blue-500/10"
                      : "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 text-blue-700 shadow-sm"
                    : isAccessible
                    ? isDark
                      ? "text-slate-300 hover:text-white hover:bg-slate-700/50 hover:border-slate-600 border border-transparent"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-200 border border-transparent"
                    : "cursor-not-allowed opacity-50 border border-transparent",
                  isDark
                    ? "text-slate-500"
                    : "text-slate-400"
                )}
              >
                {isActive && isAccessible && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-400 rounded-r-full"></div>
                )}
                <Icon className={cn(
                  "w-5 h-5 transition-colors flex-shrink-0",
                  isActive && isAccessible 
                    ? "text-blue-400" 
                    : "group-hover:text-blue-400"
                )} />
                <span className="font-medium text-sm">{item.label}</span>
                {!isAccessible && (
                  <div className="ml-auto w-2 h-2 bg-red-500 rounded-full animate-pulse flex-shrink-0"></div>
                )}
              </button>
            );
          })}
        </nav>

        {/* User info and footer */}
        <div className={cn(
          "p-4 space-y-4 border-t transition-colors",
          isDark ? "border-slate-700/50" : "border-slate-200/50"
        )}>
          {/* User role info */}
          <div className={cn(
            "rounded-lg p-3 transition-colors",
            isDark ? "bg-slate-700/30" : "bg-slate-50"
          )}>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">
                  {(user.fullName || user.username || 'U')[0].toUpperCase()}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className={cn(
                  "text-sm font-medium truncate",
                  isDark ? "text-white" : "text-slate-900"
                )}>
                  {user.fullName || user.username}
                </p>
                <p className={cn(
                  "text-xs capitalize",
                  isDark ? "text-slate-400" : "text-slate-500"
                )}>
                  {user.role}
                </p>
              </div>
            </div>
          </div>
          
          {/* Company footer */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">T</span>
              </div>
              <span className={cn(
                "font-semibold text-sm",
                isDark ? "text-slate-300" : "text-slate-700"
              )}>TechSol</span>
            </div>
            <p className={cn(
              "text-xs",
              isDark ? "text-slate-500" : "text-slate-400"
            )}>Développé par TechSol</p>
            
            <a
              href="https://www.linkedin.com/in/guewalid/"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center space-x-1 transition-colors duration-200 text-xs",
                isDark
                  ? "text-slate-400 hover:text-blue-400"
                  : "text-slate-500 hover:text-blue-600"
              )}
            >
              <span>Privacy</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
