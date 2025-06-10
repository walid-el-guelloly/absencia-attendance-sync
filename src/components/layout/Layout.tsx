
import { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';
import Header from './Header';
import Sidebar from './Sidebar';
import { useTheme } from '@/hooks/useTheme';

interface LayoutProps {
  children: ReactNode;
  user: any;
  onLogout: () => void;
}

const Layout = ({ children, user, onLogout }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme } = useTheme();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <div className={cn(
      "min-h-screen w-full transition-colors duration-300",
      isDark 
        ? "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900" 
        : "bg-gradient-to-br from-blue-50 via-white to-blue-50"
    )}>
      {/* Background pattern */}
      <div className={cn(
        "absolute inset-0 opacity-20 transition-opacity duration-300",
        isDark 
          ? "bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%239C92AC%22%20fill-opacity=%220.03%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"
          : "bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23637A9F%22%20fill-opacity=%220.05%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"
      )}></div>
      
      <Header user={user} onLogout={onLogout} onToggleSidebar={toggleSidebar} />
      
      <div className="flex w-full">
        <Sidebar user={user} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className={cn(
          "flex-1 min-h-screen pt-16 transition-all duration-300 relative z-10",
          "md:ml-64"
        )}>
          <div className="container-responsive py-6 sm:py-8">
            <div className="animate-fade-in">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
