
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, GraduationCap, Search, Edit, Trash2, Plus, UserPlus } from 'lucide-react';
import { Classe, Student, Filiere } from '@/utils/studentStorage';

interface ClasseViewProps {
  classe: Classe;
  filiere: Filiere;
  students: Student[];
  onBack: () => void;
  onViewStudent: (student: Student) => void;
  onEditClasse: (classe: Classe) => void;
  onEditStudent: (student: Student) => void;
  onDeleteStudent: (studentId: string) => void;
  onAddStudent: (student: Omit<Student, 'id' | 'createdAt'>) => void;
}

const ClasseView = ({ classe, filiere, students, onBack, onViewStudent, onEditClasse, onEditStudent, onDeleteStudent, onAddStudent }: ClasseViewProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    sexe: '',
    dateNaissance: '',
    telephone: '',
    statut: 'actif' as const
  });
  
  const classeStudents = students.filter(s => s.classeId === classe.id);
  const filteredStudents = classeStudents.filter(student =>
    student.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nom || !formData.prenom || !formData.email || !formData.sexe) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    onAddStudent({
      ...formData,
      classeId: classe.id
    });

    // Reset form
    setFormData({
      nom: '',
      prenom: '',
      email: '',
      sexe: '',
      dateNaissance: '',
      telephone: '',
      statut: 'actif'
    });
    
    setIsAddDialogOpen(false);
  };

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
        <div className="flex space-x-2">
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-green-500 hover:bg-green-600"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Ajouter Stagiaire
          </Button>
          <Button
            onClick={() => onEditClasse(classe)}
            className="bg-purple-500 hover:bg-purple-600"
          >
            Modifier la classe
          </Button>
        </div>
      </div>

      <Card className="bg-slate-800/50 backdrop-blur-xl border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-3">
            <GraduationCap className="w-8 h-8 text-purple-400" />
            <div>
              <h2 className="text-2xl font-bold">{classe.nom}</h2>
              <p className="text-slate-400">{filiere.code} • Niveau {classe.niveau} • Session {classe.session}</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Rechercher un stagiaire..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="mb-4">
            <p className="text-slate-300">
              <span className="font-semibold text-white">{filteredStudents.length}</span> stagiaire(s) 
              {searchTerm && ` trouvé(s) pour "${searchTerm}"`}
            </p>
          </div>

          {filteredStudents.length === 0 ? (
            <div className="text-center py-12">
              <GraduationCap className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">
                {searchTerm ? 'Aucun stagiaire trouvé' : 'Aucun stagiaire dans cette classe'}
              </p>
              {!searchTerm && (
                <Button
                  onClick={() => setIsAddDialogOpen(true)}
                  className="mt-4 bg-green-500 hover:bg-green-600"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Ajouter le premier stagiaire
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStudents.map(student => (
                <Card key={student.id} className="bg-slate-700/30 border-slate-600 hover:bg-slate-700/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                        student.sexe === 'M' ? 'bg-blue-500' : 'bg-pink-500'
                      }`}>
                        {student.prenom[0]}{student.nom[0]}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{student.prenom} {student.nom}</h4>
                        <p className="text-slate-400 text-sm">{student.email}</p>
                      </div>
                    </div>
                    
                    <div className="mb-3">
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

                    <div className="flex justify-between space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onViewStudent(student)}
                        className="text-blue-400 hover:text-blue-300 flex-1"
                      >
                        Voir
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onEditStudent(student)}
                        className="text-green-400 hover:text-green-300"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onDeleteStudent(student.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog pour ajouter un stagiaire */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-600 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>Ajouter un stagiaire à {classe.nom}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">Prénom *</label>
                <Input
                  value={formData.prenom}
                  onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                  className="bg-slate-700/50 border-slate-600 text-white"
                  placeholder="Ahmed"
                  required
                />
              </div>
              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">Nom *</label>
                <Input
                  value={formData.nom}
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
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-white"
                placeholder="ahmed.benali@email.com"
                type="email"
                required
              />
            </div>
            
            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">Sexe *</label>
              <Select value={formData.sexe} onValueChange={(value) => setFormData({ ...formData, sexe: value })}>
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue placeholder="Choisir le sexe" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="M" className="text-white hover:bg-slate-700">Masculin</SelectItem>
                  <SelectItem value="F" className="text-white hover:bg-slate-700">Féminin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">Date de naissance</label>
              <Input
                value={formData.dateNaissance}
                onChange={(e) => setFormData({ ...formData, dateNaissance: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-white"
                type="date"
              />
            </div>
            
            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">Téléphone</label>
              <Input
                value={formData.telephone}
                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-white"
                placeholder="+212 6XX XXX XXX"
              />
            </div>
            
            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">Statut</label>
              <Select value={formData.statut} onValueChange={(value: 'actif' | 'inactif' | 'suspendu') => setFormData({ ...formData, statut: value })}>
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

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)} className="border-slate-600 text-slate-300">
                Annuler
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                Ajouter
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClasseView;
