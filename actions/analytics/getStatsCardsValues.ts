"use server"

import { auth } from "@clerk/nextjs/server";
import { Period


 } from "@/types/analytics";
import { PeriodToDateRange } from "@/lib/helper/dates";
export async function GetStatsCardsValues(period: Period) {
    const dateRange = PeriodToDateRange(period);

    return dateRange;
}