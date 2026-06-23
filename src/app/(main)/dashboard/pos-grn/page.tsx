"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, Package, Plus, Import } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GrnMetrics } from "./_components/grn-metrics";
import { GrnFilters } from "./_components/grn-filters";
import { GrnDataTable } from "./_components/grn-data-table";
import { mockGrnData } from "./data";

export default function PosGrnPage() {
  const [data, setData] = useState(mockGrnData);
  const [branch, setBranch] = useState("SM34 - BAHRA Branch");

  return (
    <div className="flex flex-col gap-6">
      {/* Header & Global Actions */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Package className="size-5" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">POS Management - GRN</h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Select value={branch} onValueChange={setBranch}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Select Branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SM34 - BAHRA Branch">SM34 - BAHRA Branch</SelectItem>
              <SelectItem value="SM35 - JEDDAH Branch">SM35 - JEDDAH Branch</SelectItem>
              <SelectItem value="SM36 - RIYADH Branch">SM36 - RIYADH Branch</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <Import className="mr-2 size-4" />
            Import GRN
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 size-4" />
            Export GRN
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 size-4" />
            Export RSD Dispatch
          </Button>
          <Button size="sm" asChild>
            <Link href="/dashboard/pos-grn/add">
              <Plus className="mr-2 size-4" />
              Add New GRN
            </Link>
          </Button>
        </div>
      </div>

      {/* Summary Metrics */}
      <GrnMetrics data={data} />

      {/* Filters & Search */}
      <GrnFilters />

      {/* Data Table */}
      <GrnDataTable data={data} />
    </div>
  );
}
