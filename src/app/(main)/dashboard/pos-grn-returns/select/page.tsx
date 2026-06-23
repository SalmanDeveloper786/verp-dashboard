"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReturnsFilters } from "../_components/returns-filters";
import { ReturnsSelectionGrid } from "../_components/returns-selection-grid";
import { HistoricalGrnRecord } from "../types";

// Mock data to populate the selection matrix layout.
const mockHistoricalData: HistoricalGrnRecord[] = [
  {
    id: "grn-sm34-0626-00020",
    createdDate: "16-06-2026",
    grnNumber: "GRN-SM34-0626-00020",
    supplier: "Seha Plus",
    totalQuantity: 1108.00,
    netTotal: 3500.98,
    returnStatus: "Available",
  },
  {
    id: "grn-sm34-0626-00021",
    createdDate: "18-06-2026",
    grnNumber: "GRN-SM34-0626-00021",
    supplier: "PharmaCorp Inc.",
    totalQuantity: 50.00,
    netTotal: 1250.00,
    returnStatus: "Available",
  },
  {
    id: "grn-sm34-0626-00022",
    createdDate: "20-06-2026",
    grnNumber: "GRN-SM34-0626-00022",
    supplier: "HealthCare Supplies LLC",
    totalQuantity: 300.50,
    netTotal: 8400.25,
    returnStatus: "Partial Return",
  }
];

export default function ReturnSelectionPage() {
  const [data] = useState<HistoricalGrnRecord[]>(mockHistoricalData);

  return (
    <div className="flex flex-col gap-6">
      {/* Header & Navigation Anchor */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="pl-0 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100" asChild>
            <Link href="/dashboard/pos-grn-returns">
              <ChevronLeft className="mr-1 size-4" />
              Back
            </Link>
          </Button>
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2" />
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Create GRN Return
          </h1>
          <span className="bg-slate-50 border border-slate-200 text-slate-700 font-medium px-3 py-1 text-sm rounded-md ml-2 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300">
            2d8b40a1-3b3a-4002-bb08-103efe5ba15e
          </span>
        </div>
      </div>

      {/* Operational Filters Row (Reused from Page 1) */}
      <ReturnsFilters />

      {/* Historical GRN Selection Grid Table */}
      <ReturnsSelectionGrid data={data} />
    </div>
  );
}
