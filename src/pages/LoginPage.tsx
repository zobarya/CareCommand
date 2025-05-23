
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  role: z.enum(["admin", "caregiver", "patient", "family"], {
    required_error: "Please select a role.",
  }),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type FormValues = z.infer<typeof formSchema>;

const LoginPage: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "admin",
      email: "",
      password: "",
    },
  });

  const handleLogin = (data: FormValues) => {
    toast({
      title: "Logged in successfully",
      description: `You are now logged in as ${data.role}`,
    });
    
    // Redirect based on role using React Router
    switch(data.role) {
      case 'admin':
        navigate('/admin');
        break;
      case 'caregiver':
        navigate('/caregiver');
        break;
      case 'patient':
        navigate('/patient');
        break;
      case 'family':
        navigate('/family');
        break;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Hero section */}
      <div className="bg-secondary md:w-1/2 p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Homecare</h1>
          <p className="text-xl mb-8">Healthcare coordination platform for homecare agencies, caregivers, patients, and families.</p>
          <div className="space-y-6 text-sm">
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-secondary font-bold mr-3 flex-shrink-0">1</div>
              <div>
                <h3 className="font-bold mb-1">Streamlined Care Coordination</h3>
                <p className="text-white/80">Schedule visits, track care delivery, and maintain clear communication between all stakeholders.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-secondary font-bold mr-3 flex-shrink-0">2</div>
              <div>
                <h3 className="font-bold mb-1">Real-time Updates</h3>
                <p className="text-white/80">Access up-to-date information on patient care, caregiver activities, and visit status.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-secondary font-bold mr-3 flex-shrink-0">3</div>
              <div>
                <h3 className="font-bold mb-1">Role-based Access</h3>
                <p className="text-white/80">Tailored interfaces designed specifically for agencies, caregivers, patients, and family members.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Login section */}
      <div className="md:w-1/2 p-8 flex flex-col justify-center bg-gray-50">
        <div className="max-w-md mx-auto w-full">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Sign In</h2>
            <p className="text-gray-600">Access your Homecare account</p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Role</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="admin">Agency Admin</SelectItem>
                        <SelectItem value="caregiver">Caregiver</SelectItem>
                        <SelectItem value="patient">Patient</SelectItem>
                        <SelectItem value="family">Family Member</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-primary hover:underline">
                    Forgot your password?
                  </a>
                </div>
              </div>
              
              <Button className="w-full" type="submit">
                Sign in
              </Button>
            </form>
          </Form>
            
          <div className="mt-6">
            <p className="text-center text-sm text-gray-600">Demo Access:</p>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <Button 
                variant="outline" 
                onClick={() => form.setValue('role', 'admin')}
                className={form.getValues('role') === 'admin' ? 'bg-accent/20' : ''}
              >
                Agency Admin
              </Button>
              <Button 
                variant="outline" 
                onClick={() => form.setValue('role', 'caregiver')}
                className={form.getValues('role') === 'caregiver' ? 'bg-accent/20' : ''}
              >
                Caregiver
              </Button>
              <Button 
                variant="outline" 
                onClick={() => form.setValue('role', 'patient')}
                className={form.getValues('role') === 'patient' ? 'bg-accent/20' : ''}
              >
                Patient
              </Button>
              <Button 
                variant="outline" 
                onClick={() => form.setValue('role', 'family')}
                className={form.getValues('role') === 'family' ? 'bg-accent/20' : ''}
              >
                Family Member
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
