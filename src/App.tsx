
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCalendar from "./pages/admin/AdminCalendar";
import AdminCaregivers from "./pages/admin/AdminCaregivers";
import AdminPatients from "./pages/admin/AdminPatients";
import AdminBilling from "./pages/admin/AdminBilling";
import AdminReports from "./pages/admin/AdminReports";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminSettings from "./pages/admin/AdminSettings";
import CaregiverDashboard from "./pages/caregiver/CaregiverDashboard";
import CaregiverSchedule from "./pages/caregiver/CaregiverSchedule";
import CaregiverChecklist from "./pages/caregiver/CaregiverChecklist";
import CaregiverNotes from "./pages/caregiver/CaregiverNotes";
import CaregiverCertifications from "./pages/caregiver/CaregiverCertifications";
import CaregiverMessages from "./pages/caregiver/CaregiverMessages";
import CaregiverProfile from "./pages/caregiver/CaregiverProfile";
import PatientDashboard from "./pages/patient/PatientDashboard";
import PatientVisits from "./pages/patient/PatientVisits";
import PatientCarePlan from "./pages/patient/PatientCarePlan";
import PatientRequests from "./pages/patient/PatientRequests";
import PatientFeedback from "./pages/patient/PatientFeedback";
import PatientMessages from "./pages/patient/PatientMessages";
import PatientSettings from "./pages/patient/PatientSettings";
import FamilyDashboard from "./pages/family/FamilyDashboard";
import FamilyVisits from "./pages/family/FamilyVisits";
import FamilyFeedback from "./pages/family/FamilyFeedback";
import FamilyRequests from "./pages/family/FamilyRequests";
import FamilyMessages from "./pages/family/FamilyMessages";
import FamilyNotifications from "./pages/family/FamilyNotifications";
import FamilySettings from "./pages/family/FamilySettings";
import FamilyProfile from "./pages/family/FamilyProfile";
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
          <Route path="/admin/calendar" element={<AdminCalendar />} />
          <Route path="/admin/caregivers" element={<AdminCaregivers />} />
          <Route path="/admin/patients" element={<AdminPatients />} />
          <Route path="/admin/billing" element={<AdminBilling />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/messages" element={<AdminMessages />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          
          {/* Caregiver Routes */}
          <Route path="/caregiver" element={<CaregiverDashboard />} />
          <Route path="/caregiver/schedule" element={<CaregiverSchedule />} />
          <Route path="/caregiver/checklist" element={<CaregiverChecklist />} />
          <Route path="/caregiver/notes" element={<CaregiverNotes />} />
          <Route path="/caregiver/certifications" element={<CaregiverCertifications />} />
          <Route path="/caregiver/messages" element={<CaregiverMessages />} />
          <Route path="/caregiver/profile" element={<CaregiverProfile />} />
          
          {/* Patient Routes */}
          <Route path="/patient" element={<PatientDashboard />} />
          <Route path="/patient/visits" element={<PatientVisits />} />
          <Route path="/patient/care-plan" element={<PatientCarePlan />} />
          <Route path="/patient/requests" element={<PatientRequests />} />
          <Route path="/patient/feedback" element={<PatientFeedback />} />
          <Route path="/patient/messages" element={<PatientMessages />} />
          <Route path="/patient/settings" element={<PatientSettings />} />
          
          {/* Family Routes */}
          <Route path="/family" element={<FamilyDashboard />} />
          <Route path="/family/visits" element={<FamilyVisits />} />
          <Route path="/family/feedback" element={<FamilyFeedback />} />
          <Route path="/family/requests" element={<FamilyRequests />} />
          <Route path="/family/messages" element={<FamilyMessages />} />
          <Route path="/family/notifications" element={<FamilyNotifications />} />
          <Route path="/family/settings" element={<FamilySettings />} />
          <Route path="/family/profile" element={<FamilyProfile />} />
          
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
