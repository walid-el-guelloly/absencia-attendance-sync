
import { Button } from '@/components/ui/button';
import { Filiere, Classe, Student } from '@/utils/studentStorage';
import FiliereView from './FiliereView';
import ClasseView from './ClasseView';
import StudentDetails from './StudentDetails';
import StudentOverview from './StudentOverview';

interface ViewRendererProps {
  currentView: 'overview' | 'filiere' | 'classe' | 'student';
  selectedFiliereObj: Filiere | null;
  selectedClasseObj: Classe | null;
  selectedStudentObj: Student | null;
  filieres: Filiere[];
  classes: Classe[];
  students: Student[];
  onViewFiliere: (filiere: Filiere) => void;
  onViewClasse: (classe: Classe) => void;
  onViewStudent: (student: Student) => void;
  onBackToOverview: () => void;
  onBackToFiliere: () => void;
  onOpenDialog: (type: 'filiere' | 'classe' | 'student', item?: any) => void;
  onDelete: (type: 'filiere' | 'classe' | 'student', id: string) => void;
  onDeleteStudents: (studentIds: string[]) => void;
  onAddStudentToClasse: (data: Omit<Student, 'id' | 'createdAt'>) => void;
  onAddClasseToFiliere: (filiereId: string) => void;
  onEditClasse: (classe: Classe) => void;
  onEditStudent: (student: Student) => void;
}

const ViewRenderer = ({
  currentView,
  selectedFiliereObj,
  selectedClasseObj,
  selectedStudentObj,
  filieres,
  classes,
  students,
  onViewFiliere,
  onViewClasse,
  onViewStudent,
  onBackToOverview,
  onBackToFiliere,
  onOpenDialog,
  onDelete,
  onDeleteStudents,
  onAddStudentToClasse,
  onAddClasseToFiliere,
  onEditClasse,
  onEditStudent
}: ViewRendererProps) => {
  // Student view
  if (currentView === 'student' && selectedStudentObj) {
    const student = selectedStudentObj;
    const classe = classes.find(c => c.id === student.classeId);
    const filiere = filieres.find(f => f.id === classe?.filiereId);
    
    if (!classe || !filiere) {
      console.error('Classe ou filière non trouvée pour le stagiaire:', student);
      return (
        <div className="text-center py-12">
          <p className="text-red-400">Erreur: Données manquantes pour ce stagiaire</p>
          <Button onClick={onBackToOverview} className="mt-4">
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
        onBack={selectedClasseObj ? onBackToFiliere : onBackToOverview}
        onEdit={onEditStudent}
      />
    );
  }

  // Classe view
  if (currentView === 'classe' && selectedClasseObj) {
    const classe = selectedClasseObj;
    const filiere = filieres.find(f => f.id === classe.filiereId);
    
    if (!filiere) {
      console.error('Filière non trouvée pour la classe:', classe);
      return (
        <div className="text-center py-12">
          <p className="text-red-400">Erreur: Filière non trouvée pour cette classe</p>
          <Button onClick={onBackToOverview} className="mt-4">
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
        onBack={selectedFiliereObj ? () => onViewFiliere(selectedFiliereObj) : onBackToOverview}
        onViewStudent={onViewStudent}
        onEditClasse={onEditClasse}
        onEditStudent={onEditStudent}
        onDeleteStudent={(studentId) => onDelete('student', studentId)}
        onDeleteStudents={onDeleteStudents}
        onAddStudent={onAddStudentToClasse}
      />
    );
  }

  // Filiere view
  if (currentView === 'filiere' && selectedFiliereObj) {
    return (
      <FiliereView
        filiere={selectedFiliereObj}
        classes={classes}
        students={students}
        onBack={onBackToOverview}
        onViewClasse={onViewClasse}
        onDeleteClasse={(classeId) => onDelete('classe', classeId)}
        onAddClasse={onAddClasseToFiliere}
      />
    );
  }

  // Overview view
  return (
    <StudentOverview
      filieres={filieres}
      classes={classes}
      students={students}
      onViewFiliere={onViewFiliere}
      onViewStudent={onViewStudent}
      onOpenDialog={onOpenDialog}
      onDelete={onDelete}
    />
  );
};

export default ViewRenderer;
