"use client";

import { Search, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ReturnsFilters() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      {/* Search Input */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4" />
        <Input 
          placeholder="Search by GRN Number" 
          className="pl-9 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
        />
      </div>

      {/* Supplier Filter */}
      <Select>
        <SelectTrigger className="w-[200px] bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
          <SelectValue placeholder="Filter by Supplier" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pharma-corp">PharmaCorp Inc.</SelectItem>
          <SelectItem value="health-care">HealthCare Supplies LLC</SelectItem>
          <SelectItem value="seha-plus">Seha Plus</SelectItem>
        </SelectContent>
      </Select>

      {/* Date Range (Mocked as standard input for now if custom DateRangePicker isn't immediately available, but mimicking the placeholder) */}
      <div className="relative w-[250px]">
        <Input 
          placeholder="Start date ➔ End date" 
          className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
        />
      </div>

      {/* Reset Button */}
      <Button variant="outline" className="text-slate-500 border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900">
        <RotateCcw className="mr-2 size-4" />
        Reset
      </Button>
    </div>
  );
}
