"use server";

import {  createWorkflowSchema, createWorkflowSchemaType } from "@/schema/workflows";
import {z} from "zod";
import { auth } from "@clerk/nextjs/server";
import  prisma  from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflow";
import { redirect } from "next/navigation";


export async function CreateWorkflow(form: createWorkflowSchemaType){
        const {success, data} = createWorkflowSchema.safeParse(form);
        if(!success){
            throw new Error("Invalid form data");
        }


        const {userId} = auth();

        if(!userId){
            throw new Error("unauthenticated");
        }

        const result = await prisma.workflow.create({
            data: {
                userId,
                status: WorkflowStatus.DRAFT,
                defination:"TODO",
                ...data,
            },
        });

        if(!result){
            throw new Error("Create New Workflow");
        }

        redirect(`/workflow/editor/${result.id}`);
}