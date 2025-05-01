"use client"

import runWorkflow from "@/actions/workflows/runWorkflow";
import useExecutionPlan from "@/components/hooks/useExecutionPlan";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { PlayIcon } from "lucide-react";
import { toast } from "sonner";



export default function ExecuteBtn({workflowId}:{workflowId: string}) {
   const generate = useExecutionPlan();
   const {toObject} = useReactFlow()


   const mutation = useMutation({
    mutationFn:runWorkflow,
    onSuccess :()=>{
      toast.success("Execution Started",{
        id: "flow-execution"
      })
    },
    onError:()=>{
      toast.error("something went wrong",{
        id:"flow-execution"
      })
    }
   })


    return (
        <Button variant={"outline"} 
        className="flex items-center gap-2"
        disabled={mutation.isPending}
        onClick={()=>{
            const plan = generate();
            if(!plan){
                //client side valiation
                return;
            } 
            mutation.mutate({
             workflowId:workflowId,
             flowDefinition: JSON.stringify(toObject())
            })
        }}
        >
            <PlayIcon  size={16} className="stroke-orange-400"/>
            Execute
        </Button>
    );
}
