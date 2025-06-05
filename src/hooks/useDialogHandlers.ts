
import { useState } from 'react';
import { useStudentData } from './useStudentData';

export const useDialogHandlers = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'filiere' | 'classe' | 'student'>('filiere');
  const [editingItem, setEditingItem] = useState<any>(null);

  const {
    handleSaveFiliere,
    handleSaveClasse,
    handleSaveStudent
  } = useStudentData();

  const openDialog = (type: 'filiere' | 'classe' | 'student', item?: any) => {
    console.log('Ouverture du dialog:', type, item);
    setDialogType(type);
    setEditingItem(item || null);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    console.log('Fermeture du dialog');
    setIsDialogOpen(false);
    setEditingItem(null);
  };

  const handleAddClasseToFiliere = (filiereId: string) => {
    console.log('Ajout classe à la filière:', filiereId);
    const newEditingItem = { filiereId };
    console.log('Setting editingItem to:', newEditingItem);
    openDialog('classe', newEditingItem);
  };

  const handleEditClasse = (classe: any) => {
    console.log('Edit classe appelé avec:', classe);
    if (!classe || !classe.id) {
      console.error('Classe invalide pour édition:', classe);
      return;
    }
    openDialog('classe', classe);
  };

  const handleEditStudent = (student: any) => {
    console.log('Edit student appelé:', student);
    if (!student || !student.id) {
      console.error('Student invalide pour édition:', student);
      return;
    }
    openDialog('student', student);
  };

  const handleSaveFiliereWithClose = (data: any) => {
    console.log('Sauvegarde filière avec fermeture:', data);
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
    console.log('Sauvegarde student avec fermeture:', data);
    const success = handleSaveStudent(data, editingItem);
    if (success) {
      closeDialog();
    }
    return success;
  };

  return {
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
  };
};
