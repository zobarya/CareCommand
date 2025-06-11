
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Search, User, Clock, MapPin, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface AddVisitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd?: (visitData: any) => void;
}

interface Patient {
  id: string;
  name: string;
  photo: string;
  address: string;
  region: string;
}

interface Caregiver {
  id: string;
  name: string;
  role: string;
  photo: string;
  rating: number;
  availability: string;
}

const AddVisitDialog: React.FC<AddVisitDialogProps> = ({ open, onOpenChange, onAdd }) => {
  const [formData, setFormData] = useState({
    patient: '',
    date: new Date(),
    startTime: '',
    duration: '',
    serviceType: [],
    region: '',
    specialInstructions: '',
    assignCaregiver: false,
    selectedCaregiver: '',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // Mock data
  const patients: Patient[] = [
    { id: '1', name: 'John Smith', photo: '/placeholder.svg', address: '123 Main St', region: 'North' },
    { id: '2', name: 'Emma Wilson', photo: '/placeholder.svg', address: '456 Oak Ave', region: 'Central' },
    { id: '3', name: 'Robert Brown', photo: '/placeholder.svg', address: '789 Pine St', region: 'South' },
    { id: '4', name: 'Sarah Johnson', photo: '/placeholder.svg', address: '321 Elm Dr', region: 'North' }
  ];

  const serviceTypes = [
    'Medication Management',
    'Physical Therapy',
    'Wound Care',
    'Personal Care',
    'Vital Signs Check',
    'Nursing Assessment',
    'Social Worker Visit'
  ];

  const durations = [
    { value: '30', label: '30 minutes' },
    { value: '60', label: '1 hour' },
    { value: '90', label: '1.5 hours' },
    { value: '120', label: '2 hours' }
  ];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00'
  ];

  const suggestedCaregivers: Caregiver[] = [
    { id: '1', name: 'Sarah Johnson, RN', role: 'Registered Nurse', photo: '/placeholder.svg', rating: 4.8, availability: 'Available' },
    { id: '2', name: 'Mike Chen, LPN', role: 'Licensed Practical Nurse', photo: '/placeholder.svg', rating: 4.6, availability: 'Available' },
    { id: '3', name: 'Lisa Rodriguez, CNA', role: 'Certified Nursing Assistant', photo: '/placeholder.svg', rating: 4.7, availability: 'Limited' }
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedPatient = patients.find(p => p.id === formData.patient);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Auto-detect region when patient is selected
      if (field === 'patient') {
        const patient = patients.find(p => p.id === value);
        if (patient) {
          newData.region = patient.region;
        }
      }
      
      return newData;
    });
  };

  const handleServiceTypeToggle = (serviceType: string) => {
    setFormData(prev => ({
      ...prev,
      serviceType: prev.serviceType.includes(serviceType)
        ? prev.serviceType.filter(s => s !== serviceType)
        : [...prev.serviceType, serviceType]
    }));
  };

  const validateForm = () => {
    const errors = [];
    if (!formData.patient) errors.push('Patient is required');
    if (!formData.startTime) errors.push('Start time is required');
    if (!formData.duration) errors.push('Duration is required');
    if (formData.serviceType.length === 0) errors.push('At least one service type is required');
    
    if (errors.length > 0) {
      toast.error('Please fill in all required fields: ' + errors.join(', '));
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const visitData = {
      ...formData,
      id: `visit_${Date.now()}`,
      patientName: selectedPatient?.name,
      status: formData.assignCaregiver && formData.selectedCaregiver ? 'scheduled' : 'unassigned'
    };

    if (onAdd) {
      onAdd(visitData);
    }
    
    toast.success('Visit created successfully');
    onOpenChange(false);
    
    // Reset form
    setFormData({
      patient: '',
      date: new Date(),
      startTime: '',
      duration: '',
      serviceType: [],
      region: '',
      specialInstructions: '',
      assignCaregiver: false,
      selectedCaregiver: '',
    });
    setSearchTerm('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Add New Visit
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Selection */}
          <div className="space-y-2">
            <Label htmlFor="patient" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Patient *
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="max-h-40 overflow-y-auto border rounded-lg">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className={cn(
                    "flex items-center gap-3 p-3 cursor-pointer hover:bg-muted transition-colors",
                    formData.patient === patient.id && "bg-primary/10 border-primary"
                  )}
                  onClick={() => handleInputChange('patient', patient.id)}
                >
                  <img
                    src={patient.photo}
                    alt={patient.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{patient.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{patient.address}</p>
                  </div>
                  <span className="text-xs bg-secondary px-2 py-1 rounded">{patient.region}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Visit Date *
              </Label>
              <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(formData.date, 'MMM d, yyyy')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => {
                      if (date) {
                        handleInputChange('date', date);
                        setIsDatePickerOpen(false);
                      }
                    }}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Start Time *
              </Label>
              <Select value={formData.startTime} onValueChange={(value) => handleInputChange('startTime', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map(time => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label>Duration *</Label>
            <Select value={formData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                {durations.map(duration => (
                  <SelectItem key={duration.value} value={duration.value}>
                    {duration.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Service Types */}
          <div className="space-y-2">
            <Label>Service Types *</Label>
            <div className="grid grid-cols-2 gap-2">
              {serviceTypes.map(serviceType => (
                <label
                  key={serviceType}
                  className={cn(
                    "flex items-center gap-2 p-2 rounded border cursor-pointer transition-colors",
                    formData.serviceType.includes(serviceType)
                      ? "bg-primary/10 border-primary"
                      : "hover:bg-muted"
                  )}
                >
                  <input
                    type="checkbox"
                    checked={formData.serviceType.includes(serviceType)}
                    onChange={() => handleServiceTypeToggle(serviceType)}
                    className="sr-only"
                  />
                  <span className="text-sm">{serviceType}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Region */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Region
            </Label>
            <Input
              value={formData.region}
              onChange={(e) => handleInputChange('region', e.target.value)}
              placeholder="Auto-detected from patient"
              readOnly={!!selectedPatient}
            />
          </div>

          {/* Special Instructions */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Special Instructions
            </Label>
            <Textarea
              value={formData.specialInstructions}
              onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
              placeholder="Any specific instructions for this visit..."
              rows={3}
            />
          </div>

          {/* Assign Caregiver Toggle */}
          <div className="flex items-center space-x-2">
            <Switch
              id="assign-caregiver"
              checked={formData.assignCaregiver}
              onCheckedChange={(checked) => handleInputChange('assignCaregiver', checked)}
            />
            <Label htmlFor="assign-caregiver">Assign Caregiver?</Label>
          </div>

          {/* AI Caregiver Suggestions */}
          {formData.assignCaregiver && (
            <div className="space-y-3">
              <Label>Suggested Caregivers</Label>
              <div className="space-y-2">
                {suggestedCaregivers.map((caregiver) => (
                  <div
                    key={caregiver.id}
                    className={cn(
                      "flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors",
                      formData.selectedCaregiver === caregiver.id
                        ? "bg-primary/10 border-primary"
                        : "hover:bg-muted"
                    )}
                    onClick={() => handleInputChange('selectedCaregiver', caregiver.id)}
                  >
                    <img
                      src={caregiver.photo}
                      alt={caregiver.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{caregiver.name}</p>
                      <p className="text-sm text-muted-foreground">{caregiver.role}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs">★ {caregiver.rating}</span>
                        <span
                          className={cn(
                            "text-xs px-2 py-1 rounded",
                            caregiver.availability === 'Available'
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          )}
                        >
                          {caregiver.availability}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="w-full sm:w-auto">
              Create Visit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddVisitDialog;
