"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReturnsMetrics } from "./_components/returns-metrics";
import { ReturnsFilters } from "./_components/returns-filters";
import { ReturnsDataTable } from "./_components/returns-data-table";
import { GrnReturnRecord } from "./types";

export default function GrnReturnsPage() {
  // Empty data array to test the requested minimalist empty state placeholder.
  const [data, setData] = useState<GrnReturnRecord[]>([]);

  return (
    <div className="flex flex-col gap-6">
      {/* Header & Global Actions */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            GRN Returns
          </h1>
          <span className="bg-slate-50 border border-slate-200 text-slate-700 font-medium px-3 py-1 text-sm rounded-md dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300">
            2d8b40a1-3b3a-4002-bb08-103efe5ba15e
          </span>
        </div>

        <Button size="sm" asChild>
          <Link href="/dashboard/pos-grn-returns/select">
            <Plus className="mr-2 size-4" />
            Return GRN
          </Link>
        </Button>
      </div>

      {/* Filters Row */}
      <ReturnsFilters />

      {/* Analytical Metric Display Cards */}
      <ReturnsMetrics data={data} />

      {/* Dashboard Grid Table */}
      <ReturnsDataTable data={data} />
    </div>
  );
}
