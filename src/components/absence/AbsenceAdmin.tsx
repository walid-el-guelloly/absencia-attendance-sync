
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CheckCircle, XCircle, Clock, User, Calendar, FileText, Upload } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { studentStorage, Absence, Student, Classe, Filiere } from '@/utils/studentStorage';

const AbsenceAdmin = () => {
  const [absences, setAbsences] = useState<Absence[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<Classe[]>([]);
  const [filieres, setFilieres] = useState<Filiere[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'validated'>('pending');
  const [isJustificationOpen, setIsJustificationOpen] = useState(false);
  const [selectedAbsence, setSelectedAbsence] = useState<Absence | null>(null);
  const [justificationText, setJustificationText] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setAbsences(studentStorage.getAbsences());
    setStudents(studentStorage.getStudents());
    setClasses(studentStorage.getClasses());
    setFilieres(studentStorage.getFilieres());
  };

  const handleValidateAbsence = (absenceId: string, justified: boolean = false) => {
    if (justified && selectedAbsence) {
      // Add justification logic here
      const updatedAbsences = absences.map(abs => 
        abs.id === absenceId 
          ? { ...abs, validated: true, justification: justificationText }
          : abs
      );
      studentStorage.saveAbsences(updatedAbsences);
      
      toast({
        title: "Absence justifiée",
        description: "L'absence a été validée avec justification",
      });
      
      setIsJustificationOpen(false);
      setJustificationText('');
      setSelectedAbsence(null);
    } else {
      const validated = studentStorage.validateAbsence(absenceId, 'Surveillant');
      if (validated) {
        toast({
          title: "Absence validée",
          description: "L'absence a été validée avec succès",
        });
      }
    }
    loadData();
  };

  const openJustificationDialog = (absence: Absence) => {
    setSelectedAbsence(absence);
    setJustificationText('');
    setIsJustificationOpen(true);
  };

  const getStudentInfo = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return null;
    
    const classe = classes.find(c => c.id === student.classeId);
    const filiere = filieres.find(f => f.id === classe?.filiereId);
    
    return { student, classe, filiere };
  };

  const filteredAbsences = absences.filter(absence => {
    switch (filter) {
      case 'pending':
        return !absence.validated;
      case 'validated':
        return absence.validated;
      default:
        return true;
    }
  }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const pendingCount = absences.filter(a => !a.validated).length;
  const validatedCount = absences.filter(a => a.validated).length;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Administration des Absences</h1>
          <p className="text-slate-400">Valider et gérer les absences saisies par les formateurs</p>
        </div>
        <div className="text-right bg-slate-800/50 backdrop-blur-xl border border-blue-500/20 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Total</p>
          <p className="text-white font-semibold">{absences.length} absences</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-800/50 backdrop-blur-xl border-blue-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">En attente</p>
                <p className="text-2xl font-bold text-orange-400">{pendingCount}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 backdrop-blur-xl border-blue-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Validées</p>
                <p className="text-2xl font-bold text-green-400">{validatedCount}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 backdrop-blur-xl border-blue-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total</p>
                <p className="text-2xl font-bold text-blue-400">{absences.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex space-x-4">
        <Button
          onClick={() => setFilter('pending')}
          variant={filter === 'pending' ? 'default' : 'outline'}
          className={filter === 'pending' ? 'bg-orange-500 hover:bg-orange-600' : 'border-orange-500/50 text-orange-400 hover:bg-orange-500/10'}
        >
          En attente ({pendingCount})
        </Button>
        <Button
          onClick={() => setFilter('validated')}
          variant={filter === 'validated' ? 'default' : 'outline'}
          className={filter === 'validated' ? 'bg-green-500 hover:bg-green-600' : 'border-green-500/50 text-green-400 hover:bg-green-500/10'}
        >
          Validées ({validatedCount})
        </Button>
        <Button
          onClick={() => setFilter('all')}
          variant={filter === 'all' ? 'default' : 'outline'}
          className={filter === 'all' ? 'bg-blue-500 hover:bg-blue-600' : 'border-blue-500/50 text-blue-400 hover:bg-blue-500/10'}
        >
          Toutes ({absences.length})
        </Button>
      </div>

      {/* Absences List */}
      <Card className="bg-slate-800/50 backdrop-blur-xl border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-blue-400" />
            <span>Liste des Absences</span>
            <span className="text-slate-400 text-sm font-normal">({filteredAbsences.length} éléments)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredAbsences.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">Aucune absence trouvée</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAbsences.map(absence => {
                const info = getStudentInfo(absence.studentId);
                if (!info) return null;
                
                const { student, classe, filiere } = info;
                
                return (
                  <div key={absence.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 hover:bg-slate-700/50 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                          student.sexe === 'M' ? 'bg-blue-500' : 'bg-pink-500'
                        }`}>
                          {student.prenom[0]}{student.nom[0]}
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{student.prenom} {student.nom}</h4>
                          <p className="text-slate-400 text-sm">
                            {filiere?.code} - {classe?.nom}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="flex items-center space-x-2">
                            <Badge variant={absence.type === 'absent' ? 'destructive' : 'secondary'}>
                              {absence.type === 'absent' ? 'Absent' : 'Retard'}
                            </Badge>
                            {absence.validated ? (
                              <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30">
                                {absence.justification ? 'Justifié' : 'Validé'}
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="border-orange-500/50 text-orange-400">
                                En attente
                              </Badge>
                            )}
                          </div>
                          <p className="text-slate-400 text-xs mt-1">
                            {new Date(absence.date).toLocaleDateString('fr-FR')} • {absence.sessionId}
                          </p>
                          <p className="text-slate-500 text-xs">
                            Par {absence.formateur}
                          </p>
                          {absence.justification && (
                            <p className="text-slate-300 text-xs mt-1 max-w-xs truncate">
                              Justification: {absence.justification}
                            </p>
                          )}
                        </div>
                        
                        {!absence.validated && (
                          <div className="flex space-x-2">
                            <Button
                              onClick={() => openJustificationDialog(absence)}
                              size="sm"
                              variant="outline"
                              className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                            >
                              <FileText className="w-4 h-4 mr-1" />
                              Justifier
                            </Button>
                            <Button
                              onClick={() => handleValidateAbsence(absence.id)}
                              size="sm"
                              className="bg-green-500 hover:bg-green-600 text-white"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Valider
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Justification Dialog */}
      <Dialog open={isJustificationOpen} onOpenChange={setIsJustificationOpen}>
        <DialogContent className="bg-slate-800 border-slate-600 text-white">
          <DialogHeader>
            <DialogTitle>Justifier l'absence</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">
                Motif de justification
              </label>
              <textarea
                value={justificationText}
                onChange={(e) => setJustificationText(e.target.value)}
                placeholder="Saisir le motif de l'absence (maladie, rendez-vous médical, etc.)"
                className="w-full h-24 px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-md text-white placeholder:text-slate-400 focus:border-blue-400 focus:outline-none resize-none"
              />
            </div>
            
            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">
                Document justificatif (optionnel)
              </label>
              <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-slate-500 transition-colors">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-400 text-sm">
                  Glissez un fichier ici ou cliquez pour sélectionner
                </p>
                <p className="text-slate-500 text-xs mt-1">
                  PDF, Image (max 5MB)
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsJustificationOpen(false)}
                className="border-slate-600 text-slate-300"
              >
                Annuler
              </Button>
              <Button
                onClick={() => handleValidateAbsence(selectedAbsence?.id || '', true)}
                disabled={!justificationText.trim()}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Justifier et Valider
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AbsenceAdmin;
