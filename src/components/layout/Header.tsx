
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Bell, LogOut, User, Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

interface HeaderProps {
  user: any;
  onLogout: () => void;
  onToggleSidebar?: () => void;
}

const Header = ({ user, onLogout, onToggleSidebar }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [displayName, setDisplayName] = useState('');
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  useEffect(() => {
    console.log('User object in Header:', user);
    
    if (user) {
      const name = user.fullName || user.username || 'Utilisateur';
      console.log('Setting display name to:', name);
      setDisplayName(name);
    } else {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          const name = userData.fullName || userData.username || 'Utilisateur';
          console.log('Setting display name from localStorage to:', name);
          setDisplayName(name);
        } catch (error) {
          console.error('Erreur lors de la lecture des données utilisateur:', error);
          setDisplayName('Utilisateur');
        }
      } else {
        setDisplayName('Utilisateur');
      }
    }
  }, [user]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Recherche globale:', searchQuery);
    }
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b shadow-lg transition-all duration-300",
      isDark 
        ? "bg-slate-800/95 border-blue-500/20" 
        : "bg-white/95 border-blue-200/50"
    )}>
      <div className="flex items-center justify-between px-4 py-3 h-16">
        <div className="flex items-center space-x-4">
          {/* Toggle button for mobile */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className={cn(
              "md:hidden h-10 w-10 p-0 rounded-lg transition-colors",
              isDark
                ? "text-slate-300 hover:text-white hover:bg-slate-700/50"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            )}
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          {/* Logo - visible only on mobile */}
          <div className="flex items-center space-x-2 md:hidden">
            <img 
              src="/lovable-uploads/fa016c12-0e1b-4487-a570-54462274ce38.png" 
              alt="Absenta Logo" 
              className="w-8 h-8 object-contain"
            />
            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Absenta
            </h1>
          </div>
        </div>

        {/* Search bar */}
        <div className="flex-1 max-w-md mx-4 md:mx-6">
          <form onSubmit={handleSearch} className="relative">
            <Search className={cn(
              "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4",
              isDark ? "text-slate-400" : "text-slate-500"
            )} />
            <Input
              type="text"
              placeholder="Rechercher stagiaires, classes, filières..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "pl-10 h-10 rounded-lg transition-colors",
                isDark
                  ? "bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                  : "bg-white border-slate-200 text-slate-900 placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              )}
            />
          </form>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-2">
          {/* Theme toggle */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleTheme}
            className={cn(
              "h-10 w-10 p-0 rounded-lg transition-colors",
              isDark
                ? "text-slate-300 hover:text-white hover:bg-slate-700/50"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            )}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(
              "h-10 w-10 p-0 rounded-lg transition-colors",
              isDark
                ? "text-slate-300 hover:text-white hover:bg-slate-700/50"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            )}
          >
            <Bell className="w-4 h-4" />
          </Button>
          
          <div className={cn(
            "hidden sm:flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors",
            isDark
              ? "bg-slate-700/50 border-slate-600"
              : "bg-white border-slate-200"
          )}>
            <User className="w-4 h-4 text-blue-400" />
            <div className="text-sm">
              <p className={cn(
                "font-medium",
                isDark ? "text-white" : "text-slate-900"
              )}>{displayName}</p>
              <p className={cn(
                "text-xs capitalize",
                isDark ? "text-slate-400" : "text-slate-500"
              )}>{user?.role || 'admin'}</p>
            </div>
          </div>
          
          <Button
            onClick={onLogout}
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-400 hover:bg-red-500/10 h-10 w-10 p-0 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
