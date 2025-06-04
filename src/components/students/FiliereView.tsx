
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { ArrowLeft, GraduationCap, Users, Trash2, AlertTriangle, Plus } from 'lucide-react';
import { Filiere, Classe, Student } from '@/utils/studentStorage';

interface FiliereViewProps {
  filiere: Filiere;
  classes: Classe[];
  students: Student[];
  onBack: () => void;
  onViewClasse: (classe: Classe) => void;
  onDeleteClasse?: (classeId: string) => void;
  onAddClasse?: (filiereId: string) => void;
}

const FiliereView = ({ filiere, classes, students, onBack, onViewClasse, onDeleteClasse, onAddClasse }: FiliereViewProps) => {
  const filiereClasses = classes.filter(c => c.filiereId === filiere.id);
  const filiereStudents = students.filter(s => {
    const studentClasse = filiereClasses.find(c => c.id === s.classeId);
    return studentClasse !== undefined;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          onClick={onBack}
          variant="outline"
          className="border-slate-600 text-slate-300 hover:bg-slate-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>
        {onAddClasse && (
          <Button
            onClick={() => onAddClasse(filiere.id)}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une classe
          </Button>
        )}
      </div>

      <Card className="bg-slate-800/50 backdrop-blur-xl border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <GraduationCap className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{filiere.code}</h2>
              <p className="text-slate-400">{filiere.nom}</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-300 mb-6">{filiere.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-slate-700/30 rounded-lg text-center">
              <GraduationCap className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{filiereClasses.length}</p>
              <p className="text-slate-400 text-sm">Classes</p>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-lg text-center">
              <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{filiereStudents.length}</p>
              <p className="text-slate-400 text-sm">Stagiaires</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold">Classes de cette filière</h3>
            {filiereClasses.length === 0 ? (
              <p className="text-slate-400 text-center py-8">Aucune classe dans cette filière</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filiereClasses.map(classe => {
                  const classeStudents = students.filter(s => s.classeId === classe.id);
                  return (
                    <Card key={classe.id} className="bg-slate-700/30 border-slate-600 hover:bg-slate-700/50 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-white font-medium">{classe.nom}</h4>
                          {onDeleteClasse && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
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
                                    Êtes-vous sûr de vouloir supprimer la classe <strong>{classe.nom}</strong> ?
                                    Cette action est irréversible.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
                                    Annuler
                                  </AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => onDeleteClasse(classe.id)}
                                    className="bg-red-500 hover:bg-red-600"
                                  >
                                    Supprimer
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                        </div>
                        <p className="text-slate-400 text-sm mb-3">
                          Niveau {classe.niveau} • Session {classe.session}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-blue-400 font-semibold">{classeStudents.length} stagiaires</span>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="text-blue-400 hover:text-blue-300"
                            onClick={() => onViewClasse(classe)}
                          >
                            Voir →
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FiliereView;
