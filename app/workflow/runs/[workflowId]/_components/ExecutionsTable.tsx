"use client"

import React from 'react'
import { GetWorkflowExecutions } from '@/actions/workflows/GetWorkflowExecutions';
import { useQuery } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DatesToDurationString } from '@/lib/helper/dates';
import { Badge } from '@/components/ui/badge';
import ExecutionStatusIndicator from './ExecutionStatusIndicator';
import { WorkflowExecutionStatus } from '@/types/workflow';


type InitialDataType = Awaited<ReturnType<typeof GetWorkflowExecutions>>;


function ExecutionsTable({workflowId, initialData}:{
    workflowId:string;
    initialData: InitialDataType
}) {
    const query = useQuery({
        queryKey:["executions", workflowId],
        initialData,
        queryFn: ()=>GetWorkflowExecutions(workflowId),
        refetchInterval: 5000,
    })
  return (
    <div className='border rounded-lg shadow-md overflow-auto'> 
       <Table className='h-full'>
                    <TableHeader>
        <TableRow> 
            <TableHead>Id</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Consumed</TableHead>
            <TableHead className='text-right text-xs text-muted-foreground'>Started At (desc)</TableHead>
        </TableRow>
        </TableHeader>
        <TableBody className='gap-2 h-full overflow-auto'> 
           {query.data.map((execution)=>{ 
            const duration = DatesToDurationString(execution.completedAt, execution.startedAt)
            return (<TableRow key={execution.id}> 
                <TableCell>
                    <div className='flex flex-col'>
                        <span className='font-semibold'>{execution.id}</span>
                        <div className='text-muted-foreground text-xs pt-1'> 
                              <span>Triggred via</span>
                              <Badge variant={'outline'}>{execution.trigger}</Badge>
                        </div>
                         </div>
                </TableCell>
                <TableCell> 
                    <div> 
                        <div className='flex gap-2 items-center'>
                            <ExecutionStatusIndicator status={execution.status as WorkflowExecutionStatus}/>
                            <span className='font-semibold capitalize'>{execution.status}</span>
                        </div>
                        <div>{duration}</div>
                    </div>
                </TableCell>
            </TableRow>)
           })}
        </TableBody>
         </Table>
    </div>
  )
}

export default ExecutionsTable