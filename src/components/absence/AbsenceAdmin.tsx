
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AbsenceAdmin = () => {
  const [absences, setAbsences] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Load absences from localStorage (real-time sync)
    const loadAbsences = () => {
      const savedAbsences = JSON.parse(localStorage.getItem('absences') || '[]');
      setAbsences(savedAbsences);
    };

    loadAbsences();
    
    // Poll for updates every 2 seconds
    const interval = setInterval(loadAbsences, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const handleJustify = (absenceId: string, studentId: string) => {
    toast({
      title: "Absence justifiée",
      description: "L'absence a été marquée comme justifiée"
    });
  };

  const handleAuthorize = (absenceId: string, studentId: string) => {
    toast({
      title: "Retour autorisé",
      description: "Le stagiaire est autorisé à reprendre les cours"
    });
  };

  const handleBlock = (absenceId: string, studentId: string) => {
    toast({
      title: "Stagiaire bloqué",
      description: "Le stagiaire ne peut pas assister aux cours sans autorisation",
      variant: "destructive"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'justified': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'authorized': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'blocked': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'pending': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Administration des Absences</h1>
          <p className="text-slate-400">Gérer les justifications et autorisations</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-slate-400 text-sm">Mise à jour automatique</span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-slate-800/50 backdrop-blur-xl border-blue-500/20">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'all', label: 'Toutes' },
              { value: 'pending', label: 'En attente' },
              { value: 'justified', label: 'Justifiées' },
              { value: 'blocked', label: 'Bloqués' }
            ].map(option => (
              <Button
                key={option.value}
                variant={filter === option.value ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilter(option.value)}
                className={filter === option.value 
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white" 
                  : "text-slate-300 hover:text-white"
                }
              >
                {option.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Absences */}
      {absences.length > 0 ? (
        <div className="space-y-4">
          {absences.map((absence, index) => (
            <Card key={index} className="bg-slate-800/50 backdrop-blur-xl border-blue-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Settings className="w-5 h-5 text-blue-400" />
                    <span>Séance {absence.session}</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-blue-400 border-blue-400">
                      {absence.classe}
                    </Badge>
                    <span className="text-slate-400 text-sm">
                      {new Date(absence.timestamp).toLocaleString('fr-FR')}
                    </span>
                  </div>
                </div>
                <p className="text-slate-400">
                  Formateur: {absence.formateur} • Filière: {absence.filiere}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Absent Students */}
                  {absence.absentStudents.length > 0 && (
                    <div>
                      <h4 className="text-white font-medium mb-3 flex items-center space-x-2">
                        <XCircle className="w-4 h-4 text-red-400" />
                        <span>Stagiaires Absents ({absence.absentStudents.length})</span>
                      </h4>
                      <div className="grid gap-3">
                        {absence.absentStudents.map((studentId: string) => (
                          <div key={studentId} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                  S{studentId}
                                </div>
                                <div>
                                  <p className="text-white font-medium">Stagiaire {studentId}</p>
                                  <p className="text-slate-400 text-sm">Absence non justifiée</p>
                                </div>
                                <Badge className={getStatusColor('pending')}>
                                  En attente
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleJustify(absence.id, studentId)}
                                  className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Justifier
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleAuthorize(absence.id, studentId)}
                                  className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                                >
                                  <Clock className="w-4 h-4 mr-1" />
                                  Autoriser
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleBlock(absence.id, studentId)}
                                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                >
                                  <XCircle className="w-4 h-4 mr-1" />
                                  Bloquer
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Late Students */}
                  {absence.lateStudents.length > 0 && (
                    <div>
                      <h4 className="text-white font-medium mb-3 flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-orange-400" />
                        <span>Stagiaires en Retard ({absence.lateStudents.length})</span>
                      </h4>
                      <div className="grid gap-3">
                        {absence.lateStudents.map((studentId: string) => (
                          <div key={studentId} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                  S{studentId}
                                </div>
                                <div>
                                  <p className="text-white font-medium">Stagiaire {studentId}</p>
                                  <p className="text-slate-400 text-sm">Retard signalé</p>
                                </div>
                                <Badge className={getStatusColor('pending')}>
                                  En attente
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleJustify(absence.id, studentId)}
                                  className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Valider
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-slate-800/50 backdrop-blur-xl border-blue-500/20">
          <CardContent className="p-12 text-center">
            <Clock className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-white text-lg font-medium mb-2">Aucune absence en attente</h3>
            <p className="text-slate-400">
              Les nouvelles saisies d'absences apparaîtront ici en temps réel
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AbsenceAdmin;
