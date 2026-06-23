"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { HistoricalGrnRecord, InlineReturnItem } from "../types";
import { cn } from "@/lib/utils";

// Mock data mapping for line items of a specific GRN
const MOCK_ITEMS: Record<string, InlineReturnItem[]> = {
  "grn-sm34-0626-00020": [
    { id: "1", sno: 1, itemCode: "19000560", itemName: "COTTON ROLL-250GM", receivedQty: 150.0, returnedQty: 10.0, returnQty: 0.0 },
    { id: "2", sno: 2, itemCode: "20788176", itemName: "COTTON ROLL 500 GM", receivedQty: 100.0, returnedQty: 0.0, returnQty: 0.0 },
  ],
  "grn-sm34-0626-00021": [
    { id: "3", sno: 1, itemCode: "30001001", itemName: "MOVE ON SPRAY 200ML", receivedQty: 50.0, returnedQty: 5.0, returnQty: 0.0 },
  ],
  "grn-sm34-0626-00022": [
    { id: "4", sno: 1, itemCode: "45009900", itemName: "PARACETAMOL 500MG TABS", receivedQty: 300.0, returnedQty: 0.0, returnQty: 0.0 },
  ],
};

export function ReturnsSelectionGrid({ data }: { data: HistoricalGrnRecord[] }) {
  const [selectedGrnId, setSelectedGrnId] = useState<string | null>(null);
  const [items, setItems] = useState<InlineReturnItem[]>([]);
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  const handleSelect = (recordId: string) => {
    setSelectedGrnId(recordId);
    // Deep copy the mock items to allow independent state updates
    setItems(JSON.parse(JSON.stringify(MOCK_ITEMS[recordId] || [])));
    setReason("");
    setNotes("");
  };

  const handleQtyChange = (itemId: string, val: string) => {
    const num = parseFloat(val) || 0;
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const maxAllowed = item.receivedQty - item.returnedQty;
          const validQty = Math.min(Math.max(num, 0), maxAllowed);
          return { ...item, returnQty: validQty };
        }
        return item;
      })
    );
  };

  const handleFullReturn = () => {
    setItems((prev) =>
      prev.map((item) => {
        const maxAllowed = item.receivedQty - item.returnedQty;
        return { ...item, returnQty: maxAllowed };
      })
    );
  };

  const isExpanded = selectedGrnId !== null;

  return (
    <div className="flex flex-col gap-6">
      {/* Master Row Selection Matrix */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden dark:border-slate-800 dark:bg-slate-950">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50 dark:bg-slate-900/50">
              <TableRow className="border-b border-slate-100 dark:border-slate-800 hover:bg-transparent">
                <TableHead className="whitespace-nowrap font-semibold text-slate-600 w-[60px] text-center">Selection</TableHead>
                <TableHead className="whitespace-nowrap font-semibold text-slate-600">Created Date</TableHead>
                <TableHead className="whitespace-nowrap font-semibold text-slate-600">GRN Number</TableHead>
                <TableHead className="whitespace-nowrap font-semibold text-slate-600">Supplier</TableHead>
                <TableHead className="whitespace-nowrap font-semibold text-slate-600 text-right">Total Quantity</TableHead>
                <TableHead className="whitespace-nowrap font-semibold text-slate-600 text-right">Net Total</TableHead>
                <TableHead className="whitespace-nowrap font-semibold text-slate-600 text-center">Return Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((record) => {
                const isSelected = selectedGrnId === record.id;
                return (
                  <TableRow 
                    key={record.id} 
                    className={cn(
                      "cursor-pointer border-b border-slate-100 py-4 transition-colors hover:bg-slate-50/80 dark:border-slate-800 dark:hover:bg-slate-900/80",
                      isSelected && "bg-blue-50/30 hover:bg-blue-50/50 dark:bg-blue-900/10 dark:hover:bg-blue-900/20"
                    )}
                    onClick={() => handleSelect(record.id)}
                  >
                    <TableCell className="text-center">
                      <input 
                        type="radio" 
                        name="grn-selection" 
                        checked={isSelected}
                        className="size-4 cursor-pointer accent-blue-600"
                        onChange={() => handleSelect(record.id)}
                      />
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-slate-600 dark:text-slate-400">{record.createdDate}</TableCell>
                    <TableCell className="whitespace-nowrap font-bold text-slate-900 dark:text-slate-100">{record.grnNumber}</TableCell>
                    <TableCell className="whitespace-nowrap text-slate-600 dark:text-slate-400">{record.supplier}</TableCell>
                    <TableCell className="whitespace-nowrap text-right text-slate-600 dark:text-slate-400">{record.totalQuantity.toFixed(2)}</TableCell>
                    <TableCell className="whitespace-nowrap text-right font-medium text-slate-900 dark:text-slate-100">${record.netTotal.toFixed(2)}</TableCell>
                    <TableCell className="whitespace-nowrap text-center">
                      <span className={cn(
                        "text-xs font-bold px-2.5 py-0.5 rounded-full border",
                        record.returnStatus === "Available" 
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100/50 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800"
                          : "bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"
                      )}>
                        {record.returnStatus}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between text-sm">
        <div className="text-slate-500 dark:text-slate-400">
          Total {data.length} items
        </div>
        <div className="flex items-center gap-1">
          <button className="flex size-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800" disabled>
            {"<"}
          </button>
          <button className="flex size-8 items-center justify-center rounded-md bg-blue-50 border border-blue-200 text-blue-600 font-bold dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400">
            1
          </button>
          <button className="flex size-8 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
            2
          </button>
          <button className="flex size-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
            {">"}
          </button>
        </div>
      </div>

      {/* Expandable Sections */}
      <div className={cn(
        "grid transition-all duration-300 ease-in-out",
        isExpanded ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0 mt-0"
      )}>
        <div className="overflow-hidden flex flex-col gap-6">
          
          {/* Section A: Items to Return */}
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">Items to Return</h2>
            </div>
            <div className="overflow-x-auto p-4">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-slate-100 dark:border-slate-800 hover:bg-transparent">
                    <TableHead className="font-semibold text-slate-600 text-center w-[50px]">#</TableHead>
                    <TableHead className="font-semibold text-slate-600">Item Code</TableHead>
                    <TableHead className="font-semibold text-slate-600">Item Name</TableHead>
                    <TableHead className="font-semibold text-slate-600 text-right">Received Qty</TableHead>
                    <TableHead className="font-semibold text-slate-600 text-right">Returned Qty</TableHead>
                    <TableHead className="font-semibold text-slate-600 text-right w-[150px]">Return Qty</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-900/50 py-3 transition-colors">
                      <TableCell className="text-center text-slate-500 font-medium">{item.sno}</TableCell>
                      <TableCell className="font-medium text-slate-900 dark:text-slate-100">{item.itemCode}</TableCell>
                      <TableCell className="text-slate-600 dark:text-slate-300">{item.itemName}</TableCell>
                      <TableCell className="text-right text-slate-700 dark:text-slate-300 font-medium">{item.receivedQty.toFixed(2)}</TableCell>
                      <TableCell className="text-right text-slate-400 dark:text-slate-500">{item.returnedQty.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <Input 
                          type="number"
                          className="h-9 w-full text-right bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900 dark:text-slate-100 transition-all font-semibold"
                          value={item.returnQty === 0 ? "0.00" : item.returnQty}
                          onChange={(e) => handleQtyChange(item.id, e.target.value)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Section B: Return Details */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 flex flex-col gap-6">
            <div className="border-b border-slate-100 pb-4 dark:border-slate-800">
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">Return Details</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">Reason</label>
                <Input 
                  placeholder="e.g. Damaged goods" 
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">Notes</label>
                <Textarea 
                  placeholder="e.g. Supplier notified" 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[100px] resize-none bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleFullReturn}
                className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium transition-all dark:bg-slate-950 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"
              >
                Full Return
              </Button>
              <Button size="sm" className="font-semibold shadow-sm transition-all">
                Create Return
              </Button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
