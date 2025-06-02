
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Info, ExternalLink, Code, Palette, Database, Zap, Shield, Users } from 'lucide-react';

const About = () => {
  const technologies = [
    {
      name: 'React',
      icon: <Code className="w-6 h-6 text-blue-400" />,
      description: 'Interface utilisateur moderne'
    },
    {
      name: 'TypeScript',
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      description: 'Typage statique pour la fiabilité'
    },
    {
      name: 'Tailwind CSS',
      icon: <Palette className="w-6 h-6 text-cyan-400" />,
      description: 'Design system moderne'
    },
    {
      name: 'Vite',
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      description: 'Build tool ultra-rapide'
    },
    {
      name: 'Local Storage',
      icon: <Database className="w-6 h-6 text-green-400" />,
      description: 'Stockage des données'
    },
    {
      name: 'Lucide Icons',
      icon: <Users className="w-6 h-6 text-purple-400" />,
      description: 'Icônes modernes et élégantes'
    }
  ];

  const features = [
    {
      title: 'Gestion Multi-Rôles',
      description: 'Support pour administrateurs, directeurs, surveillants et formateurs',
      icon: <Users className="w-8 h-8 text-blue-400" />
    },
    {
      title: 'Interface Moderne',
      description: 'Design responsive avec animations fluides et thème sombre',
      icon: <Palette className="w-8 h-8 text-purple-400" />
    },
    {
      title: 'Gestion Complète',
      description: 'Filières, classes, stagiaires et système d\'absences intégré',
      icon: <Database className="w-8 h-8 text-green-400" />
    },
    {
      title: 'Temps Réel',
      description: 'Statistiques en direct et notifications instantanées',
      icon: <Zap className="w-8 h-8 text-yellow-400" />
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">À Propos d'Absenta</h1>
          <p className="text-slate-400">Système de gestion des absences pour établissements de formation</p>
        </div>
        <div className="flex items-center space-x-2 bg-slate-800/50 backdrop-blur-xl border border-blue-500/20 rounded-xl p-4">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Info className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white font-semibold">Version 1.0.0</p>
            <p className="text-slate-400 text-sm">Beta Release</p>
          </div>
        </div>
      </div>

      {/* Project Overview */}
      <Card className="bg-slate-800/50 backdrop-blur-xl border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Info className="w-5 h-5 text-blue-400" />
            <span>Vue d'ensemble du projet</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-slate-300 leading-relaxed">
            <strong className="text-white">Absenta</strong> est une solution moderne de gestion des absences développée 
            spécifiquement pour les établissements de formation professionnelle. L'application offre une interface 
            intuitive et responsive permettant aux différents acteurs (formateurs, surveillants, directeurs) de 
            gérer efficacement le suivi des présences des stagiaires.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                <div className="flex items-center space-x-3 mb-3">
                  {feature.icon}
                  <h3 className="text-white font-semibold">{feature.title}</h3>
                </div>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technologies Used */}
      <Card className="bg-slate-800/50 backdrop-blur-xl border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Code className="w-5 h-5 text-green-400" />
            <span>Technologies Utilisées</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {technologies.map((tech, index) => (
              <div key={index} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 hover:bg-slate-700/50 transition-colors">
                <div className="flex items-center space-x-3 mb-2">
                  {tech.icon}
                  <h4 className="text-white font-medium">{tech.name}</h4>
                </div>
                <p className="text-slate-400 text-sm">{tech.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Developer Info */}
      <Card className="bg-slate-800/50 backdrop-blur-xl border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Users className="w-5 h-5 text-purple-400" />
            <span>Équipe de Développement</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-slate-700/50 to-slate-600/30 rounded-xl border border-slate-600">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">T</span>
              </div>
              <div>
                <h3 className="text-white text-xl font-bold">TechSol</h3>
                <p className="text-slate-400 mb-2">Solutions Technologiques Innovantes</p>
                <p className="text-slate-300 text-sm max-w-2xl">
                  TechSol est spécialisée dans le développement d'applications web modernes et 
                  de solutions digitales sur mesure pour les entreprises et institutions.
                </p>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <Button 
                asChild
                className="bg-blue-600 hover:bg-blue-700"
              >
                <a 
                  href="https://www.linkedin.com/in/guewalid/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </Button>
              <Button 
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Contact
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Version & License */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 backdrop-blur-xl border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-white text-lg">Informations Version</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Version</span>
              <span className="text-white font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Date de sortie</span>
              <span className="text-white font-medium">Décembre 2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Statut</span>
              <span className="px-2 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-xs">
                Beta
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 backdrop-blur-xl border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-white text-lg">Support & Maintenance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Support technique</span>
              <span className="text-green-400 font-medium">Actif</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Mises à jour</span>
              <span className="text-green-400 font-medium">Régulières</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Documentation</span>
              <span className="text-blue-400 font-medium">Intégrée</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
