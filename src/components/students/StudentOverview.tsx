
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Users, Plus, Search, Eye, Edit, Trash2, BookOpen, GraduationCap, AlertTriangle, TrendingUp, Building } from 'lucide-react';
import { Filiere, Classe, Student } from '@/utils/studentStorage';

interface StudentOverviewProps {
  filieres: Filiere[];
  classes: Classe[];
  students: Student[];
  onViewFiliere: (filiere: Filiere) => void;
  onViewStudent: (student: Student) => void;
  onOpenDialog: (type: 'filiere' | 'classe' | 'student', item?: any) => void;
  onDelete: (type: 'filiere' | 'classe' | 'student', id: string) => void;
}

const StudentOverview = ({
  filieres,
  classes,
  students,
  onViewFiliere,
  onViewStudent,
  onOpenDialog,
  onDelete
}: StudentOverviewProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFiliere, setSelectedFiliere] = useState('all');

  // Fixed filtering logic
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    if (selectedFiliere === 'all') return matchesSearch;
    
    const studentClasse = classes.find(c => c.id === student.classeId);
    return matchesSearch && studentClasse?.filiereId === selectedFiliere;
  });

  // Fixed filtered filieres for search
  const filteredFilieres = filieres.filter(filiere => 
    filiere.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    filiere.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gestion des Stagiaires</h1>
          <p className="text-slate-400">Gérer les filières, classes et stagiaires</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => onOpenDialog('filiere')} variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10">
            <BookOpen className="w-4 h-4 mr-2" />
            Filière
          </Button>
          <Button onClick={() => onOpenDialog('classe')} variant="outline" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10">
            <GraduationCap className="w-4 h-4 mr-2" />
            Classe
          </Button>
          <Button onClick={() => onOpenDialog('student')} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Stagiaire
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="bg-slate-800/50 backdrop-blur-xl border-blue-500/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher stagiaires, filières, classes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>
            </div>
            <Select value={selectedFiliere} onValueChange={setSelectedFiliere}>
              <SelectTrigger className="w-64 bg-slate-700/50 border-slate-600 text-white">
                <SelectValue placeholder="Filtrer par filière" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="all" className="text-white hover:bg-slate-700">Toutes les filières</SelectItem>
                {filieres.map(filiere => (
                  <SelectItem key={filiere.id} value={filiere.id} className="text-white hover:bg-slate-700">
                    {filiere.code} - {filiere.nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Statistics - modern design */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-xl border-blue-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-400 text-sm font-medium mb-1">Filières</p>
                <p className="text-3xl font-bold text-white">{filieres.length}</p>
                <p className="text-slate-400 text-sm">Programmes disponibles</p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <BookOpen className="w-8 h-8 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 backdrop-blur-xl border-purple-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-400 text-sm font-medium mb-1">Classes</p>
                <p className="text-3xl font-bold text-white">{classes.length}</p>
                <p className="text-slate-400 text-sm">Groupes d'apprentissage</p>
              </div>
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <Building className="w-8 h-8 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 backdrop-blur-xl border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-400 text-sm font-medium mb-1">Stagiaires</p>
                <p className="text-3xl font-bold text-white">{students.length}</p>
                <p className="text-slate-400 text-sm">Étudiants inscrits</p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-xl">
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filières Overview */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Filières</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(searchTerm ? filteredFilieres : filieres).map(filiere => {
            const filiereClasses = classes.filter(c => c.filiereId === filiere.id);
            const filiereStudents = students.filter(s => {
              const studentClasse = filiereClasses.find(c => c.id === s.classeId);
              return studentClasse !== undefined;
            });
            
            return (
              <Card key={filiere.id} className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-xl border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          onViewFiliere(filiere); 
                        }} 
                        className="text-green-400 hover:text-green-300 h-8 w-8 p-0"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          onOpenDialog('filiere', filiere); 
                        }} 
                        className="text-blue-400 hover:text-blue-300 h-8 w-8 p-0"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={(e) => e.stopPropagation()}
                            className="text-red-400 hover:text-red-300 h-8 w-8 p-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-slate-800 border-slate-600 text-white">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="flex items-center space-x-2">
                              <AlertTriangle className="w-5 h-5 text-red-400" />
                              <span>Confirmer la suppression</span>
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-slate-300">
                              Êtes-vous sûr de vouloir supprimer la filière <strong>{filiere.nom}</strong> ?
                              Cette action est irréversible.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
                              Annuler
                            </AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => onDelete('filiere', filiere.id)}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              Supprimer
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  <div onClick={() => onViewFiliere(filiere)}>
                    <h3 className="text-white font-bold text-lg mb-1">{filiere.code}</h3>
                    <p className="text-slate-400 text-sm mb-3 line-clamp-2">{filiere.nom}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs space-y-1">
                        <div className="text-slate-300">{filiereClasses.length} classes</div>
                        <div className="text-slate-300">{filiereStudents.length} stagiaires</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Students List if search term */}
      {searchTerm && filteredStudents.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Stagiaires trouvés</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStudents.map(student => {
              const studentClasse = classes.find(c => c.id === student.classeId);
              const studentFiliere = filieres.find(f => f.id === studentClasse?.filiereId);
              
              return (
                <Card key={student.id} className="bg-slate-800/50 border-slate-600 hover:border-blue-400/40 transition-colors cursor-pointer" onClick={() => onViewStudent(student)}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                        student.sexe === 'M' ? 'bg-blue-500' : 'bg-pink-500'
                      }`}>
                        {student.prenom[0]}{student.nom[0]}
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{student.prenom} {student.nom}</h4>
                        <p className="text-slate-400 text-sm">{studentClasse?.nom}</p>
                        <p className="text-slate-500 text-xs">{studentFiliere?.code}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentOverview;
