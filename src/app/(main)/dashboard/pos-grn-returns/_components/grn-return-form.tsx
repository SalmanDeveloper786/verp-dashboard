"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Search, ScanLine, Trash2, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

import { GrnReturnFormState } from "../types";

interface GRNReturnFormProps {
  initialData?: GrnReturnFormState;
  returnId?: string;
}

const defaultFormState: GrnReturnFormState = {
  supplierName: "Seha Plus",
  originalGrnNumber: "GRN-SM34-0626-00020",
  returnDate: new Date().toISOString().split('T')[0],
  paymentModeRef: "",
  returnInvoiceType: "",
  reasonForReturn: "",
  remarks: "",
  items: [
    {
      id: "1",
      sno: 1,
      itemCode: "SKU-10023",
      itemName: "Paracetamol 500mg",
      originalGrnQty: 500,
      maxReturnableQty: 500,
      currentReturnQty: 10,
      unitPrice: 1.50,
      grossAmount: 15.00,
      taxAmount: 0.75,
      netReturnTotal: 15.75,
      batchNumber: "BN-2024-X1",
      expiryDate: "2026-12-31"
    },
    {
      id: "2",
      sno: 2,
      itemCode: "SKU-10024",
      itemName: "Ibuprofen 400mg",
      originalGrnQty: 300,
      maxReturnableQty: 300,
      currentReturnQty: 5,
      unitPrice: 2.00,
      grossAmount: 10.00,
      taxAmount: 0.50,
      netReturnTotal: 10.50,
      batchNumber: "BN-2024-X2",
      expiryDate: "2027-01-15"
    }
  ]
};

export function GRNReturnForm({ initialData, returnId }: GRNReturnFormProps) {
  const router = useRouter();
  const { open } = useSidebar();
  const isEdit = !!initialData || !!returnId;
  const [formState, setFormState] = useState<GrnReturnFormState>(initialData || defaultFormState);

  const totalItems = formState.items.length;
  const totalQty = formState.items.reduce((sum, item) => sum + item.currentReturnQty, 0);
  const grossAmount = formState.items.reduce((sum, item) => sum + item.grossAmount, 0);
  const taxAmount = formState.items.reduce((sum, item) => sum + item.taxAmount, 0);
  const netAmount = formState.items.reduce((sum, item) => sum + item.netReturnTotal, 0);

  const handleQtyChange = (itemId: string, qty: number) => {
    setFormState(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === itemId) {
          const validQty = Math.min(Math.max(qty, 0), item.maxReturnableQty);
          return {
            ...item,
            currentReturnQty: validQty,
            grossAmount: validQty * item.unitPrice,
            // Assuming 5% tax for mock calculation
            taxAmount: validQty * item.unitPrice * 0.05,
            netReturnTotal: (validQty * item.unitPrice) + (validQty * item.unitPrice * 0.05)
          };
        }
        return item;
      })
    }));
  };

  const handleRemoveItem = (itemId: string) => {
    setFormState(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50 dark:bg-transparent pb-40 md:pb-24">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <Button variant="ghost" className="pl-0 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100" asChild>
          <Link href="/dashboard/pos-grn-returns">
            <ChevronLeft className="mr-1 size-4" />
            Back
          </Link>
        </Button>
        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />
        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {isEdit ? `Edit GRN Return [${returnId || 'RET-0001'}]` : "Complete GRN Return details (Against Selected GRN)"}
        </h1>
      </div>

      {/* Dynamic Form Field Grid */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
          
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Supplier Name</label>
            <Input value={formState.supplierName} readOnly className="bg-slate-50/50 text-slate-500 dark:bg-slate-900/50" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Original GRN Number</label>
            <Input value={formState.originalGrnNumber} readOnly className="bg-slate-50/50 text-slate-500 font-medium dark:bg-slate-900/50" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Return Date</label>
            <Input type="date" value={formState.returnDate} onChange={e => setFormState({...formState, returnDate: e.target.value})} />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Payment Mode Ref</label>
            <Select value={formState.paymentModeRef} onValueChange={(v: any) => setFormState({...formState, paymentModeRef: v})}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="Credit">Credit Note</SelectItem>
                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Return Invoice Type</label>
            <Select value={formState.returnInvoiceType} onValueChange={(v: any) => setFormState({...formState, returnInvoiceType: v})}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cost Price">Cost Price</SelectItem>
                <SelectItem value="Retail Price">Retail Price</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 lg:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Reason for Return</label>
            <Select value={formState.reasonForReturn} onValueChange={(v) => setFormState({...formState, reasonForReturn: v})}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Damaged Goods">Damaged Goods</SelectItem>
                <SelectItem value="Shortage">Shortage</SelectItem>
                <SelectItem value="Near Expiry">Near Expiry</SelectItem>
                <SelectItem value="Quality Issue">Quality Issue</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-3 lg:col-span-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Remarks</label>
              <span className="text-xs text-slate-400">{formState.remarks.length}/500</span>
            </div>
            <Textarea 
              placeholder="Add any additional remarks here..."
              maxLength={500}
              className="min-h-[80px] resize-none"
              value={formState.remarks}
              onChange={(e) => setFormState({...formState, remarks: e.target.value})}
            />
          </div>

        </div>
      </div>

      {/* Scan/Search Action Bar */}
      <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="relative flex items-center">
          <ScanLine className="absolute left-4 size-5 text-slate-400" />
          <Input 
            placeholder="Scan return item barcode - Ctrl+Q to focus" 
            className="pl-12 h-12 rounded-xl border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950"
          />
        </div>
        <div className="relative flex items-center">
          <Search className="absolute left-4 size-5 text-slate-400" />
          <Input 
            placeholder="Search item inside current GRN (Ctrl+I)" 
            className="pl-12 h-12 rounded-xl border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950"
          />
        </div>
      </div>

      {/* Editable Item Return Table Grid */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden dark:border-slate-800 dark:bg-slate-950">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50 dark:bg-slate-900/50">
              <TableRow className="border-b border-slate-100 dark:border-slate-800">
                <TableHead className="w-[50px] font-semibold text-slate-600">S.No</TableHead>
                <TableHead className="min-w-[200px] font-semibold text-slate-600">Item Code & Name</TableHead>
                <TableHead className="font-semibold text-slate-600 text-right">Orig Qty</TableHead>
                <TableHead className="font-semibold text-slate-600 text-right">Max Ret</TableHead>
                <TableHead className="font-semibold text-blue-600 text-right bg-blue-50/30 dark:text-blue-400 dark:bg-blue-900/10">Return Qty</TableHead>
                <TableHead className="font-semibold text-slate-600 text-right">Unit Price</TableHead>
                <TableHead className="font-semibold text-slate-600 text-right">Gross Amt</TableHead>
                <TableHead className="font-semibold text-slate-600 text-right">Tax Amt</TableHead>
                <TableHead className="font-semibold text-slate-600 text-right">Net Return</TableHead>
                <TableHead className="font-semibold text-slate-600">BN</TableHead>
                <TableHead className="font-semibold text-slate-600">XD</TableHead>
                <TableHead className="w-[80px] font-semibold text-slate-600 text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formState.items.map((item, i) => (
                <TableRow key={item.id} className="border-b border-slate-100 dark:border-slate-800">
                  <TableCell className="text-slate-500 py-4">{i + 1}</TableCell>
                  <TableCell className="py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 dark:text-slate-100">{item.itemCode}</span>
                      <span className="text-xs text-slate-500">{item.itemName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-slate-500 py-4">{item.originalGrnQty}</TableCell>
                  <TableCell className="text-right text-slate-500 py-4">{item.maxReturnableQty}</TableCell>
                  <TableCell className="py-2 bg-blue-50/10 dark:bg-blue-900/5">
                    <div className="flex justify-end">
                      <Input 
                        type="number" 
                        value={item.currentReturnQty}
                        onChange={(e) => handleQtyChange(item.id, Number(e.target.value))}
                        className="w-20 text-right h-9 border-slate-200 bg-white focus-visible:ring-2 focus-visible:ring-blue-600 font-semibold text-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-blue-400"
                        min={0}
                        max={item.maxReturnableQty}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-slate-600 py-4">${item.unitPrice.toFixed(2)}</TableCell>
                  <TableCell className="text-right font-medium py-4">${item.grossAmount.toFixed(2)}</TableCell>
                  <TableCell className="text-right text-slate-600 py-4">${item.taxAmount.toFixed(2)}</TableCell>
                  <TableCell className="text-right font-bold text-slate-900 py-4 dark:text-slate-100">${item.netReturnTotal.toFixed(2)}</TableCell>
                  <TableCell className="text-slate-500 py-4 text-xs">{item.batchNumber}</TableCell>
                  <TableCell className="text-slate-500 py-4 text-xs whitespace-nowrap">{item.expiryDate}</TableCell>
                  <TableCell className="text-center py-4">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleRemoveItem(item.id)}
                      className="size-8 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-900/50 dark:hover:bg-red-900/30"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {formState.items.length === 0 && (
                <TableRow>
                  <TableCell colSpan={12} className="h-32 text-center text-slate-500">
                    No items available for return. Please scan or search items.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Suspended Bottom Calculations Summary Bar */}
      <div
        className={cn(
          "fixed bottom-0 right-0 z-50 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 border-t border-slate-200 bg-white/80 px-6 py-4 backdrop-blur-md shadow-[0_-4px_24px_rgba(0,0,0,0.04)] transition-all duration-200 ease-linear dark:border-slate-800 dark:bg-slate-950/80",
          open ? "left-0 md:left-[280px]" : "left-0 md:left-[80px]"
        )}
      >
        {/* Calculation Summaries */}
        <div className="flex w-full flex-wrap items-center justify-between gap-4 md:w-auto md:justify-start md:gap-8 lg:gap-12">
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Total Items Selected</span>
            <span className="text-lg font-bold text-slate-900 dark:text-slate-100">{totalItems}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Total Qty Selected</span>
            <span className="text-lg font-bold text-slate-900 dark:text-slate-100">{totalQty.toFixed(2)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Gross Amount</span>
            <span className="text-lg font-bold text-slate-900 dark:text-slate-100">${grossAmount.toFixed(2)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Tax Adjustments</span>
            <span className="text-lg font-bold text-slate-900 dark:text-slate-100">${taxAmount.toFixed(2)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">Net Refund Total</span>
            <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400">${netAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* Action Button */}
        <Button className="w-full rounded-xl px-6 py-5 font-semibold shadow-md transition-all hover:-translate-y-0.5 md:w-auto">
          <Save className="mr-2 size-5" />
          {isEdit ? "Update Return Record" : "Process GRN Return"}
        </Button>
      </div>
    </div>
  );
}
