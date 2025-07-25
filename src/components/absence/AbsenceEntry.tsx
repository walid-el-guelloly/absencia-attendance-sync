
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ClipboardCheck, Users, Calendar, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { studentStorage, Filiere, Classe, Student } from '@/utils/studentStorage';

interface AbsenceEntryProps {
  user: any;
}

const AbsenceEntry = ({ user }: AbsenceEntryProps) => {
  const [filieres, setFilieres] = useState<Filiere[]>([]);
  const [classes, setClasses] = useState<Classe[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedFiliere, setSelectedFiliere] = useState('');
  const [selectedClasse, setSelectedClasse] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [absences, setAbsences] = useState<{[key: string]: { absent: boolean, retard: boolean }}>({});

  const timeSlots = [
    { value: '08:30-11:00', label: '08:30–11:00' },
    { value: '11:00-13:30', label: '11:00–13:30' },
    { value: '13:30-16:00', label: '13:30–16:00' },
    { value: '16:00-18:30', label: '16:00–18:30' }
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    console.log('Chargement des données...');
    const filieresData = studentStorage.getFilieres();
    const classesData = studentStorage.getClasses();
    const studentsData = studentStorage.getStudents();
    
    console.log('Filières chargées:', filieresData);
    console.log('Classes chargées:', classesData);
    console.log('Stagiaires chargés:', studentsData);
    
    setFilieres(filieresData);
    setClasses(classesData);
    setStudents(studentsData);
  };

  useEffect(() => {
    if (selectedFiliere) {
      setSelectedClasse('');
      console.log('Filière sélectionnée:', selectedFiliere);
    }
  }, [selectedFiliere]);

  useEffect(() => {
    if (selectedClasse && selectedTimeSlot) {
      console.log('Classe et créneau sélectionnés:', selectedClasse, selectedTimeSlot);
      checkForJustifiedAbsences();
    }
  }, [selectedClasse, selectedTimeSlot, students]);

  const checkForJustifiedAbsences = () => {
    if (!selectedClasse || !selectedTimeSlot) return;

    const today = new Date().toISOString().split('T')[0];
    const sessionId = `${selectedTimeSlot}-${today}`;
    const allAbsences = studentStorage.getAbsences();
    
    // Vérifier les absences justifiées pour cette séance
    const justifiedAbsences = allAbsences.filter(absence => 
      absence.date === today &&
      absence.sessionId === sessionId &&
      absence.validated &&
      absence.justification &&
      absence.formateur === (user.fullName || user.username)
    );

    console.log('Absences justifiées trouvées:', justifiedAbsences);

    // Mettre automatiquement en retard les stagiaires avec absences justifiées
    const updatedAbsences = { ...absences };
    justifiedAbsences.forEach(absence => {
      updatedAbsences[absence.studentId] = {
        absent: false,
        retard: true
      };
    });

    setAbsences(updatedAbsences);
  };

  const filteredClasses = classes.filter(c => c.filiereId === selectedFiliere);
  const classeStudents = students.filter(s => s.classeId === selectedClasse && s.statut === 'actif');

  const handleAbsenceChange = (studentId: string, checked: boolean) => {
    setAbsences(prev => ({
      ...prev,
      [studentId]: {
        absent: checked,
        retard: prev[studentId]?.retard || false
      }
    }));
  };

  const getStudentStatus = (studentId: string) => {
    const studentAbsence = absences[studentId] || { absent: false, retard: false };
    
    if (studentAbsence.retard) {
      return { status: 'retard', label: 'Retard', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' };
    } else if (studentAbsence.absent) {
      return { status: 'absent', label: 'Absent', color: 'bg-red-500/20 text-red-400 border-red-500/30' };
    } else {
      return { status: 'present', label: 'Présent', color: 'bg-green-500/20 text-green-400 border-green-500/30' };
    }
  };

  const handleSubmitAbsences = () => {
    if (!selectedFiliere || !selectedClasse || !selectedTimeSlot) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une filière, une classe et un créneau",
        variant: "destructive"
      });
      return;
    }

    const absencesToSave = Object.entries(absences).filter(([_, value]) => 
      value.absent
    );

    if (absencesToSave.length === 0) {
      toast({
        title: "Aucune absence",
        description: "Aucune absence n'a été saisie",
        variant: "destructive"
      });
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    let savedCount = 0;
    
    absencesToSave.forEach(([studentId, value]) => {
      if (value.absent) {
        studentStorage.addAbsence({
          studentId,
          sessionId: `${selectedTimeSlot}-${today}`,
          date: today,
          type: 'absent',
          formateur: user.fullName || user.username,
          validated: false
        });
        savedCount++;
      }
    });

    // Reset form
    setAbsences({});
    
    toast({
      title: "Absences enregistrées",
      description: `${savedCount} absence(s) ont été enregistrées et envoyées pour validation`
    });

    console.log('Absences sauvegardées:', savedCount);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Saisie des Absences</h1>
          <p className="text-slate-400">Enregistrer les absences des stagiaires</p>
        </div>
        <div className="text-right bg-slate-800/50 backdrop-blur-xl border border-blue-500/20 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Formateur</p>
          <p className="text-white font-semibold">{user.fullName || user.username}</p>
        </div>
      </div>

      {/* Selection Form */}
      <Card className="bg-slate-800/50 backdrop-blur-xl border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-blue-400" />
            <span>Paramètres de la séance</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">Filière</label>
              <Select value={selectedFiliere} onValueChange={setSelectedFiliere}>
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue placeholder="Choisir une filière" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  {filieres.map(filiere => (
                    <SelectItem key={filiere.id} value={filiere.id} className="text-white hover:bg-slate-700">
                      {filiere.code} - {filiere.nom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">Classe</label>
              <Select value={selectedClasse} onValueChange={setSelectedClasse} disabled={!selectedFiliere}>
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue placeholder="Choisir une classe" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  {filteredClasses.map(classe => (
                    <SelectItem key={classe.id} value={classe.id} className="text-white hover:bg-slate-700">
                      {classe.nom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">Créneau</label>
              <Select value={selectedTimeSlot} onValueChange={setSelectedTimeSlot}>
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue placeholder="Choisir un créneau" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  {timeSlots.map(slot => (
                    <SelectItem key={slot.value} value={slot.value} className="text-white hover:bg-slate-700">
                      {slot.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students List */}
      {selectedClasse && (
        <Card className="bg-slate-800/50 backdrop-blur-xl border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-purple-400" />
                <span>Liste des Stagiaires</span>
              </div>
              <span className="text-slate-400 text-sm font-normal">
                {classeStudents.length} stagiaire(s)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {classeStudents.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">
                  Aucun stagiaire actif dans cette classe
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-12 gap-4 pb-3 border-b border-slate-700 text-slate-400 text-sm font-medium">
                  <div className="col-span-8">Stagiaire</div>
                  <div className="col-span-2 text-center">Absent</div>
                  <div className="col-span-2 text-center">Statut</div>
                </div>

                {classeStudents.map(student => {
                  const studentAbsence = absences[student.id] || { absent: false, retard: false };
                  const statusInfo = getStudentStatus(student.id);
                  
                  return (
                    <div key={student.id} className="grid grid-cols-12 gap-4 items-center p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
                      <div className="col-span-8 flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${
                          student.sexe === 'M' ? 'bg-blue-500' : 'bg-pink-500'
                        }`}>
                          {student.prenom[0]}{student.nom[0]}
                        </div>
                        <div>
                          <p className="text-white font-medium">{student.prenom} {student.nom}</p>
                          <p className="text-slate-400 text-sm">{student.email}</p>
                          {studentAbsence.retard && (
                            <p className="text-yellow-400 text-xs">
                              ⚠️ Absence justifiée - Marqué en retard automatiquement
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="col-span-2 flex justify-center">
                        <Checkbox
                          checked={studentAbsence.absent}
                          onCheckedChange={(checked) => 
                            handleAbsenceChange(student.id, checked as boolean)
                          }
                          disabled={studentAbsence.retard}
                          className="border-red-500 data-[state=checked]:bg-red-500 disabled:opacity-50"
                        />
                      </div>

                      <div className="col-span-2 text-center">
                        <span className={`px-2 py-1 border rounded-full text-xs ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                      </div>
                    </div>
                  );
                })}

                <div className="pt-6 border-t border-slate-700 flex justify-end">
                  <Button
                    onClick={handleSubmitAbsences}
                    disabled={Object.keys(absences).length === 0 || !selectedTimeSlot}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Enregistrer les Absences
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AbsenceEntry;
