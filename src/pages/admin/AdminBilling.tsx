
import React, { useState } from 'react';
import { Download, Filter, Search, CreditCard, FileText, Calendar, ArrowUpRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const AdminBilling: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'invoices' | 'payments'>('invoices');
  const [isNewInvoiceOpen, setIsNewInvoiceOpen] = useState(false);
  
  // Mock data
  const invoices = [
    {
      id: 'INV-2025-001',
      patient: 'John Smith',
      date: 'May 20, 2025',
      dueDate: 'June 19, 2025',
      amount: 1250.00,
      status: 'pending' as const
    },
    {
      id: 'INV-2025-002',
      patient: 'Sarah Johnson',
      date: 'May 18, 2025',
      dueDate: 'June 17, 2025',
      amount: 875.50,
      status: 'paid' as const
    },
    {
      id: 'INV-2025-003',
      patient: 'Robert Williams',
      date: 'May 15, 2025',
      dueDate: 'June 14, 2025',
      amount: 1560.75,
      status: 'overdue' as const
    },
    {
      id: 'INV-2025-004',
      patient: 'Emily Davis',
      date: 'May 12, 2025',
      dueDate: 'June 11, 2025',
      amount: 720.25,
      status: 'paid' as const
    },
  ];
  
  const payments = [
    {
      id: 'PMT-2025-001',
      patient: 'Sarah Johnson',
      date: 'May 19, 2025',
      method: 'Credit Card',
      amount: 875.50,
      status: 'completed' as const
    },
    {
      id: 'PMT-2025-002',
      patient: 'Emily Davis',
      date: 'May 13, 2025',
      method: 'Bank Transfer',
      amount: 720.25,
      status: 'completed' as const
    },
    {
      id: 'PMT-2025-003',
      patient: 'Michael Brown',
      date: 'May 10, 2025',
      method: 'Check',
      amount: 1430.00,
      status: 'processing' as const
    },
  ];
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Pending</span>;
      case 'paid':
      case 'completed':
        return <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Paid</span>;
      case 'overdue':
        return <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Overdue</span>;
      case 'processing':
        return <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Processing</span>;
      default:
        return null;
    }
  };
  
  const billing = {
    totalOutstanding: 3500.75,
    overdue: 1560.75,
    paid: 1595.75
  };
  
  const handleCreateInvoice = () => {
    setIsNewInvoiceOpen(true);
  };
  
  const handleInvoiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Invoice created successfully");
    setIsNewInvoiceOpen(false);
  };
  
  return (
    <Layout title="Billing & Payments" role="admin">
      <div className="flex flex-wrap justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold">Billing & Payments</h2>
          <p className="text-gray-600">Manage invoices and track payments</p>
        </div>
        <div className="flex mt-3 sm:mt-0 space-x-2">
          <Button variant="outline" className="flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="flex items-center" onClick={handleCreateInvoice}>
            <FileText className="h-4 w-4 mr-2" />
            New Invoice
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Outstanding Balance</p>
          <p className="text-2xl font-bold text-gray-900">${billing.totalOutstanding.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
          <div className="mt-2 flex items-center text-gray-500 text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Across {invoices.filter(i => i.status !== 'paid').length} invoices</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Overdue</p>
          <p className="text-2xl font-bold text-red-600">${billing.overdue.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
          <div className="mt-2 flex items-center text-gray-500 text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{invoices.filter(i => i.status === 'overdue').length} overdue invoices</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Paid (Last 30 Days)</p>
          <p className="text-2xl font-bold text-green-600">${billing.paid.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
          <div className="mt-2 flex items-center text-gray-500 text-sm">
            <CreditCard className="h-4 w-4 mr-1" />
            <span>{payments.filter(p => p.status === 'completed').length} payments received</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-100">
          <div className="flex">
            <button
              className={`px-4 py-3 text-sm font-medium ${activeTab === 'invoices' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
              onClick={() => setActiveTab('invoices')}
            >
              Invoices
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium ${activeTab === 'payments' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
              onClick={() => setActiveTab('payments')}
            >
              Payments
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="mb-4 flex flex-col md:flex-row gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input 
                type="text" 
                placeholder={activeTab === 'invoices' ? "Search invoices..." : "Search payments..."} 
                className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg"
              />
            </div>
            <div className="flex-shrink-0">
              <Button variant="outline" className="w-full md:w-auto flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            {activeTab === 'invoices' ? (
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3">Invoice #</th>
                    <th className="px-4 py-3">Patient</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Due Date</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {invoices.map(invoice => (
                    <tr key={invoice.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{invoice.id}</td>
                      <td className="px-4 py-3">{invoice.patient}</td>
                      <td className="px-4 py-3">{invoice.date}</td>
                      <td className="px-4 py-3">{invoice.dueDate}</td>
                      <td className="px-4 py-3">${invoice.amount.toFixed(2)}</td>
                      <td className="px-4 py-3">{getStatusBadge(invoice.status)}</td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-primary hover:text-primary/80">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3">Payment #</th>
                    <th className="px-4 py-3">Patient</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Method</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {payments.map(payment => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{payment.id}</td>
                      <td className="px-4 py-3">{payment.patient}</td>
                      <td className="px-4 py-3">{payment.date}</td>
                      <td className="px-4 py-3">{payment.method}</td>
                      <td className="px-4 py-3">${payment.amount.toFixed(2)}</td>
                      <td className="px-4 py-3">{getStatusBadge(payment.status)}</td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-primary hover:text-primary/80">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <Dialog open={isNewInvoiceOpen} onOpenChange={setIsNewInvoiceOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Invoice</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleInvoiceSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="patient">Patient</Label>
                <select id="patient" className="w-full p-2 border border-gray-300 rounded-lg">
                  <option value="">Select a patient</option>
                  <option value="1">John Smith</option>
                  <option value="2">Sarah Johnson</option>
                  <option value="3">Robert Williams</option>
                  <option value="4">Emily Davis</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount ($)</Label>
                  <Input id="amount" type="number" step="0.01" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input id="dueDate" type="date" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="services">Services</Label>
                <textarea 
                  id="services" 
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  rows={3}
                  placeholder="List services provided..."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Input id="notes" placeholder="Any additional notes..." />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsNewInvoiceOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Invoice</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default AdminBilling;
