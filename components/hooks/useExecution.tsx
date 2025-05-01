import { FlowToExecutionPlan } from "@/lib/workflow/executionPlan";
import { AppNode } from "@/types/appNode";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

export default function useExecutionPlan() {
    const { toObject } = useReactFlow();

    const generateExecutionPlan = useCallback(() => {
        const { nodes, edges } = toObject(); // moved inside the callback

        if (!nodes || nodes.length === 0) {
            console.warn("React Flow nodes are not initialized yet.");
            return null;
        }

        try {
            const { executionPlan } = FlowToExecutionPlan(nodes as AppNode[], edges);
            return executionPlan;
        } catch (err) {
            console.error("Failed to generate execution plan:", err);
            return null;
        }
    }, [toObject]);

    return generateExecutionPlan;
}
