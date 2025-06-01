
export interface Student {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  sexe: 'M' | 'F';
  classeId: string;
  dateNaissance: string;
  telephone?: string;
  adresse?: string;
  statut: 'actif' | 'inactif' | 'suspendu';
  createdAt: string;
}

export interface Classe {
  id: string;
  nom: string;
  niveau: string;
  session: string;
  filiereId: string;
  createdAt: string;
}

export interface Filiere {
  id: string;
  nom: string;
  code: string;
  description: string;
  createdAt: string;
}

export interface Absence {
  id: string;
  studentId: string;
  sessionId: string;
  date: string;
  type: 'absent' | 'retard';
  formateur: string;
  validated: boolean;
  validatedBy?: string;
  validatedAt?: string;
  justification?: string;
  createdAt: string;
}

const STORAGE_KEYS = {
  FILIERES: 'absenta_filieres',
  CLASSES: 'absenta_classes',
  STUDENTS: 'absenta_students',
  ABSENCES: 'absenta_absences'
};

export const studentStorage = {
  // Filières
  getFilieres: (): Filiere[] => {
    const data = localStorage.getItem(STORAGE_KEYS.FILIERES);
    return data ? JSON.parse(data) : [];
  },

  saveFilieres: (filieres: Filiere[]) => {
    localStorage.setItem(STORAGE_KEYS.FILIERES, JSON.stringify(filieres));
  },

  addFiliere: (filiere: Omit<Filiere, 'id' | 'createdAt'>) => {
    const filieres = studentStorage.getFilieres();
    const newFiliere: Filiere = {
      ...filiere,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    filieres.push(newFiliere);
    studentStorage.saveFilieres(filieres);
    return newFiliere;
  },

  updateFiliere: (id: string, updates: Partial<Filiere>) => {
    const filieres = studentStorage.getFilieres();
    const index = filieres.findIndex(f => f.id === id);
    if (index !== -1) {
      filieres[index] = { ...filieres[index], ...updates };
      studentStorage.saveFilieres(filieres);
      return filieres[index];
    }
    return null;
  },

  deleteFiliere: (id: string) => {
    const filieres = studentStorage.getFilieres();
    const filtered = filieres.filter(f => f.id !== id);
    studentStorage.saveFilieres(filtered);
    
    // Also delete related classes and students
    const classes = studentStorage.getClasses().filter(c => c.filiereId !== id);
    studentStorage.saveClasses(classes);
    
    const students = studentStorage.getStudents().filter(s => {
      const classe = classes.find(c => c.id === s.classeId);
      return classe !== undefined;
    });
    studentStorage.saveStudents(students);
  },

  // Classes
  getClasses: (): Classe[] => {
    const data = localStorage.getItem(STORAGE_KEYS.CLASSES);
    return data ? JSON.parse(data) : [];
  },

  saveClasses: (classes: Classe[]) => {
    localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(classes));
  },

  addClass: (classe: Omit<Classe, 'id' | 'createdAt'>) => {
    const classes = studentStorage.getClasses();
    const newClasse: Classe = {
      ...classe,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    classes.push(newClasse);
    studentStorage.saveClasses(classes);
    return newClasse;
  },

  updateClasse: (id: string, updates: Partial<Classe>) => {
    const classes = studentStorage.getClasses();
    const index = classes.findIndex(c => c.id === id);
    if (index !== -1) {
      classes[index] = { ...classes[index], ...updates };
      studentStorage.saveClasses(classes);
      return classes[index];
    }
    return null;
  },

  deleteClasse: (id: string) => {
    const classes = studentStorage.getClasses();
    const filtered = classes.filter(c => c.id !== id);
    studentStorage.saveClasses(filtered);
    
    // Also delete related students
    const students = studentStorage.getStudents().filter(s => s.classeId !== id);
    studentStorage.saveStudents(students);
  },

  // Students
  getStudents: (): Student[] => {
    const data = localStorage.getItem(STORAGE_KEYS.STUDENTS);
    return data ? JSON.parse(data) : [];
  },

  saveStudents: (students: Student[]) => {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
  },

  addStudent: (student: Omit<Student, 'id' | 'createdAt'>) => {
    const students = studentStorage.getStudents();
    const newStudent: Student = {
      ...student,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    students.push(newStudent);
    studentStorage.saveStudents(students);
    return newStudent;
  },

  updateStudent: (id: string, updates: Partial<Student>) => {
    const students = studentStorage.getStudents();
    const index = students.findIndex(s => s.id === id);
    if (index !== -1) {
      students[index] = { ...students[index], ...updates };
      studentStorage.saveStudents(students);
      return students[index];
    }
    return null;
  },

  deleteStudent: (id: string) => {
    const students = studentStorage.getStudents();
    const filtered = students.filter(s => s.id !== id);
    studentStorage.saveStudents(filtered);
  },

  getStudentsByClasse: (classeId: string): Student[] => {
    return studentStorage.getStudents().filter(s => s.classeId === classeId);
  },

  // Absences
  getAbsences: (): Absence[] => {
    const data = localStorage.getItem(STORAGE_KEYS.ABSENCES);
    return data ? JSON.parse(data) : [];
  },

  saveAbsences: (absences: Absence[]) => {
    localStorage.setItem(STORAGE_KEYS.ABSENCES, JSON.stringify(absences));
  },

  addAbsence: (absence: Omit<Absence, 'id' | 'createdAt'>) => {
    const absences = studentStorage.getAbsences();
    const newAbsence: Absence = {
      ...absence,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    absences.push(newAbsence);
    studentStorage.saveAbsences(absences);
    return newAbsence;
  },

  validateAbsence: (id: string, validatedBy: string) => {
    const absences = studentStorage.getAbsences();
    const index = absences.findIndex(a => a.id === id);
    if (index !== -1) {
      absences[index] = {
        ...absences[index],
        validated: true,
        validatedBy,
        validatedAt: new Date().toISOString()
      };
      studentStorage.saveAbsences(absences);
      return absences[index];
    }
    return null;
  },

  // Utility functions
  initializeDefaultData: () => {
    // Initialize with some default data if none exists
    if (studentStorage.getFilieres().length === 0) {
      const defaultFilieres = [
        {
          nom: 'Techniques Spécialisées de Développement Informatique',
          code: 'TSDI',
          description: 'Formation en développement logiciel et applications'
        },
        {
          nom: 'Techniques Spécialisées des Réseaux Informatiques',
          code: 'TSRI',
          description: 'Formation en administration réseaux et sécurité'
        }
      ];
      
      defaultFilieres.forEach(filiere => studentStorage.addFiliere(filiere));
    }
  }
};
