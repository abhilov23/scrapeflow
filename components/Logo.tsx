import { cn } from "@/lib/utils";
import { SquareDashedMousePointer } from "lucide-react";
import Link from "next/link";

export default function Logo({
    fontSize="text-1xl",
    iconSize=15,
}:{
    fontSize?: string;
    iconSize?: number; 
}) {
    return (
        <>
         <Link href="/" className={cn(
            "text-xl font-extrabold flex items-center gap-2",
            fontSize
         )}>
            <div className="rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-500 p-2">
                <SquareDashedMousePointer size={iconSize} className="stroke-white"/>
            </div>
            <div> 
                <span className="bg-gradient-to-t from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
                   Scrape
                </span>
                <span className="text-stone-700 dark:text-stone-300">Flow</span>
            </div>
            </Link>   
        </>
    );
}
