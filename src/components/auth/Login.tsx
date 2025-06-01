
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

interface LoginProps {
  onLogin: (user: any) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
      icon: '👑'
    },
    { 
      role: 'Directeur', 
      email: 'directeur@cfm.ofppt.ma', 
      password: 'Dir$9Kf&51Lu^MxT',
      color: 'from-purple-500 to-purple-600',
      icon: '🎯'
    },
    { 
      role: 'Surveillant', 
      email: 'surveillant@cfm.ofppt.ma', 
      password: 'Surv!4Mn*86Qa&Bv',
      color: 'from-green-500 to-green-600',
      icon: '👮'
    },
    { 
      role: 'Formateur', 
      email: 'formateur@cfm.ofppt.ma', 
      password: 'Form@6Vz!32Jr#Lc',
      color: 'from-blue-500 to-blue-600',
      icon: '👨‍🏫'
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
      description: `Bienvenue dans Absencia !`
    });

    onLogin({
      email,
      role: userCreds.role,
      username: userCreds.role === 'formateur' ? username : email.split('@')[0]
    });

    setIsLoading(false);
  };

  const handleQuickLogin = async (credential: any) => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));

    if (credential.role === 'Formateur') {
      const defaultUsername = `Formateur_${Date.now()}`;
      onLogin({
        email: credential.email,
        role: 'formateur',
        username: defaultUsername
      });
    } else {
      onLogin({
        email: credential.email,
        role: credential.role.toLowerCase(),
        username: credential.email.split('@')[0]
      });
    }

    toast({
      title: "Connexion rapide réussie",
      description: `Connecté en tant que ${credential.role}`
    });

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%239C92AC%22%20fill-opacity=%220.05%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="w-full max-w-4xl relative">
        <Card className="w-full max-w-md mx-auto bg-slate-800/50 backdrop-blur-xl border-blue-500/20 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg"></div>
          <CardHeader className="text-center relative z-10">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-white">A</span>
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Absencia
            </CardTitle>
            <p className="text-slate-400">Gestion des absences - CFM OFPPT</p>
          </CardHeader>
          
          <CardContent className="relative z-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400"
                  placeholder="votre.email@cfm.ofppt.ma"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400"
                />
              </div>
              
              {email === 'formateur@cfm.ofppt.ma' && (
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-slate-300">Nom d'utilisateur</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400"
                    placeholder="Votre nom d'utilisateur"
                  />
                </div>
              )}
              
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 transition-all duration-300 transform hover:scale-[1.02]"
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
            </form>
          </CardContent>
        </Card>

        {/* Connexion rapide */}
        <div className="mt-8">
          <h3 className="text-center text-xl font-semibold text-white mb-6">
            Connexion Rapide
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickLoginCredentials.map((credential) => (
              <Button
                key={credential.role}
                onClick={() => handleQuickLogin(credential)}
                disabled={isLoading}
                className={`bg-gradient-to-br ${credential.color} hover:scale-105 transform transition-all duration-300 p-6 h-auto flex flex-col items-center space-y-2 shadow-lg hover:shadow-xl border border-white/10`}
              >
                <span className="text-2xl">{credential.icon}</span>
                <span className="font-semibold text-white">{credential.role}</span>
                <span className="text-xs text-white/80">Connexion directe</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Informations de démonstration */}
        <div className="mt-6 text-center">
          <Card className="bg-slate-800/30 backdrop-blur border-slate-600/30">
            <CardContent className="p-4">
              <p className="text-slate-400 text-sm mb-2"><strong>Informations de démo :</strong></p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-500">
                <p>Admin: admin@cfm.ofppt.ma</p>
                <p>Directeur: directeur@cfm.ofppt.ma</p>
                <p>Surveillant: surveillant@cfm.ofppt.ma</p>
                <p>Formateur: formateur@cfm.ofppt.ma</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
