
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { studentStorage, Filiere, Classe, Student } from '@/utils/studentStorage';

export const useStudentData = () => {
  const [filieres, setFilieres] = useState<Filiere[]>([]);
  const [classes, setClasses] = useState<Classe[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    console.log('Initialisation du hook useStudentData');
    studentStorage.initializeDefaultData();
    loadData();
  }, [refreshKey]);

  const loadData = () => {
    console.log('Chargement des données dans useStudentData');
    const filieresData = studentStorage.getFilieres();
    const classesData = studentStorage.getClasses();
    const studentsData = studentStorage.getStudents();
    
    console.log('Données chargées:', { filieresData, classesData, studentsData });
    
    setFilieres(filieresData);
    setClasses(classesData);
    setStudents(studentsData);
  };

  const forceRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleSaveFiliere = (data: any, editingItem: any) => {
    console.log('Sauvegarde filière:', data);
    try {
      if (editingItem) {
        studentStorage.updateFiliere(editingItem.id, data);
        toast({ title: "Filière modifiée", description: "La filière a été mise à jour avec succès" });
      } else {
        studentStorage.addFiliere(data);
        toast({ title: "Filière ajoutée", description: "La nouvelle filière a été créée avec succès" });
      }
      forceRefresh();
      return true;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la filière:', error);
      toast({ 
        title: "Erreur", 
        description: "Une erreur est survenue lors de la sauvegarde",
        variant: "destructive" 
      });
      return false;
    }
  };

  const handleSaveClasse = (data: any, editingItem: any) => {
    console.log('Sauvegarde classe:', data);
    try {
      if (editingItem) {
        studentStorage.updateClasse(editingItem.id, data);
        toast({ title: "Classe modifiée", description: "La classe a été mise à jour avec succès" });
      } else {
        studentStorage.addClass(data);
        toast({ title: "Classe ajoutée", description: "La nouvelle classe a été créée avec succès" });
      }
      forceRefresh();
      return true;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la classe:', error);
      toast({ 
        title: "Erreur", 
        description: "Une erreur est survenue lors de la sauvegarde",
        variant: "destructive" 
      });
      return false;
    }
  };

  const handleSaveStudent = (data: any, editingItem: any) => {
    console.log('Sauvegarde stagiaire:', data);
    try {
      if (editingItem) {
        studentStorage.updateStudent(editingItem.id, data);
        toast({ title: "Stagiaire modifié", description: "Le stagiaire a été mis à jour avec succès" });
      } else {
        studentStorage.addStudent(data);
        toast({ title: "Stagiaire ajouté", description: "Le nouveau stagiaire a été créé avec succès" });
      }
      forceRefresh();
      return true;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du stagiaire:', error);
      toast({ 
        title: "Erreur", 
        description: "Une erreur est survenue lors de la sauvegarde",
        variant: "destructive" 
      });
      return false;
    }
  };

  const handleAddStudentToClasse = (data: Omit<Student, 'id' | 'createdAt'>) => {
    console.log('Ajout stagiaire à une classe:', data);
    try {
      studentStorage.addStudent(data);
      toast({ title: "Stagiaire ajouté", description: "Le nouveau stagiaire a été ajouté à la classe avec succès" });
      forceRefresh();
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
      forceRefresh();
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
      forceRefresh();
    } catch (error) {
      console.error('Erreur lors de la suppression multiple:', error);
      toast({ 
        title: "Erreur", 
        description: "Une erreur est survenue lors de la suppression",
        variant: "destructive" 
      });
    }
  };

  return {
    filieres,
    classes,
    students,
    loadData,
    forceRefresh,
    handleSaveFiliere,
    handleSaveClasse,
    handleSaveStudent,
    handleAddStudentToClasse,
    handleDelete,
    handleDeleteStudents
  };
};
