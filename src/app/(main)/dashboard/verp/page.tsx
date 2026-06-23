import { format } from "date-fns";
import { Download, RotateCw, Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { BalanceDistributionCard } from "./_components/balance-distribution-card";
import { FinanceNotification } from "./_components/finance-notification";
import { IncomeBreakdown } from "./_components/income-breakdown";
import { OverviewKpis } from "./_components/overview-kpis";
import { QuickActions } from "./_components/quick-actions";
import { TransactionsOverviewCard } from "./_components/transactions-overview-card";
import { UpcomingTransactions } from "./_components/upcoming-transactions";
import { Wallet } from "./_components/wallet";
import { KpiCards } from "../crm/_components/kpi-cards";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">

      <KpiCards isVerp={true} />


      <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <TransactionsOverviewCard isVerp={true} />
        </div>
        <div className="xl:col-span-5">
          <BalanceDistributionCard isVerp={true} />
        </div>
      </div>

    </div>
  );
}
