
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Mail, Phone, Calendar, MapPin } from 'lucide-react';
import { Student, Classe, Filiere } from '@/utils/studentStorage';

interface StudentDetailsProps {
  student: Student;
  classe: Classe;
  filiere: Filiere;
  onBack: () => void;
  onEdit: (student: Student) => void;
}

const StudentDetails = ({ student, classe, filiere, onBack, onEdit }: StudentDetailsProps) => {
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
        <Button
          onClick={() => onEdit(student)}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Modifier
        </Button>
      </div>

      <Card className="bg-slate-800/50 backdrop-blur-xl border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
              student.sexe === 'M' ? 'bg-blue-500' : 'bg-pink-500'
            }`}>
              {student.prenom[0]}{student.nom[0]}
            </div>
            <div>
              <h2 className="text-xl font-bold">{student.prenom} {student.nom}</h2>
              <p className="text-slate-400">{filiere.code} - {classe.nom}</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg">
                <Mail className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-slate-400 text-sm">Email</p>
                  <p className="text-white">{student.email}</p>
                </div>
              </div>
              
              {student.telephone && (
                <div className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg">
                  <Phone className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-slate-400 text-sm">Téléphone</p>
                    <p className="text-white">{student.telephone}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg">
                <Calendar className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-slate-400 text-sm">Date de naissance</p>
                  <p className="text-white">
                    {new Date(student.dateNaissance).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg">
                <User className="w-5 h-5 text-orange-400" />
                <div>
                  <p className="text-slate-400 text-sm">Statut</p>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    student.statut === 'actif' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : student.statut === 'inactif'
                      ? 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {student.statut}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDetails;
