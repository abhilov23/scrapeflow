"use client"
import { ParamProps } from "@/types/appNode";

import { Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel,
 } from "@/components/ui/select";
import { useId } from "react";
import { Label } from "@/components/ui/label";
import UpdateWorkflow from "@/actions/workflows/updateWorkflow";

type OptionType = {
    label: string;
    value: string;
}


export default function SelectParam({param, updateNodeParamValue, value}:ParamProps) {
  const id = useId()



    return (
        <div className="flex flex-col gap-1 w-full">
        <Label htmlFor={id} className="text-xs flex">
          {param.name}
          {param.required && <p className="text-red-400 px-2">*</p>}  
        </Label>
        <Select onValueChange={(value) => updateNodeParamValue(value)} defaultValue={value}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Options</SelectLabel>
                    {param.options.map((option: OptionType) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
        </div>
    );
}
