import Topbar from "@/app/(dashboard)/workflows/_components/topbar/Topbar";
import { waitFor } from "@/lib/helper/waitFor";
import { auth } from "@clerk/nextjs/server";
import { Loader2Icon, Workflow } from "lucide-react";
import { Suspense } from "react";
import GetWorkflowExecutionWithPhases from "@/actions/workflows/getWorkflowExecutionWithPhases";
import ExecutionViewer from "./_components/ExecutionViewer";

export default function ExecutionViewerPage({params}:{
 params:{
    executionId:string;
    workflowId:string;
 };
}) {
    return (
        <div className="flex flex-col h-screen w-full overflow-hidden">
           <Topbar 
           workflowId={params.workflowId}
           title="workflow run details"
           subtitle={`Run ID: ${params.executionId}`}
           hideButtons
           />
           <section className="flex h-full overflow-auto">
             <Suspense fallback={
                <div className="flex w-full items-center justify-center">
                    <Loader2Icon className="h-10 w-10 animate-spin stroke-primary"/>
                </div>
             }>
                <ExecutionViewerWapper executionId={params.executionId}/>
             </Suspense>
           </section>
        </div>
    );
}


async function ExecutionViewerWapper({executionId}:{
    executionId:string;
}){
    const {userId} = auth()
    if(!userId){
        return <div>unauthenticated</div>
    }
    const workflowExecution = await GetWorkflowExecutionWithPhases(executionId);
    if(!workflowExecution){
        return <div>Not Found</div>
    } 


    return <ExecutionViewer initialData={workflowExecution}/>;
}