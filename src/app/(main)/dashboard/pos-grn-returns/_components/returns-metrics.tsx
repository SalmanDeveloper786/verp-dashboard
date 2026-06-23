"use client";

import { ClipboardList, Package, DollarSign } from "lucide-react";
import { GrnReturnRecord } from "../types";

export function ReturnsMetrics({ data }: { data: GrnReturnRecord[] }) {
  const totalRecords = data.length;
  const totalQty = data.reduce((sum, record) => sum + record.totalQuantity, 0);
  const totalAmount = data.reduce((sum, record) => sum + record.totalAmount, 0);

  return (
    <div className="flex flex-wrap items-center gap-4 md:gap-6 lg:gap-8 rounded-xl border border-slate-200 bg-slate-50/80 px-6 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/50 mb-6">
      {/* Total Records */}
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-slate-200/60 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
          <ClipboardList className="size-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Total Records</span>
          <span className="text-base font-bold text-slate-900 dark:text-slate-100">{totalRecords}</span>
        </div>
      </div>

      <div className="h-10 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />

      {/* Total Qty */}
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-blue-100/60 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
          <Package className="size-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Total Qty</span>
          <span className="text-base font-bold text-slate-900 dark:text-slate-100">
            {totalQty.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      <div className="h-10 w-px bg-slate-200 dark:bg-slate-800 hidden md:block" />

      {/* Total Amount */}
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-indigo-100/60 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
          <DollarSign className="size-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Total Amount</span>
          <span className="text-base font-bold text-indigo-700 dark:text-indigo-400">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(totalAmount)}
          </span>
        </div>
      </div>
    </div>
  );
}
