import { GetWorkflowExecutions } from "@/actions/workflows/GetWorkflowExecutions";
import Topbar from "@/app/(dashboard)/workflows/_components/topbar/Topbar";
import { waitFor } from "@/lib/helper/waitFor";
import { exec } from "child_process";
import { InboxIcon, Loader2Icon } from "lucide-react";
import { Suspense } from "react";
import ExecutionsTable from "./_components/ExecutionsTable";

export default function ExecutionPage({params}:{
    params:{
        workflowId:string
    }
}) {
    return <div className="w-full h-full overflow-auto">
        <Topbar 
        workflowId={params.workflowId}
        hideButtons
        title="All runs"
        subtitle="list of all your workflow runs"
        />
        <Suspense fallback={
            <div className="flex h-full w-full items-center justify-center">
                 <Loader2Icon size={20} className="animate-spin stroke-primary"/> 
            </div>
        }> 
                  <ExecutionsTableWrapper  workflowId={params.workflowId}/>
        </Suspense>
        </div>
}

async function ExecutionsTableWrapper({workflowId}:{
    workflowId:string
}){
    await waitFor(4000)
    const executions = await GetWorkflowExecutions(workflowId);
    if(!executions){
        return <div>No Data</div>
    }

    if(executions.length === 0){
      return (
      <div className="container w-full py-6"> 
         <div className="flex items-center flex-col gap-2 justify-center h-full w-full"> 
            <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
                <InboxIcon size={40} className="stroke-primary"/>
            </div>
            <div className="flex flex-col gap-1 text-center">
                <p className="font-bold"> 
                  No runs have been triggered yet for this workflow
                </p>
                <p className="text-sm text-muted-foreground"> 
                  You can trigger a new run in the editor page
                </p>
            </div>
         </div>
        </div>
    )
    }

    return <div className="container py-6 w-full"> 
         <ExecutionsTable workflowId={workflowId} initialData={executions}/>
    </div>
}