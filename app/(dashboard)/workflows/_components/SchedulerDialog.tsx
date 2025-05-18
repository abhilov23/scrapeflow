"use client";

import React from 'react'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CalendarIcon, TriangleAlertIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import CustomDialogHeader from '@/components/CustomDialogHeader';
import { Input } from '@/components/ui/input';


const SchedulerDialog = () => {
  return (
    <Dialog>
        <DialogTrigger asChild> 
            <Button variant={"link"} size={"sm"} className={cn("text-sm p-0 h-auto")}>
           <div className='flex items-center gap-1'> 
          <TriangleAlertIcon className='h-3 w-3'/>
             Set Schedule
            </div>
         </Button>
        </DialogTrigger>
        <DialogContent className='px-0'> 
            <CustomDialogHeader title='Schedule workflow execution' icon={CalendarIcon}/>
            <div className='p-6 space-y-4'>
                <p className='text-muted-foreground text-sm'>Specify a cron expression to schedule periodic workflow execution.
                    All times are in UTC.
                </p>
                <Input placeholder='E.g. * * * * *'/>
            </div>
            <DialogFooter className='px-6 gap-2'> 
               <DialogClose asChild> 
                <Button className='w-full' variant={"secondary"}> 
                    Cancel
                </Button>
               </DialogClose>
               <DialogClose asChild> 
                <Button className='w-full'> 
                    Save
                </Button>
               </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default SchedulerDialog