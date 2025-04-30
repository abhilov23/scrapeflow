import { FlowToExecutionPlan } from "@/lib/workflow/executionPlan";
import { AppNode } from "@/types/appNode";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

export default function useExecutionPlan() {
    const {toObject} = useReactFlow();
    const {nodes, edges} = toObject();


    const generateExecutionPlan = useCallback(()=>{
    const {executionPlan} = FlowToExecutionPlan(nodes as AppNode[], edges);
    return executionPlan;
    }, [toObject])
    return generateExecutionPlan;
}
