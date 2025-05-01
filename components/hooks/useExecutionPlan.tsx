import { FlowToExecutionPlan, FlowToExecutionPlanValidationError } from "@/lib/workflow/executionPlan";
import { AppNode } from "@/types/appNode";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import useFlowValidation from "./useFlowValidation";
import { toast } from "sonner";

export default function useExecutionPlan() {
    const { toObject } = useReactFlow();
    const {setInvalidInputs, clearErrors} = useFlowValidation();

    const handleError = useCallback((error:any)=>{
        console.log("Error:", error);
          switch(error.type){
            case FlowToExecutionPlanValidationError.NO_ENTRY_POINT:
                toast.error("No entry point found")
                break;
            case FlowToExecutionPlanValidationError.INVALID_INPUTS:
                toast.error("Not all input values are set");
                setInvalidInputs(error.invalidElements)
                break;
            default:
                toast.error("Something went wrong");
                break;
          }
    },[setInvalidInputs])

    const generateExecutionPlan = useCallback(() => {
        const { nodes, edges } = toObject(); // moved inside the callback

        if (!nodes || nodes.length === 0) {
            console.warn("React Flow nodes are not initialized yet.");
            return null;
        }

        try {
            const { executionPlan, error } = FlowToExecutionPlan(nodes as AppNode[], edges);
           
            if(error){
                handleError(error);
                return null;
            }
            clearErrors();
            return executionPlan;
        } catch (err) {
            console.error("Failed to generate execution plan:", err);
            return null;
        }
    }, [toObject, handleError, clearErrors]);

    return generateExecutionPlan;
}
