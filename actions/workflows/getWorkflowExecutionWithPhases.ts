"use server";



import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import {error} from "console";


export default async function GetWorkflowExecutionWithPhases(executionId: string) {

    const {userId} = auth()

    if(!userId){
        throw new Error("unauthenticated");
    }

    return prisma.workflowExecution.findUnique({
        where:{
            id:executionId,
            userId,
        },
        include:{
            phases:{
                orderBy:{
                    number:"asc",
                }
            }
        }

    })
}
