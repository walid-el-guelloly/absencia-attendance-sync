
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filiere, Classe } from '@/utils/studentStorage';

interface FormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'filiere' | 'classe' | 'student';
  editingItem: any;
  filieres: Filiere[];
  classes: Classe[];
  onSaveFiliere: (data: any, editingItem: any) => boolean;
  onSaveClasse: (data: any, editingItem: any) => boolean;
  onSaveStudent: (data: any, editingItem: any) => boolean;
}

const FormDialog = ({ 
  isOpen, 
  onClose, 
  type, 
  editingItem, 
  filieres, 
  classes, 
  onSaveFiliere, 
  onSaveClasse, 
  onSaveStudent 
}: FormDialogProps) => {
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem);
    } else {
      setFormData(
        type === 'student' ? { statut: 'actif' } : {}
      );
    }
  }, [editingItem, type, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (type === 'filiere' && (!formData.code || !formData.nom)) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    if (type === 'classe' && (!formData.nom || !formData.filiereId || !formData.niveau)) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    if (type === 'student' && (!formData.nom || !formData.prenom || !formData.email || !formData.classeId || !formData.sexe)) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    let success = false;
    switch (type) {
      case 'filiere':
        success = onSaveFiliere(formData, editingItem);
        break;
      case 'classe':
        success = onSaveClasse(formData, editingItem);
        break;
      case 'student':
        success = onSaveStudent(formData, editingItem);
        break;
    }

    if (success) {
      onClose();
    }
  };

  const renderForm = () => {
    switch (type) {
      case 'filiere':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">Code *</label>
              <Input
                value={formData.code || ''}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-white"
                placeholder="TSDI"
                required
              />
            </div>
            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">Nom *</label>
              <Input
                value={formData.nom || ''}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-white"
                placeholder="Techniques Spécialisées..."
                required
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
              <label className="text-slate-300 text-sm font-medium mb-2 block">Filière *</label>
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
              <label className="text-slate-300 text-sm font-medium mb-2 block">Nom *</label>
              <Input
                value={formData.nom || ''}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-white"
                placeholder="TSDI 1ère année"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">Niveau *</label>
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
                <label className="text-slate-300 text-sm font-medium mb-2 block">Prénom *</label>
                <Input
                  value={formData.prenom || ''}
                  onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                  className="bg-slate-700/50 border-slate-600 text-white"
                  placeholder="Ahmed"
                  required
                />
              </div>
              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">Nom *</label>
                <Input
                  value={formData.nom || ''}
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
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-white"
                placeholder="ahmed.benali@email.com"
                type="email"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">Sexe *</label>
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
                <label className="text-slate-300 text-sm font-medium mb-2 block">Classe *</label>
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

export default FormDialog;
