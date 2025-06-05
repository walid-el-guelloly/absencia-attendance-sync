
import { useState } from 'react';
import { Filiere, Classe, Student } from '@/utils/studentStorage';

export const useNavigationHandlers = () => {
  const [currentView, setCurrentView] = useState<'overview' | 'filiere' | 'classe' | 'student'>('overview');
  const [selectedFiliereObj, setSelectedFiliereObj] = useState<Filiere | null>(null);
  const [selectedClasseObj, setSelectedClasseObj] = useState<Classe | null>(null);
  const [selectedStudentObj, setSelectedStudentObj] = useState<Student | null>(null);

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

  return {
    currentView,
    selectedFiliereObj,
    selectedClasseObj,
    selectedStudentObj,
    handleViewFiliere,
    handleViewClasse,
    handleViewStudent,
    handleBackToOverview,
    handleBackToFiliere
  };
};
