import { FlowValidationContext } from "../context/FlowValidationContext";
import { useContext } from "react";


export default function useFlowValidation() {
    const context = useContext(FlowValidationContext)
    if(!context){
        throw new Error(
            "useFlowValidation must be within FlowValidationContext"
        )
    }

    return context;
}
