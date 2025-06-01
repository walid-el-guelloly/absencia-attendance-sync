
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Users, Target, Shield, Zap } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Users,
      title: 'Gestion Multi-Rôles',
      description: 'Système d\'authentification avec 4 rôles distincts : Admin, Directeur, Surveillant et Formateur',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Zap,
      title: 'Temps Réel',
      description: 'Synchronisation instantanée entre les saisies formateurs et l\'administration',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Target,
      title: 'Suivi Précis',
      description: 'Tracking des absences, retards et justifications avec historique complet',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Shield,
      title: 'Sécurité',
      description: 'Accès contrôlé et sécurisé selon les permissions de chaque rôle utilisateur',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { label: 'Filières', value: '4+', description: 'TSDI, TSRI, TDM, TMSIR' },
    { label: 'Stagiaires', value: '1,250+', description: 'Tous niveaux confondus' },
    { label: 'Séances/Jour', value: '4', description: '08:30-11:00, 11:00-13:30, 13:30-16:00, 16:00-18:30' },
    { label: 'Formateurs', value: '25+', description: 'Équipe pédagogique complète' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
          <span className="text-3xl font-bold text-white">A</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">
          À propos d'<span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Absencia</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          Solution moderne de gestion des absences pour le Centre de Formation aux Métiers de l'OFPPT, 
          conçue pour optimiser le suivi des stagiaires en temps réel.
        </p>
      </div>

      {/* Mission */}
      <Card className="bg-slate-800/50 backdrop-blur-xl border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Target className="w-6 h-6 text-blue-400" />
            <span>Notre Mission</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-slate-300 leading-relaxed">
          <p className="mb-4">
            Absencia révolutionne la gestion des absences dans les centres de formation en offrant une plateforme 
            intuitive, moderne et connectée. Notre objectif est de simplifier le processus de suivi des présences 
            tout en fournissant des données précieuses pour l'amélioration continue de l'expérience éducative.
          </p>
          <p>
            Grâce à notre interface responsive et nos fonctionnalités temps réel, les formateurs peuvent se concentrer 
            sur l'enseignement tandis que l'administration dispose d'outils puissants pour analyser et optimiser 
            la fréquentation des cours.
          </p>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="bg-slate-800/50 backdrop-blur-xl border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-[1.02]">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Stats */}
      <Card className="bg-slate-800/50 backdrop-blur-xl border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Info className="w-6 h-6 text-blue-400" />
            <span>Données Clés</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-blue-400 font-medium mb-1">{stat.label}</div>
                <div className="text-slate-400 text-sm">{stat.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technology Stack */}
      <Card className="bg-slate-800/50 backdrop-blur-xl border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Zap className="w-6 h-6 text-blue-400" />
            <span>Technologies Utilisées</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'React', color: 'from-blue-400 to-blue-600' },
              { name: 'TypeScript', color: 'from-blue-500 to-blue-700' },
              { name: 'Tailwind CSS', color: 'from-cyan-400 to-cyan-600' },
              { name: 'Recharts', color: 'from-purple-400 to-purple-600' },
              { name: 'Lucide Icons', color: 'from-green-400 to-green-600' },
              { name: 'Shadcn/UI', color: 'from-orange-400 to-orange-600' },
              { name: 'LocalStorage', color: 'from-pink-400 to-pink-600' },
              { name: 'Responsive Design', color: 'from-indigo-400 to-indigo-600' }
            ].map((tech, index) => (
              <div key={index} className="text-center p-3 bg-slate-700/30 rounded-lg border border-slate-600 hover:border-slate-500 transition-colors duration-200">
                <div className={`w-8 h-8 mx-auto mb-2 rounded-lg bg-gradient-to-r ${tech.color}`}></div>
                <div className="text-white text-sm font-medium">{tech.name}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl border-blue-500/20">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Centre de Formation aux Métiers - OFPPT</h3>
          <p className="text-slate-300 mb-6">
            Absencia est développé spécifiquement pour répondre aux besoins du CFM OFPPT 
            en matière de gestion moderne des absences et de suivi pédagogique.
          </p>
          <div className="flex justify-center space-x-8 text-sm text-slate-400">
            <div>
              <strong className="text-white">Version:</strong> 1.0.0
            </div>
            <div>
              <strong className="text-white">Dernière mise à jour:</strong> {new Date().toLocaleDateString('fr-FR')}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
