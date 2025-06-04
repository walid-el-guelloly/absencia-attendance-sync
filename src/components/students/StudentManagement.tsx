import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Users, Plus, Search, Eye, Edit, Trash2, BookOpen, GraduationCap, AlertTriangle, TrendingUp, Building, Calendar } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { studentStorage, Filiere, Classe, Student } from '@/utils/studentStorage';
import FiliereView from './FiliereView';
import ClasseView from './ClasseView';
import StudentDetails from './StudentDetails';

const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFiliere, setSelectedFiliere] = useState('all');
  const [filieres, setFilieres] = useState<Filiere[]>([]);
  const [classes, setClasses] = useState<Classe[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'filiere' | 'classe' | 'student'>('filiere');
  const [editingItem, setEditingItem] = useState<any>(null);
  
  // Navigation states
  const [currentView, setCurrentView] = useState<'overview' | 'filiere' | 'classe' | 'student'>('overview');
  const [selectedFiliereObj, setSelectedFiliereObj] = useState<Filiere | null>(null);
  const [selectedClasseObj, setSelectedClasseObj] = useState<Classe | null>(null);
  const [selectedStudentObj, setSelectedStudentObj] = useState<Student | null>(null);

  useEffect(() => {
    console.log('Initialisation du composant StudentManagement');
    studentStorage.initializeDefaultData();
    loadData();
  }, []);

  const loadData = () => {
    console.log('Chargement des données dans StudentManagement');
    const filieresData = studentStorage.getFilieres();
    const classesData = studentStorage.getClasses();
    const studentsData = studentStorage.getStudents();
    
    console.log('Données chargées:', { filieresData, classesData, studentsData });
    
    setFilieres(filieresData);
    setClasses(classesData);
    setStudents(studentsData);
  };

  const openDialog = (type: 'filiere' | 'classe' | 'student', item?: any) => {
    console.log('Ouverture du dialog:', type, item);
    setDialogType(type);
    setEditingItem(item || null);
    setIsDialogOpen(true);
  };

  const handleSaveFiliere = (data: any) => {
    console.log('Sauvegarde filière:', data);
    try {
      if (editingItem) {
        studentStorage.updateFiliere(editingItem.id, data);
        toast({ title: "Filière modifiée", description: "La filière a été mise à jour avec succès" });
      } else {
        studentStorage.addFiliere(data);
        toast({ title: "Filière ajoutée", description: "La nouvelle filière a été créée avec succès" });
      }
      loadData();
      setIsDialogOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la filière:', error);
      toast({ 
        title: "Erreur", 
        description: "Une erreur est survenue lors de la sauvegarde",
        variant: "destructive" 
      });
    }
  };

  const handleSaveClasse = (data: any) => {
    console.log('Sauvegarde classe:', data);
    try {
      if (editingItem) {
        studentStorage.updateClasse(editingItem.id, data);
        toast({ title: "Classe modifiée", description: "La classe a été mise à jour avec succès" });
      } else {
        studentStorage.addClass(data);
        toast({ title: "Classe ajoutée", description: "La nouvelle classe a été créée avec succès" });
      }
      loadData();
      setIsDialogOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la classe:', error);
      toast({ 
        title: "Erreur", 
        description: "Une erreur est survenue lors de la sauvegarde",
        variant: "destructive" 
      });
    }
  };

  const handleSaveStudent = (data: any) => {
    console.log('Sauvegarde stagiaire:', data);
    try {
      if (editingItem) {
        studentStorage.updateStudent(editingItem.id, data);
        toast({ title: "Stagiaire modifié", description: "Le stagiaire a été mis à jour avec succès" });
      } else {
        studentStorage.addStudent(data);
        toast({ title: "Stagiaire ajouté", description: "Le nouveau stagiaire a été créé avec succès" });
      }
      loadData();
      setIsDialogOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du stagiaire:', error);
      toast({ 
        title: "Erreur", 
        description: "Une erreur est survenue lors de la sauvegarde",
        variant: "destructive" 
      });
    }
  };

  const handleAddStudentToClasse = (data: Omit<Student, 'id' | 'createdAt'>) => {
    console.log('Ajout stagiaire à une classe:', data);
    try {
      studentStorage.addStudent(data);
      toast({ title: "Stagiaire ajouté", description: "Le nouveau stagiaire a été ajouté à la classe avec succès" });
      loadData();
    } catch (error) {
      console.error('Erreur lors de l\'ajout du stagiaire:', error);
      toast({ 
        title: "Erreur", 
        description: "Une erreur est survenue lors de l'ajout",
        variant: "destructive" 
      });
    }
  };

  const handleDelete = (type: 'filiere' | 'classe' | 'student', id: string) => {
    console.log('Tentative de suppression:', type, id);
    try {
      switch (type) {
        case 'filiere':
          // Check if filiere has classes
          const filiereClasses = classes.filter(c => c.filiereId === id);
          if (filiereClasses.length > 0) {
            toast({ 
              title: "Suppression impossible", 
              description: "Cette filière contient des classes. Supprimez d'abord les classes.",
              variant: "destructive" 
            });
            return;
          }
          studentStorage.deleteFiliere(id);
          toast({ title: "Filière supprimée", variant: "destructive" });
          break;
        case 'classe':
          // Check if classe has students
          const classeStudents = students.filter(s => s.classeId === id);
          if (classeStudents.length > 0) {
            toast({ 
              title: "Suppression impossible", 
              description: "Cette classe contient des stagiaires. Supprimez d'abord les stagiaires.",
              variant: "destructive" 
            });
            return;
          }
          studentStorage.deleteClasse(id);
          toast({ title: "Classe supprimée", variant: "destructive" });
          break;
        case 'student':
          studentStorage.deleteStudent(id);
          toast({ title: "Stagiaire supprimé", variant: "destructive" });
          break;
      }
      loadData();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast({ 
        title: "Erreur", 
        description: "Une erreur est survenue lors de la suppression",
        variant: "destructive" 
      });
    }
  };

  const handleDeleteStudents = (studentIds: string[]) => {
    console.log('Suppression multiple de stagiaires:', studentIds);
    try {
      studentIds.forEach(id => {
        studentStorage.deleteStudent(id);
      });
      toast({ 
        title: "Stagiaires supprimés", 
        description: `${studentIds.length} stagiaire(s) supprimé(s) avec succès`,
        variant: "destructive" 
      });
      loadData();
    } catch (error) {
      console.error('Erreur lors de la suppression multiple:', error);
      toast({ 
        title: "Erreur", 
        description: "Une erreur est survenue lors de la suppression",
        variant: "destructive" 
      });
    }
  };

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

  // Navigation handlers
  const handleViewFiliere = (filiere: Filiere) => {
    console.log('Affichage filière:', filiere);
    setSelectedFiliereObj(filiere);
    setCurrentView('filiere');
  };

  const handleViewClasse = (classe: Classe) => {
    console.log('Affichage classe:', classe);
    setSelectedClasseObj(classe);
    setCurrentView('classe');
  };

  const handleViewStudent = (student: Student) => {
    console.log('Affichage stagiaire:', student);
    setSelectedStudentObj(student);
    setCurrentView('student');
  };

  const handleBackToOverview = () => {
    setCurrentView('overview');
    setSelectedFiliereObj(null);
    setSelectedClasseObj(null);
    setSelectedStudentObj(null);
  };

  const handleBackToFiliere = () => {
    setCurrentView('filiere');
    setSelectedClasseObj(null);
    setSelectedStudentObj(null);
  };

  // Handlers for editing from sub-views
  const handleEditFiliere = (filiere: Filiere) => {
    console.log('Edit filière appelé depuis FiliereView:', filiere);
    setDialogType('filiere');
    setEditingItem(filiere);
    setIsDialogOpen(true);
  };

  const handleEditClasse = (classe: Classe) => {
    console.log('Edit classe appelé depuis ClasseView:', classe);
    setDialogType('classe');
    setEditingItem(classe);
    setIsDialogOpen(true);
  };

  const handleEditStudent = (student: Student) => {
    console.log('Edit student appelé depuis ClasseView:', student);
    setDialogType('student');
    setEditingItem(student);
    setIsDialogOpen(true);
  };

  // Render different views
  if (currentView === 'student' && selectedStudentObj) {
    const student = selectedStudentObj;
    const classe = classes.find(c => c.id === student.classeId);
    const filiere = filieres.find(f => f.id === classe?.filiereId);
    
    if (!classe || !filiere) {
      console.error('Classe ou filière non trouvée pour le stagiaire:', student);
      return (
        <div className="text-center py-12">
          <p className="text-red-400">Erreur: Données manquantes pour ce stagiaire</p>
          <Button onClick={handleBackToOverview} className="mt-4">
            Retour à l'aperçu
          </Button>
        </div>
      );
    }
    
    return (
      <StudentDetails
        student={student}
        classe={classe}
        filiere={filiere}
        onBack={selectedClasseObj ? handleBackToFiliere : handleBackToOverview}
        onEdit={handleEditStudent}
      />
    );
  }

  if (currentView === 'classe' && selectedClasseObj) {
    const classe = selectedClasseObj;
    const filiere = filieres.find(f => f.id === classe.filiereId);
    
    if (!filiere) {
      console.error('Filière non trouvée pour la classe:', classe);
      return (
        <div className="text-center py-12">
          <p className="text-red-400">Erreur: Filière non trouvée pour cette classe</p>
          <Button onClick={handleBackToOverview} className="mt-4">
            Retour à l'aperçu
          </Button>
        </div>
      );
    }
    
    return (
      <ClasseView
        classe={classe}
        filiere={filiere}
        students={students}
        onBack={selectedFiliereObj ? () => setCurrentView('filiere') : handleBackToOverview}
        onViewStudent={handleViewStudent}
        onEditClasse={handleEditClasse}
        onEditStudent={handleEditStudent}
        onDeleteStudent={(studentId) => handleDelete('student', studentId)}
        onDeleteStudents={handleDeleteStudents}
        onAddStudent={handleAddStudentToClasse}
      />
    );
  }

  if (currentView === 'filiere' && selectedFiliereObj) {
    return (
      <FiliereView
        filiere={selectedFiliereObj}
        classes={classes}
        students={students}
        onBack={handleBackToOverview}
        onViewClasse={handleViewClasse}
        onEditFiliere={handleEditFiliere}
        onDeleteClasse={(classeId) => handleDelete('classe', classeId)}
      />
    );
  }

  // Overview/main view
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gestion des Stagiaires</h1>
          <p className="text-slate-400">Gérer les filières, classes et stagiaires</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => openDialog('filiere')} variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10">
            <BookOpen className="w-4 h-4 mr-2" />
            Filière
          </Button>
          <Button onClick={() => openDialog('classe')} variant="outline" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10">
            <GraduationCap className="w-4 h-4 mr-2" />
            Classe
          </Button>
          <Button onClick={() => openDialog('student')} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
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
                          handleViewFiliere(filiere); 
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
                          openDialog('filiere', filiere); 
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
                              onClick={() => handleDelete('filiere', filiere.id)}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              Supprimer
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  <div onClick={() => handleViewFiliere(filiere)}>
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
                <Card key={student.id} className="bg-slate-800/50 border-slate-600 hover:border-blue-400/40 transition-colors cursor-pointer" onClick={() => handleViewStudent(student)}>
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

      {/* Dialog for adding/editing */}
      <FormDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingItem(null);
        }}
        type={dialogType}
        editingItem={editingItem}
        filieres={filieres}
        classes={classes}
        onSaveFiliere={handleSaveFiliere}
        onSaveClasse={handleSaveClasse}
        onSaveStudent={handleSaveStudent}
      />
    </div>
  );
};

// Form Dialog Component
const FormDialog = ({ isOpen, onClose, type, editingItem, filieres, classes, onSaveFiliere, onSaveClasse, onSaveStudent }: any) => {
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem);
    } else {
      setFormData(
        type === 'student' ? { statut: 'actif' } : {}
      );
    }
  }, [editingItem, type, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (type === 'filiere' && (!formData.code || !formData.nom)) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    if (type === 'classe' && (!formData.nom || !formData.filiereId || !formData.niveau)) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    if (type === 'student' && (!formData.nom || !formData.prenom || !formData.email || !formData.classeId || !formData.sexe)) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    switch (type) {
      case 'filiere':
        onSaveFiliere(formData);
        break;
      case 'classe':
        onSaveClasse(formData);
        break;
      case 'student':
        onSaveStudent(formData);
        break;
    }
  };

  const renderForm = () => {
    switch (type) {
      case 'filiere':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">Code *</label>
              <Input
                value={formData.code || ''}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-white"
                placeholder="TSDI"
                required
              />
            </div>
            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">Nom *</label>
              <Input
                value={formData.nom || ''}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-white"
                placeholder="Techniques Spécialisées..."
                required
              />
            </div>
            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">Description</label>
              <Input
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-white"
                placeholder="Description de la filière"
              />
            </div>
          </div>
        );

      case 'classe':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">Filière *</label>
              <Select value={formData.filiereId || ''} onValueChange={(value) => setFormData({ ...formData, filiereId: value })}>
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue placeholder="Choisir une filière" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  {filieres.map((filiere: Filiere) => (
                    <SelectItem key={filiere.id} value={filiere.id} className="text-white hover:bg-slate-700">
                      {filiere.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">Nom *</label>
              <Input
                value={formData.nom || ''}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-white"
                placeholder="TSDI 1ère année"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">Niveau *</label>
                <Select value={formData.niveau || ''} onValueChange={(value) => setFormData({ ...formData, niveau: value })}>
                  <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue placeholder="Niveau" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="1" className="text-white hover:bg-slate-700">1ère année</SelectItem>
                    <SelectItem value="2" className="text-white hover:bg-slate-700">2ème année</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">Session</label>
                <Input
                  value={formData.session || ''}
                  onChange={(e) => setFormData({ ...formData, session: e.target.value })}
                  className="bg-slate-700/50 border-slate-600 text-white"
                  placeholder="2024"
                />
              </div>
            </div>
          </div>
        );

      case 'student':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">Prénom *</label>
                <Input
                  value={formData.prenom || ''}
                  onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                  className="bg-slate-700/50 border-slate-600 text-white"
                  placeholder="Ahmed"
                  required
                />
              </div>
              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">Nom *</label>
                <Input
                  value={formData.nom || ''}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  className="bg-slate-700/50 border-slate-600 text-white"
                  placeholder="Benali"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">Email *</label>
              <Input
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-white"
                placeholder="ahmed.benali@email.com"
                type="email"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">Sexe *</label>
                <Select value={formData.sexe || ''} onValueChange={(value) => setFormData({ ...formData, sexe: value })}>
                  <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue placeholder="Sexe" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="M" className="text-white hover:bg-slate-700">Masculin</SelectItem>
                    <SelectItem value="F" className="text-white hover:bg-slate-700">Féminin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">Classe *</label>
                <Select value={formData.classeId || ''} onValueChange={(value) => setFormData({ ...formData, classeId: value })}>
                  <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue placeholder="Classe" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    {classes.map((classe: Classe) => (
                      <SelectItem key={classe.id} value={classe.id} className="text-white hover:bg-slate-700">
                        {classe.nom}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">Date de naissance</label>
              <Input
                value={formData.dateNaissance || ''}
                onChange={(e) => setFormData({ ...formData, dateNaissance: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-white"
                type="date"
              />
            </div>
            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">Téléphone (optionnel)</label>
              <Input
                value={formData.telephone || ''}
                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-white"
                placeholder="+212 6XX XXX XXX"
              />
            </div>
            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">Statut</label>
              <Select value={formData.statut || 'actif'} onValueChange={(value) => setFormData({ ...formData, statut: value })}>
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="actif" className="text-white hover:bg-slate-700">Actif</SelectItem>
                  <SelectItem value="inactif" className="text-white hover:bg-slate-700">Inactif</SelectItem>
                  <SelectItem value="suspendu" className="text-white hover:bg-slate-700">Suspendu</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-600 text-white max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingItem ? 'Modifier' : 'Ajouter'} {
              type === 'filiere' ? 'une filière' :
              type === 'classe' ? 'une classe' : 'un stagiaire'
            }
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderForm()}
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose} className="border-slate-600 text-slate-300">
              Annuler
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              {editingItem ? 'Modifier' : 'Ajouter'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StudentManagement;
