import { GetPeriods } from "@/actions/analytics/getPeriods";

export default function HomePage() {
    return (
        <div>
            <h1>Home</h1>
        </div>
    );
}


async function PeriodSelectorWrapper(){
   const periods = await GetPeriods();
   return <pre>{JSON.stringify(PeriodSelectorWrapper, null, 4)}</pre>    
}


