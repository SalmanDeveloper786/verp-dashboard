import { Edit, FileText, Trash2 } from "lucide-react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GrnRecord } from "../data";

export function GrnDataTable({ data }: { data: GrnRecord[] }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 text-center">
              <Checkbox aria-label="Select all" />
            </TableHead>
            <TableHead className="whitespace-nowrap">Created Date</TableHead>
            <TableHead className="whitespace-nowrap">Bill Number</TableHead>
            <TableHead className="whitespace-nowrap">GRN Number</TableHead>
            <TableHead className="whitespace-nowrap">Created By</TableHead>
            <TableHead className="whitespace-nowrap">Supplier</TableHead>
            <TableHead className="whitespace-nowrap text-right">Total Qty</TableHead>
            <TableHead className="whitespace-nowrap text-right">Gross Total</TableHead>
            <TableHead className="whitespace-nowrap text-right">Total Discount</TableHead>
            <TableHead className="whitespace-nowrap text-right">Total Tax</TableHead>
            <TableHead className="whitespace-nowrap text-right">Net Total</TableHead>
            <TableHead className="whitespace-nowrap">Remarks</TableHead>
            <TableHead className="whitespace-nowrap">Return Status</TableHead>
            <TableHead className="whitespace-nowrap text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={14} className="h-24 text-center">
                No records found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="text-center">
                  <Checkbox aria-label={`Select row ${record.id}`} />
                </TableCell>
                <TableCell className="whitespace-nowrap">{record.createdDate}</TableCell>
                <TableCell className="whitespace-nowrap font-medium">{record.billNumber}</TableCell>
                <TableCell className="whitespace-nowrap">{record.grnNumber}</TableCell>
                <TableCell className="whitespace-nowrap">{record.createdBy}</TableCell>
                <TableCell className="whitespace-nowrap">{record.supplier}</TableCell>
                <TableCell className="whitespace-nowrap text-right">{record.totalQuantity.toFixed(2)}</TableCell>
                <TableCell className="whitespace-nowrap text-right">${record.grossTotal.toFixed(2)}</TableCell>
                <TableCell className="whitespace-nowrap text-right">${record.totalDiscount.toFixed(2)}</TableCell>
                <TableCell className="whitespace-nowrap text-right">${record.totalTax.toFixed(2)}</TableCell>
                <TableCell className="whitespace-nowrap text-right font-medium">
                  ${record.netTotal.toFixed(2)}
                </TableCell>
                <TableCell className="max-w-[200px] truncate" title={record.remarks}>
                  {record.remarks}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <Badge
                    variant="outline"
                    className={
                      record.returnStatus === "None"
                        ? "border-green-200 bg-green-50 text-green-700 dark:border-green-900/40 dark:bg-green-500/15 dark:text-green-300"
                        : record.returnStatus === "Partial"
                          ? "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-900/40 dark:bg-yellow-500/15 dark:text-yellow-300"
                          : "border-destructive/20 bg-destructive/10 text-destructive"
                    }
                  >
                    {record.returnStatus}
                  </Badge>
                </TableCell>
                <TableCell className="whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700" asChild>
                      <Link href={`/dashboard/pos-grn/edit/${record.id}`}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700">
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">View Details</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
