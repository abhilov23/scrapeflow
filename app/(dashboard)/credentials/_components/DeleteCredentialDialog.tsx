"use client";

import { DeleteCredential } from "@/actions/credentials/deleteCredentials";
import DeleteWorkflow from "@/actions/workflows/deleteWorkflow";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { XIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";



interface Props{ 
    name:string;
}




export default function DeleteCredentialDialog({name}:Props) {
   const [open, setOpen] = useState(false);
   const [confirmText, setConfirmText] = useState("");
   const deleteMutation=useMutation({
    mutationFn: DeleteCredential,
    onSuccess: ()=>{
        toast.success("Credentials Deleted Successfully",{
            id:name
        })
        setConfirmText("");
    },
    onError: ()=>{
        toast.error("something went wrong,",{
            id:name
        });
    }
   })


    return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild> 
        <Button variant={"destructive"} size={"icon"}>
          <XIcon size={18}/>
        </Button>
      </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle className="text-center">Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        <div className="flex flex-col items-center text-center py-4 gap-2">
          <p>If you delete this credential, you will not be able to recover it.</p>
          <p>
            If you are sure, enter <b>{name}</b> to confirm.
          </p>
          <Input value={confirmText} onChange={(e)=>setConfirmText(e.target.value)}/>
        </div>
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
        <AlertDialogCancel onClick={()=>setConfirmText("")}>Cancel</AlertDialogCancel>
        <AlertDialogAction disabled={confirmText !== name || deleteMutation.isPending}
         className="!bg-destructive !text-destructive-foreground hover:bg-destructive/90"
         onClick={(e)=>{
           e.stopPropagation();
           toast.loading("Delete credential....", {id: name});
           deleteMutation.mutate(name);
         }}
         >
            Delete
            </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    );
}
