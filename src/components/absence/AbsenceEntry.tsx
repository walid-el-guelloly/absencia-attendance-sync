
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ClipboardCheck, Send, Users, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { studentStorage, Student, Filiere, Classe } from '@/utils/studentStorage';

interface AbsenceEntryProps {
  user: any;
}

const AbsenceEntry = ({ user }: AbsenceEntryProps) => {
  const [selectedSession, setSelectedSession] = useState('');
  const [selectedFiliere, setSelectedFiliere] = useState('');
  const [selectedClasse, setSelectedClasse] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [filieres, setFilieres] = useState<Filiere[]>([]);
  const [classes, setClasses] = useState<Classe[]>([]);
  const [absentStudents, setAbsentStudents] = useState<string[]>([]);
  const [lateStudents, setLateStudents] = useState<string[]>([]);

  const sessions = [
    { id: '1', label: '08:30 - 11:00', value: '08:30-11:00' },
    { id: '2', label: '11:00 - 13:30', value: '11:00-13:30' },
    { id: '3', label: '13:30 - 16:00', value: '13:30-16:00' },
    { id: '4', label: '16:00 - 18:30', value: '16:00-18:30' }
  ];

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (selectedClasse) {
      const classeStudents = studentStorage.getStudentsByClasse(selectedClasse);
      setStudents(classeStudents);
    } else {
      setStudents([]);
    }
  }, [selectedClasse]);

  const loadData = () => {
    setFilieres(studentStorage.getFilieres());
    setClasses(studentStorage.getClasses());
  };

  const handleAbsentChange = (studentId: string, checked: boolean) => {
    if (checked) {
      setAbsentStudents([...absentStudents, studentId]);
      setLateStudents(lateStudents.filter(id => id !== studentId));
    } else {
      setAbsentStudents(absentStudents.filter(id => id !== studentId));
    }
  };

  const handleLateChange = (studentId: string, checked: boolean) => {
    if (checked) {
      setLateStudents([...lateStudents, studentId]);
      setAbsentStudents(absentStudents.filter(id => id !== studentId));
    } else {
      setLateStudents(lateStudents.filter(id => id !== studentId));
    }
  };

  const handleSubmit = () => {
    if (!selectedSession || !selectedFiliere || !selectedClasse) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez sélectionner une séance, filière et classe",
        variant: "destructive"
      });
      return;
    }

    // Save absences to storage
    const today = new Date().toISOString().split('T')[0];
    
    absentStudents.forEach(studentId => {
      studentStorage.addAbsence({
        studentId,
        sessionId: selectedSession,
        date: today,
        type: 'absent',
        formateur: user.username,
        validated: false
      });
    });

    lateStudents.forEach(studentId => {
      studentStorage.addAbsence({
        studentId,
        sessionId: selectedSession,
        date: today,
        type: 'retard',
        formateur: user.username,
        validated: false
      });
    });

    toast({
      title: "Absences enregistrées",
      description: `${absentStudents.length} absent(s) et ${lateStudents.length} retard(s) enregistré(s)`,
    });

    // Reset form
    setAbsentStudents([]);
    setLateStudents([]);
  };

  const filteredClasses = classes.filter(classe => classe.filiereId === selectedFiliere);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Saisie des Absences</h1>
          <p className="text-slate-400">Enregistrer les absences et retards de la séance</p>
        </div>
        <div className="text-right bg-slate-800/50 backdrop-blur-xl border border-blue-500/20 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Formateur</p>
          <p className="text-white font-semibold">{user.username}</p>
        </div>
      </div>

      {/* Selection Form */}
      <Card className="bg-slate-800/50 backdrop-blur-xl border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Clock className="w-5 h-5 text-blue-400" />
            <span>Sélection de la Séance</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">Séance</label>
              <Select value={selectedSession} onValueChange={setSelectedSession}>
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue placeholder="Choisir une séance" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  {sessions.map(session => (
                    <SelectItem key={session.id} value={session.value} className="text-white hover:bg-slate-700">
                      {session.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">Filière</label>
              <Select value={selectedFiliere} onValueChange={(value) => {
                setSelectedFiliere(value);
                setSelectedClasse('');
              }}>
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
          </div>
        </CardContent>
      </Card>

      {/* Students List */}
      {students.length > 0 && (
        <Card className="bg-slate-800/50 backdrop-blur-xl border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-400" />
              <span>Liste des Stagiaires</span>
              <span className="text-slate-400 text-sm font-normal">({students.length} stagiaires)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {students.map(student => (
                <div
                  key={student.id}
                  className={`p-4 rounded-lg border transition-all duration-200 ${
                    student.statut !== 'actif'
                      ? 'bg-slate-900/50 border-slate-700'
                      : 'bg-slate-700/30 border-slate-600 hover:bg-slate-700/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                        student.sexe === 'M' ? 'bg-blue-500' : 'bg-pink-500'
                      }`}>
                        {student.prenom[0]}{student.nom[0]}
                      </div>
                      <div>
                        <p className="text-white font-medium">{student.prenom} {student.nom}</p>
                        <p className="text-slate-400 text-sm">{student.email}</p>
                      </div>
                      
                      {/* Status indicators */}
                      <div className="flex space-x-2">
                        {student.statut === 'actif' && (
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
                            Actif
                          </span>
                        )}
                        {student.statut === 'suspendu' && (
                          <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full border border-red-500/30">
                            Suspendu
                          </span>
                        )}
                        {student.statut === 'inactif' && (
                          <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-full border border-gray-500/30">
                            Inactif
                          </span>
                        )}
                      </div>
                    </div>

                    {student.statut === 'actif' && (
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`absent-${student.id}`}
                            checked={absentStudents.includes(student.id)}
                            onCheckedChange={(checked) => handleAbsentChange(student.id, checked as boolean)}
                          />
                          <label htmlFor={`absent-${student.id}`} className="text-slate-300 text-sm">
                            Absent
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`late-${student.id}`}
                            checked={lateStudents.includes(student.id)}
                            onCheckedChange={(checked) => handleLateChange(student.id, checked as boolean)}
                          />
                          <label htmlFor={`late-${student.id}`} className="text-slate-300 text-sm">
                            Retard
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600">
              <div className="text-slate-300 text-sm">
                <span className="font-medium">{absentStudents.length}</span> absent(s) • 
                <span className="font-medium ml-1">{lateStudents.length}</span> retard(s)
              </div>
              <Button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                disabled={absentStudents.length === 0 && lateStudents.length === 0}
              >
                <Send className="w-4 h-4 mr-2" />
                Enregistrer les absences
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AbsenceEntry;
