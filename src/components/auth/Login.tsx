
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Shield, Users, Eye, BookOpen } from 'lucide-react';

interface LoginProps {
  onLogin: (user: any) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [fullName, setFullName] = useState('');

  const credentials = {
    'admin@cfm.ofppt.ma': { password: 'Adm#8rP!29Ws@ZqK', role: 'admin' },
    'directeur@cfm.ofppt.ma': { password: 'Dir$9Kf&51Lu^MxT', role: 'directeur' },
    'surveillant@cfm.ofppt.ma': { password: 'Surv!4Mn*86Qa&Bv', role: 'surveillant' },
    'formateur@cfm.ofppt.ma': { password: 'Form@6Vz!32Jr#Lc', role: 'formateur' }
  };

  const quickLoginCredentials = [
    { 
      role: 'Admin', 
      email: 'admin@cfm.ofppt.ma', 
      password: 'Adm#8rP!29Ws@ZqK',
      color: 'from-red-500 to-red-600',
      icon: Shield
    },
    { 
      role: 'Directeur', 
      email: 'directeur@cfm.ofppt.ma', 
      password: 'Dir$9Kf&51Lu^MxT',
      color: 'from-purple-500 to-purple-600',
      icon: Users
    },
    { 
      role: 'Surveillant', 
      email: 'surveillant@cfm.ofppt.ma', 
      password: 'Surv!4Mn*86Qa&Bv',
      color: 'from-green-500 to-green-600',
      icon: Eye
    },
    { 
      role: 'Formateur', 
      email: 'formateur@cfm.ofppt.ma', 
      password: 'Form@6Vz!32Jr#Lc',
      color: 'from-blue-500 to-blue-600',
      icon: BookOpen
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const userCreds = credentials[email as keyof typeof credentials];
    
    if (!userCreds || userCreds.password !== password) {
      toast({
        title: "Erreur d'authentification",
        description: "Email ou mot de passe incorrect",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (userCreds.role === 'formateur' && !username.trim()) {
      toast({
        title: "Username requis",
        description: "Veuillez saisir votre nom d'utilisateur",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    toast({
      title: "Connexion réussie",
      description: `Bienvenue dans Absenta !`
    });

    onLogin({
      email,
      role: userCreds.role,
      username: userCreds.role === 'formateur' ? username : email.split('@')[0],
      fullName: username || email.split('@')[0]
    });

    setIsLoading(false);
  };

  const handleQuickLogin = async (credential: any) => {
    setSelectedRole(credential);
    setShowNameDialog(true);
  };

  const handleNameSubmit = async () => {
    if (!fullName.trim()) {
      toast({
        title: "Nom requis",
        description: "Veuillez saisir votre nom complet",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    onLogin({
      email: selectedRole.email,
      role: selectedRole.role.toLowerCase(),
      username: selectedRole.email.split('@')[0],
      fullName: fullName.trim()
    });

    toast({
      title: "Connexion rapide réussie",
      description: `Connecté en tant que ${selectedRole.role}`
    });

    setIsLoading(false);
    setShowNameDialog(false);
    setFullName('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%239C92AC%22%20fill-opacity=%220.05%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="w-full max-w-5xl relative space-y-12">
        <Card className="w-full max-w-md mx-auto bg-slate-800/50 backdrop-blur-xl border-blue-500/20 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg"></div>
          <CardHeader className="text-center relative z-10 pb-8">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-2xl">
              <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                <path d="M8 11l2 2 4-4" stroke="white" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              Absenta
            </CardTitle>
            <p className="text-slate-400 text-lg">Gestion des absences - CFM OFPPT</p>
          </CardHeader>
          
          <CardContent className="relative z-10 px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-slate-300 text-sm font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 h-11"
                  placeholder="votre.email@cfm.ofppt.ma"
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="password" className="text-slate-300 text-sm font-medium">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 h-11"
                />
              </div>
              
              {email === 'formateur@cfm.ofppt.ma' && (
                <div className="space-y-3">
                  <Label htmlFor="username" className="text-slate-300 text-sm font-medium">Nom d'utilisateur</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 h-11"
                    placeholder="Votre nom d'utilisateur"
                  />
                </div>
              )}
              
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 h-12 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Connexion...</span>
                  </div>
                ) : (
                  'Se connecter'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Connexion rapide */}
        <div className="mt-12">
          <h3 className="text-center text-xl font-semibold text-white mb-8">
            Connexion Rapide
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {quickLoginCredentials.map((credential) => {
              const Icon = credential.icon;
              return (
                <Button
                  key={credential.role}
                  onClick={() => handleQuickLogin(credential)}
                  disabled={isLoading}
                  className={`bg-gradient-to-br ${credential.color} hover:scale-105 transform transition-all duration-300 p-8 h-auto flex flex-col items-center space-y-4 shadow-lg hover:shadow-xl border border-white/10 rounded-xl`}
                >
                  <Icon className="w-8 h-8 text-white" />
                  <span className="font-semibold text-white text-lg">{credential.role}</span>
                  <span className="text-xs text-white/80">Connexion directe</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Informations de démonstration */}
        <div className="mt-8 text-center">
          <Card className="bg-slate-800/30 backdrop-blur border-slate-600/30">
            <CardContent className="p-6">
              <p className="text-slate-400 text-sm mb-4"><strong>Informations de démo :</strong></p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-500">
                <p>Admin: admin@cfm.ofppt.ma</p>
                <p>Directeur: directeur@cfm.ofppt.ma</p>
                <p>Surveillant: surveillant@cfm.ofppt.ma</p>
                <p>Formateur: formateur@cfm.ofppt.ma</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dialog pour saisir le nom complet */}
      <Dialog open={showNameDialog} onOpenChange={setShowNameDialog}>
        <DialogContent className="bg-slate-800 border-slate-600 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              Saisir votre nom complet
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="text-center mb-4">
              <p className="text-slate-400">
                Connexion en tant que <span className="text-blue-400 font-semibold">{selectedRole?.role}</span>
              </p>
            </div>
            <div>
              <Label htmlFor="fullName" className="text-slate-300 text-sm font-medium">Nom complet</Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 mt-2"
                placeholder="Ex: Mohammed Alami"
                autoFocus
              />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowNameDialog(false)}
                className="border-slate-600 text-slate-300"
              >
                Annuler
              </Button>
              <Button
                onClick={handleNameSubmit}
                disabled={isLoading || !fullName.trim()}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Connexion...</span>
                  </div>
                ) : (
                  'Se connecter'
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;
