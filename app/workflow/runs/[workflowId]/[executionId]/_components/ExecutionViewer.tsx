"use client";
import GetWorkflowExecutionWithPhases from '@/actions/workflows/getWorkflowExecutionWithPhases';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WorkflowExecutionStatus } from '@/types/workflow';
import { Separator } from '@radix-ui/react-separator';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { CalendarIcon, CircleDashedIcon, ClockIcon, CoinsIcon, Loader2Icon, LucideIcon, WorkflowIcon } from 'lucide-react';
import React, { ReactNode } from 'react';
import { DatesToDurationString } from '@/lib/helper/dates';
import { getPhasesTotalCost } from '@/lib/helper/phases';

type ExecutionData = Awaited<ReturnType<typeof GetWorkflowExecutionWithPhases>>;


export default function ExecutionViewer({initialData}:{
    initialData: ExecutionData;
}) {
    const query = useQuery({
        queryKey:["execution", initialData?.id],
        initialData,
        queryFn: ()=> GetWorkflowExecutionWithPhases(initialData!.id),
        refetchInterval: (q)=> q.state.data?.status === WorkflowExecutionStatus.RUNNING ? 1000 : false,
    })

    const duration = DatesToDurationString(
        query.data?.completedAt,
        query.data?.startedAt
    );

    const creditConsumed=getPhasesTotalCost(query.data?.phases || [])

    return (
        <div className='flex w-full h-full'>
            <aside className='w-[320px] min-w-[320px] max-w-[320px] border-r-2 border-separate flex flex-grow flex-col overflow-hidden'>
             <div className='py-4 px-2'>
                {/*Status label */}
               <ExecutionLabel icon={CircleDashedIcon} label="status" value={query.data?.status}/>
                {/*Started At label */}
                <ExecutionLabel 
                 icon={CalendarIcon} 
                 label="Started At" 
                 value={
                 query.data?.startedAt 
                 ? <span className='lowercase'>
                  {formatDistanceToNow(new Date(query.data?.startedAt), { addSuffix: true })}
                  </span> 
                : <span>-</span>
                   }
                   />
                <ExecutionLabel icon={ClockIcon} label="Duration" value={duration ? duration: <Loader2Icon className='animate-spin' size={20}/>}/>
                <ExecutionLabel icon={CoinsIcon} label="Credits Consumed" value={creditConsumed}/>
                </div>  
                 <Separator/>
                 <div className='flex justify-center items-center py-2 px-4'>
                    <div className='text-muted-foreground flex items-center gap-2'>
                        <WorkflowIcon size={20} className='stroke-muted-foreground/80'/>
                        <span className='font-semibold'>Phases</span>
                    </div>
                 </div>
                 <Separator/>
                 <div className='overflow-auto h-full px-2 py-4'>
                    {query.data?.phases.map((phase, index)=>(
                        <Button key={phase.id} className='w-full justify-between' variant={"ghost"}>
                          <div className='flex items-center gap-2'>
                            <Badge>
                               {index + 1}
                            </Badge>
                            <p className='font-semibold'>
                                {phase.name}
                            </p>
                            </div>
                            <p className='text-xs text-muted-foreground'>
                                {phase.status}
                            </p>
                        </Button>
                    ))}
                 </div>
            </aside>
        </div>
    );
}

function ExecutionLabel({icon, label, value}:{
    icon:LucideIcon;
    label:ReactNode;
    value: ReactNode;
}){
    const Icon = icon;
    return (
        <div className='flex justify-between items-center py-2 px-4 text-sm'>
                    <div className='text-muted-foreground flex items-center gap-2'>  
                      <Icon
                     size={20}
                     className='stroke-muted-foreground'
                     />
                     <span>{label}</span>
                    </div>
                    <div className='font-semibold capitalize flex gap-2 items-center'>
                    {value}
                </div>
            </div>
    )
}