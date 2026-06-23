import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GrnRecord } from "../data";
import { ClipboardList, DollarSign, Package, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function GrnMetrics({ data }: { data: GrnRecord[] }) {
  const totalRecords = data.length;
  const totalQty = data.reduce((sum, record) => sum + record.totalQuantity, 0);
  const grandTotal = data.reduce((sum, record) => sum + record.netTotal, 0);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {/* Total Records Card */}
      <Card className="group relative overflow-hidden bg-white/80 backdrop-blur-md border border-slate-100/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.01] hover:shadow-lg dark:bg-slate-950/80 dark:border-slate-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 pb-0">
          <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Total Records
          </CardTitle>
          <div className="flex size-8 items-center justify-center rounded-full bg-slate-50 text-slate-500 transition-all duration-300 group-hover:bg-primary/10 group-hover:text-primary dark:bg-slate-900 dark:text-slate-400">
            <ClipboardList className="size-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-0.5 p-3 pt-0">
          <div className="text-2xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
            {totalRecords}
          </div>
          <div className="flex items-center text-xs text-slate-400">
            <span className="truncate">• Active GRN entries</span>
          </div>
        </CardContent>
      </Card>

      {/* Total Qty Card */}
      <Card className="group relative overflow-hidden bg-white/80 backdrop-blur-md border border-slate-100/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.01] hover:shadow-lg dark:bg-slate-950/80 dark:border-slate-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 pb-0">
          <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Total Quantity
          </CardTitle>
          <div className="flex size-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-primary/10 group-hover:text-primary dark:bg-blue-900/30 dark:text-blue-400">
            <Package className="size-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-0.5 p-3 pt-0">
          <div className="text-2xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
            {totalQty.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700 hover:bg-green-50 dark:border-green-900/40 dark:bg-green-500/15 dark:text-green-300">
              <TrendingUp className="mr-1 size-3" />
              +12.4% vs last week
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Grand Total Card */}
      <Card className="group relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/70 border border-primary-foreground/20 shadow-md shadow-primary/20 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.01]">
        {/* Abstract Glow Effect inside the card */}
        <div className="absolute -right-10 -top-10 size-40 rounded-full bg-white/10 blur-3xl transition-transform duration-500 group-hover:scale-150" />

        <CardHeader className="relative z-10 flex flex-row items-center justify-between space-y-0 p-3 pb-0">
          <CardTitle className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/80">
            Grand Total
          </CardTitle>
          <div className="flex size-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white transition-all duration-300 group-hover:bg-white/20">
            <DollarSign className="size-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10 flex flex-col gap-0.5 p-3 pt-0">
          <div className="text-2xl font-extrabold tracking-tight text-white">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(grandTotal)}
          </div>
          <div className="flex items-center text-xs text-primary-foreground/70">
            <span className="truncate">• Net payable balance</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
