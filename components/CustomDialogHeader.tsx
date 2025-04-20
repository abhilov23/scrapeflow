"use client";

import { LucideIcon } from "lucide-react";
import { DialogHeader, DialogTitle } from "./ui/dialog";
import { cn } from "@/lib/utils";

interface Props {
    title?:string;
    subTitle?:string;
    icon?:LucideIcon;


    iconClassName?:string;
    titleClassName?:string;
    subtitleClassName?:string;
}

export default function CustomDialogHeader(props: Props){

   const Icon = props.icon;

    return <DialogHeader className="py-6"> 
         <DialogTitle asChild>
            <div className="flex flex-col items-center gap-2 mb-2">
                {Icon && <Icon size={30} className={cn("stroke-primary", props.iconClassName)}/>}
            </div>
         </DialogTitle>
    </DialogHeader>
}