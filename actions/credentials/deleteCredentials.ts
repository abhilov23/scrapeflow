"use server"
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export async function DeleteCredential(name: string){
    const { userId} = auth();
    if(!userId) throw new Error("unauthenticated");


    await prisma.credential.delete({
        where:{
        userId_name: {
            name, userId
        }}
     });

     revalidatePath("/credentials")
   }