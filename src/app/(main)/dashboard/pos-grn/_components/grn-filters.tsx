"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, RefreshCw } from "lucide-react";
import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function GrnFilters() {
  const [date, setDate] = React.useState<DateRange | undefined>();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Search Supplier" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pharma-corp">PharmaCorp Inc.</SelectItem>
          <SelectItem value="health-care">HealthCare Supplies LLC</SelectItem>
          <SelectItem value="global-meds">Global Meds</SelectItem>
        </SelectContent>
      </Select>

      <Input placeholder="Search Bill Number" className="w-[180px]" />
      <Input placeholder="Search by GRN Number..." className="w-[200px]" />

      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("w-[260px] justify-start text-left font-normal", !date && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} ➔ {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Start date ➔ End date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      <Button variant="ghost" size="icon" className="shrink-0" onClick={() => setDate(undefined)}>
        <RefreshCw className="h-4 w-4" />
      </Button>
    </div>
  );
}
