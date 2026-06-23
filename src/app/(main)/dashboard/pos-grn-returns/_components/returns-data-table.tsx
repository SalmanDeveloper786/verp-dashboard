"use client";

import { Edit, Eye, Trash2, FolderOpen } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { GrnReturnRecord } from "../types";
import Link from "next/link";

export function ReturnsDataTable({ data }: { data: GrnReturnRecord[] }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden dark:border-slate-800 dark:bg-slate-950">
      {data.length === 0 ? (
        <div className="p-12 text-center border-2 border-dashed border-slate-200 rounded-xl m-4 dark:border-slate-800">
          <div className="mx-auto flex size-20 items-center justify-center">
            <FolderOpen className="size-10 text-slate-300 dark:text-slate-600" strokeWidth={1} />
          </div>
          <p className="mt-2 text-sm font-medium text-slate-400">No data</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50 dark:bg-slate-900/50">
              <TableRow className="border-b border-slate-100 dark:border-slate-800 hover:bg-transparent">
                <TableHead className="whitespace-nowrap font-semibold text-slate-600">Return Number</TableHead>
                <TableHead className="whitespace-nowrap font-semibold text-slate-600">GRN Number</TableHead>
                <TableHead className="whitespace-nowrap font-semibold text-slate-600">Supplier</TableHead>
                <TableHead className="whitespace-nowrap font-semibold text-slate-600 text-right">Total Qty</TableHead>
                <TableHead className="whitespace-nowrap font-semibold text-slate-600 text-right">Total Amount</TableHead>
                <TableHead className="whitespace-nowrap font-semibold text-slate-600">Created By</TableHead>
                <TableHead className="whitespace-nowrap font-semibold text-slate-600">Created Date</TableHead>
                <TableHead className="whitespace-nowrap font-semibold text-slate-600 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((record) => (
                <TableRow key={record.id} className="border-b border-slate-100 dark:border-slate-800 transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                  <TableCell className="whitespace-nowrap font-bold text-slate-900 dark:text-slate-100">{record.returnNumber}</TableCell>
                  <TableCell className="whitespace-nowrap text-slate-600 dark:text-slate-400">{record.grnNumber}</TableCell>
                  <TableCell className="whitespace-nowrap text-slate-600 dark:text-slate-400">{record.supplier}</TableCell>
                  <TableCell className="whitespace-nowrap text-right text-slate-600 dark:text-slate-400">{record.totalQuantity.toFixed(2)}</TableCell>
                  <TableCell className="whitespace-nowrap text-right font-medium text-slate-900 dark:text-slate-100">${record.totalAmount.toFixed(2)}</TableCell>
                  <TableCell className="whitespace-nowrap text-slate-600 dark:text-slate-400">{record.createdBy}</TableCell>
                  <TableCell className="whitespace-nowrap text-slate-600 dark:text-slate-400">{record.createdDate}</TableCell>
                  <TableCell className="whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20" asChild>
                        <Link href={`/dashboard/pos-grn-returns/edit/${record.id}`}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
