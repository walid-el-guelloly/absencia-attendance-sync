
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Bell, LogOut, User, Menu } from 'lucide-react';

interface HeaderProps {
  user: any;
  onLogout: () => void;
  onToggleSidebar?: () => void;
}

const Header = ({ user, onLogout, onToggleSidebar }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [displayName, setDisplayName] = useState('');

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-800/95 backdrop-blur-xl border-b border-blue-500/20 shadow-lg">
      <div className="flex items-center justify-between px-4 py-3 h-16">
        <div className="flex items-center space-x-4">
          {/* Toggle button for mobile */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="md:hidden text-slate-300 hover:text-white hover:bg-slate-700/50 h-10 w-10 p-0 rounded-lg"
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          {/* Logo - visible only on mobile */}
          <div className="flex items-center space-x-2 md:hidden">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                <path d="M8 11l2 2 4-4" stroke="white" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Absenta
            </h1>
          </div>
        </div>

        {/* Search bar */}
        <div className="flex-1 max-w-md mx-4 md:mx-6">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Rechercher stagiaires, classes, filières..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 rounded-lg"
            />
          </form>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-slate-300 hover:text-white hover:bg-slate-700/50 h-10 w-10 p-0 rounded-lg"
          >
            <Bell className="w-4 h-4" />
          </Button>
          
          <div className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-slate-700/50 rounded-lg border border-slate-600">
            <User className="w-4 h-4 text-blue-400" />
            <div className="text-sm">
              <p className="text-white font-medium">{displayName}</p>
              <p className="text-slate-400 text-xs capitalize">{user?.role || 'admin'}</p>
            </div>
          </div>
          
          <Button
            onClick={onLogout}
            variant="ghost"
            size="sm"
            className="text-slate-300 hover:text-red-400 hover:bg-red-500/10 h-10 w-10 p-0 rounded-lg"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
