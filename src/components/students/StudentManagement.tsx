
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Plus, Search, Eye, Edit, Trash2, BookOpen, GraduationCap } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { studentStorage, Filiere, Classe, Student } from '@/utils/studentStorage';

const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFiliere, setSelectedFiliere] = useState('all');
  const [filieres, setFilieres] = useState<Filiere[]>([]);
  const [classes, setClasses] = useState<Classe[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'filiere' | 'classe' | 'student'>('filiere');
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    studentStorage.initializeDefaultData();
    loadData();
  }, []);

  const loadData = () => {
    setFilieres(studentStorage.getFilieres());
    setClasses(studentStorage.getClasses());
    setStudents(studentStorage.getStudents());
  };

  const openDialog = (type: 'filiere' | 'classe' | 'student', item?: any) => {
    setDialogType(type);
    setEditingItem(item || null);
    setIsDialogOpen(true);
  };

  const handleSaveFiliere = (data: any) => {
    if (editingItem) {
      studentStorage.updateFiliere(editingItem.id, data);
      toast({ title: "Filière modifiée", description: "La filière a été mise à jour avec succès" });
    } else {
      studentStorage.addFiliere(data);
      toast({ title: "Filière ajoutée", description: "La nouvelle filière a été créée avec succès" });
    }
    loadData();
    setIsDialogOpen(false);
  };

  const handleSaveClasse = (data: any) => {
    if (editingItem) {
      studentStorage.updateClasse(editingItem.id, data);
      toast({ title: "Classe modifiée", description: "La classe a été mise à jour avec succès" });
    } else {
      studentStorage.addClass(data);
      toast({ title: "Classe ajoutée", description: "La nouvelle classe a été créée avec succès" });
    }
    loadData();
    setIsDialogOpen(false);
  };

  const handleSaveStudent = (data: any) => {
    if (editingItem) {
      studentStorage.updateStudent(editingItem.id, data);
      toast({ title: "Stagiaire modifié", description: "Le stagiaire a été mis à jour avec succès" });
    } else {
      studentStorage.addStudent(data);
      toast({ title: "Stagiaire ajouté", description: "Le nouveau stagiaire a été créé avec succès" });
    }
    loadData();
    setIsDialogOpen(false);
  };

  const handleDelete = (type: 'filiere' | 'classe' | 'student', id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
      switch (type) {
        case 'filiere':
          studentStorage.deleteFiliere(id);
          toast({ title: "Filière supprimée", variant: "destructive" });
          break;
        case 'classe':
          studentStorage.deleteClasse(id);
          toast({ title: "Classe supprimée", variant: "destructive" });
          break;
        case 'student':
          studentStorage.deleteStudent(id);
          toast({ title: "Stagiaire supprimé", variant: "destructive" });
          break;
      }
      loadData();
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.prenom.toLowerCase().includes(searchTerm.toLowerCase());
    if (selectedFiliere === 'all') return matchesSearch;
    
    const studentClasse = classes.find(c => c.id === student.classeId);
    return matchesSearch && studentClasse?.filiereId === selectedFiliere;
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gestion des Stagiaires</h1>
          <p className="text-slate-400">Gérer les filières, classes et stagiaires</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => openDialog('filiere')} variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10">
            <BookOpen className="w-4 h-4 mr-2" />
            Filière
          </Button>
          <Button onClick={() => openDialog('classe')} variant="outline" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10">
            <GraduationCap className="w-4 h-4 mr-2" />
            Classe
          </Button>
          <Button onClick={() => openDialog('student')} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Stagiaire
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="bg-slate-800/50 backdrop-blur-xl border-blue-500/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
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
            <Select value={selectedFiliere} onValueChange={setSelectedFiliere}>
              <SelectTrigger className="w-64 bg-slate-700/50 border-slate-600 text-white">
                <SelectValue placeholder="Filtrer par filière" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="all" className="text-white hover:bg-slate-700">Toutes les filières</SelectItem>
                {filieres.map(filiere => (
                  <SelectItem key={filiere.id} value={filiere.id} className="text-white hover:bg-slate-700">
                    {filiere.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Filières Overview */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Filières</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filieres.map(filiere => {
            const filiereClasses = classes.filter(c => c.filiereId === filiere.id);
            const filiereStudents = students.filter(s => {
              const studentClasse = filiereClasses.find(c => c.id === s.classeId);
              return studentClasse !== undefined;
            });
            
            return (
              <Card key={filiere.id} className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-xl border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-[1.02]">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm" onClick={() => openDialog('filiere', filiere)} className="text-blue-400 hover:text-blue-300 h-8 w-8 p-0">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete('filiere', filiere.id)} className="text-red-400 hover:text-red-300 h-8 w-8 p-0">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1">{filiere.code}</h3>
                  <p className="text-slate-400 text-sm mb-3 line-clamp-2">{filiere.nom}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs space-y-1">
                      <div className="text-slate-300">{filiereClasses.length} classes</div>
                      <div className="text-slate-300">{filiereStudents.length} stagiaires</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Classes List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Classes</h2>
        </div>
        <Card className="bg-slate-800/50 backdrop-blur-xl border-blue-500/20">
          <CardContent className="p-6">
            <div className="space-y-3">
              {classes.map(classe => {
                const filiere = filieres.find(f => f.id === classe.filiereId);
                const classeStudents = students.filter(s => s.classeId === classe.id);
                
                return (
                  <div key={classe.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 hover:bg-slate-700/50 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-medium">{classe.nom}</h4>
                        <p className="text-slate-400 text-sm">
                          {filiere?.code} • Niveau {classe.niveau} • Session {classe.session}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-white font-semibold">{classeStudents.length} stagiaires</span>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm" onClick={() => openDialog('classe', classe)} className="text-blue-400 hover:text-blue-300 h-8 w-8 p-0">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete('classe', classe.id)} className="text-red-400 hover:text-red-300 h-8 w-8 p-0">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Students Table */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Stagiaires</h2>
          <span className="text-slate-400">{filteredStudents.length} stagiaires</span>
        </div>
        <Card className="bg-slate-800/50 backdrop-blur-xl border-blue-500/20">
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-600">
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Nom</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Classe</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Email</th>
                    <th className="text-center py-3 px-4 text-slate-300 font-medium">Statut</th>
                    <th className="text-center py-3 px-4 text-slate-300 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map(student => {
                    const studentClasse = classes.find(c => c.id === student.classeId);
                    
                    return (
                      <tr key={student.id} className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors duration-200">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${
                              student.sexe === 'M' ? 'bg-blue-500' : 'bg-pink-500'
                            }`}>
                              {student.prenom[0]}{student.nom[0]}
                            </div>
                            <span className="text-white">{student.prenom} {student.nom}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-slate-300">{studentClasse?.nom}</td>
                        <td className="py-3 px-4 text-slate-300">{student.email}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            student.statut === 'actif' 
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                              : student.statut === 'inactif'
                              ? 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                              : 'bg-red-500/20 text-red-400 border border-red-500/30'
                          }`}>
                            {student.statut}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex justify-center space-x-1">
                            <Button variant="ghost" size="sm" onClick={() => openDialog('student', student)} className="text-blue-400 hover:text-blue-300 h-8 w-8 p-0">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDelete('student', student.id)} className="text-red-400 hover:text-red-300 h-8 w-8 p-0">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dialog for adding/editing */}
      <FormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        type={dialogType}
        editingItem={editingItem}
        filieres={filieres}
        classes={classes}
        onSaveFiliere={handleSaveFiliere}
        onSaveClasse={handleSaveClasse}
        onSaveStudent={handleSaveStudent}
      />
    </div>
  );
};

// Form Dialog Component
const FormDialog = ({ isOpen, onClose, type, editingItem, filieres, classes, onSaveFiliere, onSaveClasse, onSaveStudent }: any) => {
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem);
    } else {
      setFormData({});
    }
  }, [editingItem, type]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    switch (type) {
      case 'filiere':
        onSaveFiliere(formData);
        break;
      case 'classe':
        onSaveClasse(formData);
        break;
      case 'student':
        onSaveStudent(formData);
        break;
    }
  };

  const renderForm = () => {
    switch (type) {
      case 'filiere':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">Code</label>
              <Input
                value={formData.code || ''}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-white"
                placeholder="TSDI"
              />
            </div>
            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">Nom</label>
              <Input
                value={formData.nom || ''}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-white"
                placeholder="Techniques Spécialisées..."
              />
            </div>
            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">Description</label>
              <Input
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-white"
                placeholder="Description de la filière"
              />
            </div>
          </div>
        );

      case 'classe':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">Filière</label>
              <Select value={formData.filiereId || ''} onValueChange={(value) => setFormData({ ...formData, filiereId: value })}>
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue placeholder="Choisir une filière" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  {filieres.map((filiere: Filiere) => (
                    <SelectItem key={filiere.id} value={filiere.id} className="text-white hover:bg-slate-700">
                      {filiere.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">Nom</label>
              <Input
                value={formData.nom || ''}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-white"
                placeholder="TSDI 1ère année"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">Niveau</label>
                <Select value={formData.niveau || ''} onValueChange={(value) => setFormData({ ...formData, niveau: value })}>
                  <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue placeholder="Niveau" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="1" className="text-white hover:bg-slate-700">1ère année</SelectItem>
                    <SelectItem value="2" className="text-white hover:bg-slate-700">2ème année</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">Session</label>
                <Input
                  value={formData.session || ''}
                  onChange={(e) => setFormData({ ...formData, session: e.target.value })}
                  className="bg-slate-700/50 border-slate-600 text-white"
                  placeholder="2024"
                />
              </div>
            </div>
          </div>
        );

      case 'student':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">Prénom</label>
                <Input
                  value={formData.prenom || ''}
                  onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                  className="bg-slate-700/50 border-slate-600 text-white"
                  placeholder="Ahmed"
                />
              </div>
              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">Nom</label>
                <Input
                  value={formData.nom || ''}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  className="bg-slate-700/50 border-slate-600 text-white"
                  placeholder="Benali"
                />
              </div>
            </div>
            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">Email</label>
              <Input
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-white"
                placeholder="ahmed.benali@email.com"
                type="email"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">Sexe</label>
                <Select value={formData.sexe || ''} onValueChange={(value) => setFormData({ ...formData, sexe: value })}>
                  <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue placeholder="Sexe" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="M" className="text-white hover:bg-slate-700">Masculin</SelectItem>
                    <SelectItem value="F" className="text-white hover:bg-slate-700">Féminin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">Classe</label>
                <Select value={formData.classeId || ''} onValueChange={(value) => setFormData({ ...formData, classeId: value })}>
                  <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue placeholder="Classe" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    {classes.map((classe: Classe) => (
                      <SelectItem key={classe.id} value={classe.id} className="text-white hover:bg-slate-700">
                        {classe.nom}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">Date de naissance</label>
              <Input
                value={formData.dateNaissance || ''}
                onChange={(e) => setFormData({ ...formData, dateNaissance: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-white"
                type="date"
              />
            </div>
            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">Téléphone (optionnel)</label>
              <Input
                value={formData.telephone || ''}
                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-white"
                placeholder="+212 6XX XXX XXX"
              />
            </div>
            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">Statut</label>
              <Select value={formData.statut || 'actif'} onValueChange={(value) => setFormData({ ...formData, statut: value })}>
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
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-600 text-white max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingItem ? 'Modifier' : 'Ajouter'} {
              type === 'filiere' ? 'une filière' :
              type === 'classe' ? 'une classe' : 'un stagiaire'
            }
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderForm()}
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose} className="border-slate-600 text-slate-300">
              Annuler
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              {editingItem ? 'Modifier' : 'Ajouter'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StudentManagement;
