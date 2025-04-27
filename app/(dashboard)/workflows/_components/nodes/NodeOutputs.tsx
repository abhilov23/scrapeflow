"use client"

import { TaskParam } from "@/types/task";
import { ReactNode } from "react";

export default function NodeOutputs({children}:{children:ReactNode}) {
    return (
        <div className="flex flex-col divide-y gap-2">
          {children}
        </div>
    );
}



export function NodeOutput({output}:{
  output:TaskParam
}) {
    return (
       <div>
        {output.name}
       </div>
    );
}
