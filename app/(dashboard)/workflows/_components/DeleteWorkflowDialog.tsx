"use client";

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
import { Input } from "@/components/ui/input";
import { useState } from "react";



interface Props{ 
    open: boolean;
    setOpen: (open:boolean) => void;
    workflowName: string;
}




export default function DeleteWorkflowDialog({open, setOpen, workflowName}:Props) {

   const [confirmText, setConfirmText] = useState("");

    return (
    <AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle className="text-center">Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        <div className="flex flex-col items-center text-center py-4 gap-2">
          <p>If you delete this workflow, you will not be able to recover it.</p>
          <p>
            If you are sure, enter <b>{workflowName}</b> to confirm.
          </p>
          <Input value={confirmText} onChange={(e)=>setConfirmText(e.target.value)}/>
        </div>
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction disabled={confirmText !== workflowName}>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    );
}
