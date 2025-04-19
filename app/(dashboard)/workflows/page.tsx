import { Skeleton } from '@/components/ui/skeleton';
import { waitFor } from '@/lib/helper/waitFor';
import React, { Suspense } from 'react';


export default function workflowPage() {
    return (
        <>
        <div className='flex-1 flex flex-col h-full'>
            <div className='flex justify-center'>
                <div className='flex flex-col'>
                  <h1 className='text-3xl font-bold'>
                 workflows
                  </h1>
                  <p className='text-muted-foreground'>Manage your workflows</p>
                </div>
            </div>
            <div className='h-full py-6'>
              <Suspense fallback={<UserWorkflowSkelton/>}>
              <UserWorkflows/>
              </Suspense>
            </div>
        </div>
        </>
    );
}

//creates the skelton before loading elements.
 function UserWorkflowSkelton(){
   
   return <>
   <div className='space-y-2 '>
    {[1,2,3,4].map((i)=>(
        <Skeleton key={i} className='h-32 w-full'/>
    ))}
   </div>
   </>
}

async function UserWorkflows(){
   await waitFor(3000);
   return <>
    <div></div>
    </>
}