"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ScanBarcode, Search, FolderPlus, ArrowLeft, Save } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useSidebar } from "@/components/ui/sidebar";
import { GrnFormState, GrnLineItem } from "../types";
import { cn } from "@/lib/utils";

interface GRNFormProps {
  initialData?: GrnFormState;
}

const defaultFormState: GrnFormState = {
  supplierName: "",
  supplierOutstandingBalance: 0,
  paymentMode: "Credit",
  purchaseOrder: "",
  billNumber: "",
  billDate: "",
  grnDate: "",
  invoiceType: "",
  remarks: "",
  items: [],
};

export function GRNForm({ initialData }: GRNFormProps) {
  const router = useRouter();
  const { open } = useSidebar();
  const isEdit = !!initialData;
  const [formState, setFormState] = React.useState<GrnFormState>(initialData || defaultFormState);

  // Refs for hotkeys
  const barcodeRef = React.useRef<HTMLInputElement>(null);
  const searchRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "q") {
        e.preventDefault();
        barcodeRef.current?.focus();
      }
      if (e.ctrlKey && e.key.toLowerCase() === "i") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Calculation aggregations
  const totalItems = formState.items.length;
  const totalQty = formState.items.reduce((sum, item) => sum + item.qty, 0);
  const grossAmount = formState.items.reduce((sum, item) => sum + item.grossAmount, 0);
  const discountAmount = formState.items.reduce((sum, item) => sum + item.discountAmount, 0);
  const taxAmount = formState.items.reduce((sum, item) => sum + item.taxAmount, 0);
  const netAmount = formState.items.reduce((sum, item) => sum + item.netAmount, 0);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50 dark:bg-transparent pb-40 md:pb-24">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="size-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {isEdit ? "Update Goods Received Note" : "Add Goods Received Note"}
            </h1>
            <p className="text-sm text-slate-500">
              {isEdit ? "Modify the existing GRN details below." : "Enter the details for the new GRN."}
            </p>
          </div>
        </div>
      </div>

      {/* Primary Form Grid */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {/* Supplier Name */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Supplier Name</label>
            <Select value={formState.supplierName} onValueChange={(v) => setFormState({ ...formState, supplierName: v })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Supplier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PharmaCorp">PharmaCorp Inc.</SelectItem>
                <SelectItem value="HealthCare">HealthCare Supplies LLC</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Supplier Outstanding Balance - Soft Read Only Status Card */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Outstanding Balance</label>
            <div className="flex h-10 w-full items-center rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300">
              <span className="font-medium">
                {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(formState.supplierOutstandingBalance)}
              </span>
            </div>
          </div>

          {/* Payment Mode */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Payment Mode</label>
            <Select value={formState.paymentMode} onValueChange={(v: "Cash" | "Credit") => setFormState({ ...formState, paymentMode: v })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="Credit">Credit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Purchase Order */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Purchase Order</label>
            <Input
              placeholder="e.g. PO-10293"
              value={formState.purchaseOrder}
              onChange={(e) => setFormState({ ...formState, purchaseOrder: e.target.value })}
            />
          </div>

          {/* Bill Number */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Bill Number</label>
            <Input
              placeholder="Enter Bill Number"
              value={formState.billNumber}
              onChange={(e) => setFormState({ ...formState, billNumber: e.target.value })}
            />
          </div>

          {/* Bill Date */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Bill Date</label>
            <Input
              type="date"
              value={formState.billDate}
              onChange={(e) => setFormState({ ...formState, billDate: e.target.value })}
            />
          </div>

          {/* GRN Date */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">GRN Date</label>
            <Input
              type="date"
              value={formState.grnDate}
              onChange={(e) => setFormState({ ...formState, grnDate: e.target.value })}
            />
          </div>

          {/* Invoice Type */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Invoice Type</label>
            <Select value={formState.invoiceType} onValueChange={(v) => setFormState({ ...formState, invoiceType: v })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Standard">Standard</SelectItem>
                <SelectItem value="Tax">Tax Invoice</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Remarks */}
          <div className="col-span-1 md:col-span-3 lg:col-span-4 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Remarks</label>
              <span className="text-xs text-slate-400">{formState.remarks.length}/500</span>
            </div>
            <Textarea
              placeholder="Add any additional notes here..."
              maxLength={500}
              className="resize-none"
              value={formState.remarks}
              onChange={(e) => setFormState({ ...formState, remarks: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Action Center (Scan & Search) */}
      <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="relative">
          <ScanBarcode className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
          <Input
            ref={barcodeRef}
            placeholder="Scan barcode / QR code - Ctrl+Q to focus"
            className="pl-10 h-12 rounded-xl border-slate-200 bg-white shadow-sm focus-visible:ring-primary dark:bg-slate-950 dark:border-slate-800"
          />
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
          <Input
            ref={searchRef}
            placeholder="Search item (Ctrl+I)"
            className="pl-10 h-12 rounded-xl border-slate-200 bg-white shadow-sm focus-visible:ring-primary dark:bg-slate-950 dark:border-slate-800"
          />
        </div>
      </div>

      {/* Item Matrix */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden dark:border-slate-800 dark:bg-slate-950">
        {formState.items.length === 0 ? (
          /* Empty State */
          <div className="p-12 text-center">
            <div className="mx-auto flex size-20 items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
              <FolderPlus className="size-8 text-slate-400" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">No items added yet</h3>
            <p className="mt-1 text-sm text-slate-500">Scan a barcode or search for an item to start building your GRN.</p>
          </div>
        ) : (
          /* Data Table */
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/50 dark:bg-slate-900/50">
                <TableRow className="border-b border-slate-100 dark:border-slate-800 hover:bg-transparent">
                  <TableHead className="whitespace-nowrap font-semibold text-slate-600">Item Details</TableHead>
                  <TableHead className="whitespace-nowrap font-semibold text-slate-600 text-right">Qty</TableHead>
                  <TableHead className="whitespace-nowrap font-semibold text-slate-600 text-right">Retail Price</TableHead>
                  <TableHead className="whitespace-nowrap font-semibold text-slate-600 text-right">Last Price</TableHead>
                  <TableHead className="whitespace-nowrap font-semibold text-slate-600 text-right">Price</TableHead>
                  <TableHead className="whitespace-nowrap font-semibold text-slate-600 text-right">Gross Amt</TableHead>
                  <TableHead className="whitespace-nowrap font-semibold text-slate-600 text-right">Disc 1</TableHead>
                  <TableHead className="whitespace-nowrap font-semibold text-slate-600 text-right">Disc 2</TableHead>
                  <TableHead className="whitespace-nowrap font-semibold text-slate-600 text-right">Disc Amt</TableHead>
                  <TableHead className="whitespace-nowrap font-semibold text-slate-600 text-right">Tax Amt</TableHead>
                  <TableHead className="whitespace-nowrap font-semibold text-slate-600 text-right">Net Amt</TableHead>
                  <TableHead className="whitespace-nowrap font-semibold text-slate-600">Expiry (XD)</TableHead>
                  <TableHead className="whitespace-nowrap font-semibold text-slate-600">Batch (BN)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formState.items.map((item) => (
                  <TableRow key={item.id} className="border-b border-slate-100 dark:border-slate-800">
                    <TableCell className="py-4">
                      <div className="font-bold text-slate-900 dark:text-slate-100">{item.itemCode}</div>
                      <div className="mt-0.5 text-xs text-slate-500">{item.itemName}</div>
                    </TableCell>
                    <TableCell className="py-4">
                      <Input
                        type="number"
                        className="w-20 text-right border-transparent bg-transparent hover:border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary dark:hover:border-slate-700"
                        value={item.qty}
                        onChange={() => { }} // Stub
                      />
                    </TableCell>
                    <TableCell className="py-4 text-right text-slate-600">${item.retailPrice.toFixed(2)}</TableCell>
                    <TableCell className="py-4 text-right text-slate-600">${item.lastPurchasePrice.toFixed(2)}</TableCell>
                    <TableCell className="py-4">
                      <Input
                        type="number"
                        className="w-24 text-right border-transparent bg-transparent hover:border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary dark:hover:border-slate-700"
                        value={item.price}
                        onChange={() => { }} // Stub
                      />
                    </TableCell>
                    <TableCell className="py-4 text-right font-medium">${item.grossAmount.toFixed(2)}</TableCell>
                    <TableCell className="py-4 text-right text-slate-600">{item.discount1}%</TableCell>
                    <TableCell className="py-4 text-right text-slate-600">{item.discount2}%</TableCell>
                    <TableCell className="py-4 text-right text-slate-600">${item.discountAmount.toFixed(2)}</TableCell>
                    <TableCell className="py-4 text-right text-slate-600">${item.taxAmount.toFixed(2)}</TableCell>
                    <TableCell className="py-4 text-right font-bold text-slate-900 dark:text-slate-100">${item.netAmount.toFixed(2)}</TableCell>
                    <TableCell className="py-4">
                      <Input
                        type="date"
                        className="w-36 border-transparent bg-transparent hover:border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary dark:hover:border-slate-700 text-xs"
                        value={item.expiryDate}
                        onChange={() => { }} // Stub
                      />
                    </TableCell>
                    <TableCell className="py-4">
                      <Input
                        className="w-28 border-transparent bg-transparent hover:border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary dark:hover:border-slate-700"
                        value={item.batchNumber}
                        onChange={() => { }} // Stub
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Floating Bottom Dock */}
      <div
        className={cn(
          "fixed bottom-0 right-0 z-50 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 border-t border-slate-200 bg-white/80 px-6 py-4 backdrop-blur-md shadow-[0_-4px_24px_rgba(0,0,0,0.04)] transition-all duration-200 ease-linear dark:border-slate-800 dark:bg-slate-950/80",
          open ? "left-0 md:left-[280px]" : "left-0 md:left-[80px]"
        )}
      >
        {/* Calculation Summaries */}
        <div className="flex w-full flex-wrap items-center justify-between gap-4 md:w-auto md:justify-start md:gap-12">
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Total Items</span>
            <span className="text-lg font-bold text-slate-900 dark:text-slate-100">{totalItems}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Total Qty</span>
            <span className="text-lg font-bold text-slate-900 dark:text-slate-100">{totalQty.toFixed(2)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Gross</span>
            <span className="text-lg font-bold text-slate-900 dark:text-slate-100">${grossAmount.toFixed(2)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Discount</span>
            <span className="text-lg font-bold text-slate-900 dark:text-slate-100">${discountAmount.toFixed(2)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Tax</span>
            <span className="text-lg font-bold text-slate-900 dark:text-slate-100">${taxAmount.toFixed(2)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">Net Payable</span>
            <span className="text-xl font-black text-primary">${netAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* Action Button */}
        <Button className="w-full rounded-xl px-6 py-5 font-semibold shadow-md transition-all hover:-translate-y-0.5 md:w-auto">
          <Save className="mr-2 size-5" />
          {isEdit ? "Update GRN" : "Create GRN"}
        </Button>
      </div>
    </div>
  );
}
