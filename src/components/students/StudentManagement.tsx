import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Filiere, Classe, Student } from '@/utils/studentStorage';
import { useStudentData } from '@/hooks/useStudentData';
import FiliereView from './FiliereView';
import ClasseView from './ClasseView';
import StudentDetails from './StudentDetails';
import StudentOverview from './StudentOverview';
import FormDialog from './FormDialog';

const StudentManagement = () => {
  const {
    filieres,
    classes,
    students,
    handleSaveFiliere,
    handleSaveClasse,
    handleSaveStudent,
    handleAddStudentToClasse,
    handleDelete,
    handleDeleteStudents
  } = useStudentData();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'filiere' | 'classe' | 'student'>('filiere');
  const [editingItem, setEditingItem] = useState<any>(null);
  
  // Navigation states
  const [currentView, setCurrentView] = useState<'overview' | 'filiere' | 'classe' | 'student'>('overview');
  const [selectedFiliereObj, setSelectedFiliereObj] = useState<Filiere | null>(null);
  const [selectedClasseObj, setSelectedClasseObj] = useState<Classe | null>(null);
  const [selectedStudentObj, setSelectedStudentObj] = useState<Student | null>(null);

  const openDialog = (type: 'filiere' | 'classe' | 'student', item?: any) => {
    console.log('Ouverture du dialog:', type, item);
    setDialogType(type);
    setEditingItem(item || null);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingItem(null);
  };

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

  // Handler pour ajouter une classe à une filière spécifique
  const handleAddClasseToFiliere = (filiereId: string) => {
    console.log('Ajout classe à la filière:', filiereId);
    const newEditingItem = { filiereId };
    console.log('Setting editingItem to:', newEditingItem);
    setDialogType('classe');
    setEditingItem(newEditingItem);
    setIsDialogOpen(true);
  };

  // Handlers for editing from sub-views
  const handleEditClasse = (classe: Classe) => {
    console.log('Edit classe appelé:', classe);
    setDialogType('classe');
    setEditingItem(classe);
    setIsDialogOpen(true);
  };

  const handleEditStudent = (student: Student) => {
    console.log('Edit student appelé:', student);
    setDialogType('student');
    setEditingItem(student);
    setIsDialogOpen(true);
  };

  // Save handlers with dialog closing
  const handleSaveFiliereWithClose = (data: any) => {
    const success = handleSaveFiliere(data, editingItem);
    if (success) {
      closeDialog();
    }
    return success;
  };

  const handleSaveClasseWithClose = (data: any) => {
    console.log('Sauvegarde classe avec fermeture:', data, editingItem);
    const success = handleSaveClasse(data, editingItem);
    if (success) {
      closeDialog();
    }
    return success;
  };

  const handleSaveStudentWithClose = (data: any) => {
    const success = handleSaveStudent(data, editingItem);
    if (success) {
      closeDialog();
    }
    return success;
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
        onDeleteClasse={(classeId) => handleDelete('classe', classeId)}
        onAddClasse={handleAddClasseToFiliere}
      />
    );
  }

  // Overview/main view
  return (
    <>
      <StudentOverview
        filieres={filieres}
        classes={classes}
        students={students}
        onViewFiliere={handleViewFiliere}
        onViewStudent={handleViewStudent}
        onOpenDialog={openDialog}
        onDelete={handleDelete}
      />

      {/* Dialog for adding/editing */}
      <FormDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        type={dialogType}
        editingItem={editingItem}
        filieres={filieres}
        classes={classes}
        onSaveFiliere={handleSaveFiliereWithClose}
        onSaveClasse={handleSaveClasseWithClose}
        onSaveStudent={handleSaveStudentWithClose}
      />
    </>
  );
};

export default StudentManagement;
