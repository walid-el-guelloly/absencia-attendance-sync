
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, Plus, Search, Eye } from 'lucide-react';

const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFiliere, setSelectedFiliere] = useState('all');

  // Mock data
  const filieres = [
    { id: 'tsdi', name: 'TSDI', fullName: 'Techniques Spécialisées de Développement Informatique', classes: 2, students: 85 },
    { id: 'tsri', name: 'TSRI', fullName: 'Techniques Spécialisées des Réseaux Informatiques', classes: 2, students: 72 },
    { id: 'tdm', name: 'TDM', fullName: 'Techniques de Développement Multimédia', classes: 1, students: 28 },
    { id: 'tmsir', name: 'TMSIR', fullName: 'Technicien Multimédia et Sites Internet', classes: 1, students: 35 }
  ];

  const classes = [
    { id: 1, name: 'TSDI 1ère année', filiere: 'TSDI', niveau: '1', session: '2024', students: 42 },
    { id: 2, name: 'TSDI 2ème année', filiere: 'TSDI', niveau: '2', session: '2024', students: 43 },
    { id: 3, name: 'TSRI 1ère année', filiere: 'TSRI', niveau: '1', session: '2024', students: 38 },
    { id: 4, name: 'TSRI 2ème année', filiere: 'TSRI', niveau: '2', session: '2024', students: 34 }
  ];

  const students = [
    { id: 1, nom: 'Ahmed Benali', classe: 'TSDI 2ème année', email: 'ahmed.benali@email.com', sexe: 'M', absences: 2, statut: 'actif' },
    { id: 2, nom: 'Fatima Zahra', classe: 'TSDI 2ème année', email: 'fatima.zahra@email.com', sexe: 'F', absences: 0, statut: 'actif' },
    { id: 3, nom: 'Mohammed Alami', classe: 'TSRI 1ère année', email: 'mohammed.alami@email.com', sexe: 'M', absences: 5, statut: 'alerte' },
    { id: 4, nom: 'Aicha Bennani', classe: 'TDM 1ère année', email: 'aicha.bennani@email.com', sexe: 'F', absences: 1, statut: 'actif' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gestion des Stagiaires</h1>
          <p className="text-slate-400">Gérer les filières, classes et stagiaires</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter
        </Button>
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
            <select
              value={selectedFiliere}
              onChange={(e) => setSelectedFiliere(e.target.value)}
              className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-md text-white"
            >
              <option value="all">Toutes les filières</option>
              {filieres.map(filiere => (
                <option key={filiere.id} value={filiere.id}>{filiere.name}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Filières Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filieres.map(filiere => (
          <Card key={filiere.id} className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-xl border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-[1.02]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                  {filiere.classes} classes
                </span>
              </div>
              <h3 className="text-white font-bold text-lg mb-1">{filiere.name}</h3>
              <p className="text-slate-400 text-sm mb-3 line-clamp-2">{filiere.fullName}</p>
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold">{filiere.students} stagiaires</span>
                <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Classes List */}
      <Card className="bg-slate-800/50 backdrop-blur-xl border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-400" />
            <span>Classes</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {classes.map(classe => (
              <div key={classe.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 hover:bg-slate-700/50 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">{classe.name}</h4>
                    <p className="text-slate-400 text-sm">
                      Filière {classe.filiere} • Niveau {classe.niveau} • Session {classe.session}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-white font-semibold">{classe.students} stagiaires</span>
                    <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card className="bg-slate-800/50 backdrop-blur-xl border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-400" />
            <span>Stagiaires</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-600">
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Nom</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Classe</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Email</th>
                  <th className="text-center py-3 px-4 text-slate-300 font-medium">Absences</th>
                  <th className="text-center py-3 px-4 text-slate-300 font-medium">Statut</th>
                  <th className="text-center py-3 px-4 text-slate-300 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.id} className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors duration-200">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${
                          student.sexe === 'M' ? 'bg-blue-500' : 'bg-pink-500'
                        }`}>
                          {student.nom.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-white">{student.nom}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-300">{student.classe}</td>
                    <td className="py-3 px-4 text-slate-300">{student.email}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        student.absences > 2 
                          ? 'bg-red-500/20 text-red-400' 
                          : student.absences > 0 
                          ? 'bg-orange-500/20 text-orange-400'
                          : 'bg-green-500/20 text-green-400'
                      }`}>
                        {student.absences}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        student.statut === 'alerte' 
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                          : 'bg-green-500/20 text-green-400 border border-green-500/30'
                      }`}>
                        {student.statut}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentManagement;
