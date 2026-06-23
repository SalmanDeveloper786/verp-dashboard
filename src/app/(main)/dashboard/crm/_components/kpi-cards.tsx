import {
  ArrowUpRight,
  TrendingDown,
  TrendingUp,
  Building2,
  Briefcase,
  DollarSign,
  Target,
  Package,
  Users,
  Percent
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";

export function KpiCards({ isVerp = false }: { isVerp?: boolean } = {}) {
  return (
    <section className="space-y-5">
      {!isVerp && <div className="space-y-1">
        <h2 className="text-3xl tracking-tight">{isVerp ? "Inventory Overview" : "Pipeline Overview"}</h2>
        <p className="text-muted-foreground text-sm">
          Keep tabs on lead quality, open opportunities, and conversion rates across the current sales cycle.
        </p>
      </div>}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="group transition-all duration-300 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardDescription>{isVerp ? "Active Branches" : "Lead Pipeline Value"}</CardDescription>
            <div className="flex size-8 items-center justify-center rounded-lg border bg-muted/50 text-muted-foreground transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary group-hover:shadow-sm group-hover:-translate-y-0.5">
              {isVerp ? (
                <Building2 className="size-4 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6" />
              ) : (
                <Briefcase className="size-4 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6" />
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl leading-none tracking-tight">{isVerp ? "15" : "$284,500"}</span>

              <Badge
                variant="outline"
                className="border-green-200 bg-green-500/10 text-green-700 dark:border-green-900/40 dark:bg-green-500/15 dark:text-green-300"
              >
                <TrendingUp />
                {isVerp ? "+1" : "+12%"}
              </Badge>
            </div>
            <p className="text-sm">
              <span className="font-medium text-foreground">{isVerp ? "14" : "$254,200"}</span>{" "}
              <span className="text-muted-foreground">last month</span>
            </p>
          </CardContent>
        </Card>


        <Card className="group transition-all duration-300 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardDescription>{isVerp ? "Inventory Items" : "Open Opportunities"}</CardDescription>
            <div className="flex size-8 items-center justify-center rounded-lg border bg-muted/50 text-muted-foreground transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary group-hover:shadow-sm group-hover:-translate-y-0.5">
              {isVerp ? (
                <Package className="size-4 transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-6" />
              ) : (
                <Target className="size-4 transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-6" />
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl leading-none tracking-tight">{isVerp ? "1,234" : "42"}</span>

              <Badge
                variant="outline"
                className="border-green-200 bg-green-500/10 text-green-700 dark:border-green-900/40 dark:bg-green-500/15 dark:text-green-300"
              >
                <TrendingUp />
                {isVerp ? "+124" : "+7"}
              </Badge>
            </div>
            <p className="text-sm">
              <span className="font-medium text-foreground">{isVerp ? "1,110" : "35"}</span>{" "}
              <span className="text-muted-foreground">last month</span>
            </p>
          </CardContent>
        </Card>

        <Card className="group transition-all duration-300 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardDescription>{isVerp ? "Team Members" : "Lead-to-Deal Rate"}</CardDescription>
            <div className="flex size-8 items-center justify-center rounded-lg border bg-muted/50 text-muted-foreground transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary group-hover:shadow-sm group-hover:-translate-y-0.5">
              {isVerp ? (
                <Users className="size-4 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6" />
              ) : (
                <Percent className="size-4 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6" />
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl leading-none tracking-tight">{isVerp ? "89" : "18.1%"}</span>

              <Badge
                variant="outline"
                className="border-green-200 bg-green-500/10 text-green-700 dark:border-green-900/40 dark:bg-green-500/15 dark:text-green-300"
              >
                <TrendingUp />
                {isVerp ? "+3" : "+1.6%"}
              </Badge>
            </div>
            <p className="text-sm">
              <span className="font-medium text-foreground">{isVerp ? "86" : "16.5%"}</span>{" "}
              <span className="text-muted-foreground">last month</span>
            </p>
          </CardContent>
        </Card>



        <Card className={isVerp ? "group transition-all duration-300 hover:shadow-md bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border-primary/30 shadow-sm" : "group transition-all duration-300 hover:shadow-md"}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardDescription className={isVerp ? "font-medium text-foreground" : ""}>{isVerp ? "Total Revenue" : "Qualified Lead Rate"}</CardDescription>
            <div className={`flex size-8 items-center justify-center rounded-lg border transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary group-hover:shadow-sm group-hover:-translate-y-0.5 ${isVerp ? "bg-primary/20 text-primary border-primary/30" : "bg-muted/50 text-muted-foreground"}`}>
              {isVerp ? (
                <DollarSign className="size-4 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6" />
              ) : (
                <Target className="size-4 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6" />
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl leading-none tracking-tight">{isVerp ? "$45,320" : "28.4%"}</span>

              <Badge
                variant="outline"
                className={isVerp
                  ? "border-green-200 bg-green-500/10 text-green-700 dark:border-green-900/40 dark:bg-green-500/15 dark:text-green-300"
                  : "border-destructive/20 bg-destructive/10 text-destructive"}
              >
                {isVerp ? <TrendingUp /> : <TrendingDown />}
                {isVerp ? "+12%" : "-2.5%"}
              </Badge>
            </div>
            <p className="text-sm">
              <span className="font-medium text-foreground">{isVerp ? "$40,120" : "30.9%"}</span>{" "}
              <span className="text-muted-foreground">last month</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
