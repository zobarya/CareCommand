
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CaregiverDashboard from "./pages/caregiver/CaregiverDashboard";
import PatientDashboard from "./pages/patient/PatientDashboard";
import FamilyDashboard from "./pages/family/FamilyDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/calendar" element={<AdminDashboard />} />
          <Route path="/admin/caregivers" element={<AdminDashboard />} />
          <Route path="/admin/patients" element={<AdminDashboard />} />
          <Route path="/admin/billing" element={<AdminDashboard />} />
          <Route path="/admin/reports" element={<AdminDashboard />} />
          <Route path="/admin/messages" element={<AdminDashboard />} />
          <Route path="/admin/settings" element={<AdminDashboard />} />
          
          {/* Caregiver Routes */}
          <Route path="/caregiver" element={<CaregiverDashboard />} />
          <Route path="/caregiver/schedule" element={<CaregiverDashboard />} />
          <Route path="/caregiver/checklist" element={<CaregiverDashboard />} />
          <Route path="/caregiver/notes" element={<CaregiverDashboard />} />
          <Route path="/caregiver/certifications" element={<CaregiverDashboard />} />
          <Route path="/caregiver/messages" element={<CaregiverDashboard />} />
          <Route path="/caregiver/profile" element={<CaregiverDashboard />} />
          
          {/* Patient Routes */}
          <Route path="/patient" element={<PatientDashboard />} />
          <Route path="/patient/visits" element={<PatientDashboard />} />
          <Route path="/patient/care-plan" element={<PatientDashboard />} />
          <Route path="/patient/requests" element={<PatientDashboard />} />
          <Route path="/patient/feedback" element={<PatientDashboard />} />
          <Route path="/patient/messages" element={<PatientDashboard />} />
          <Route path="/patient/settings" element={<PatientDashboard />} />
          
          {/* Family Routes */}
          <Route path="/family" element={<FamilyDashboard />} />
          <Route path="/family/visits" element={<FamilyDashboard />} />
          <Route path="/family/feedback" element={<FamilyDashboard />} />
          <Route path="/family/requests" element={<FamilyDashboard />} />
          <Route path="/family/messages" element={<FamilyDashboard />} />
          <Route path="/family/notifications" element={<FamilyDashboard />} />
          <Route path="/family/settings" element={<FamilyDashboard />} />
          <Route path="/family/profile" element={<FamilyDashboard />} />
          
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
