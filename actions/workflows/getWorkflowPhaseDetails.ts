"use server"

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"


export async function GetWorkflowPhaseDetails(phaseId: string){
    const {userId} = auth();
    if(!userId){
        throw new Error("unauthenticated");
    }

    return prisma.executionPhase.findFirst({
     where: {
       id: phaseId,
       execution: {
         userId: userId,
       },
     },
     include: {
       logs: {
         orderBy: {
           timestamp: "asc",
         },
       },
     },
   });
}