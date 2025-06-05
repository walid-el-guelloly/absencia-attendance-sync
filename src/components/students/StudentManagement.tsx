
import { useStudentData } from '@/hooks/useStudentData';
import { useNavigationHandlers } from '@/hooks/useNavigationHandlers';
import { useDialogHandlers } from '@/hooks/useDialogHandlers';
import ViewRenderer from './ViewRenderer';
import FormDialog from './FormDialog';

const StudentManagement = () => {
  const {
    filieres,
    classes,
    students,
    handleAddStudentToClasse,
    handleDelete,
    handleDeleteStudents
  } = useStudentData();

  const {
    currentView,
    selectedFiliereObj,
    selectedClasseObj,
    selectedStudentObj,
    handleViewFiliere,
    handleViewClasse,
    handleViewStudent,
    handleBackToOverview,
    handleBackToFiliere
  } = useNavigationHandlers();

  const {
    isDialogOpen,
    dialogType,
    editingItem,
    openDialog,
    closeDialog,
    handleAddClasseToFiliere,
    handleEditClasse,
    handleEditStudent,
    handleSaveFiliereWithClose,
    handleSaveClasseWithClose,
    handleSaveStudentWithClose
  } = useDialogHandlers();

  return (
    <>
      <ViewRenderer
        currentView={currentView}
        selectedFiliereObj={selectedFiliereObj}
        selectedClasseObj={selectedClasseObj}
        selectedStudentObj={selectedStudentObj}
        filieres={filieres}
        classes={classes}
        students={students}
        onViewFiliere={handleViewFiliere}
        onViewClasse={handleViewClasse}
        onViewStudent={handleViewStudent}
        onBackToOverview={handleBackToOverview}
        onBackToFiliere={handleBackToFiliere}
        onOpenDialog={openDialog}
        onDelete={handleDelete}
        onDeleteStudents={handleDeleteStudents}
        onAddStudentToClasse={handleAddStudentToClasse}
        onAddClasseToFiliere={handleAddClasseToFiliere}
        onEditClasse={handleEditClasse}
        onEditStudent={handleEditStudent}
      />

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
