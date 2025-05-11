"use client"

import React from 'react'
import { GetWorkflowExecutions } from '@/actions/workflows/GetWorkflowExecutions';
import { useQuery } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DatesToDurationString } from '@/lib/helper/dates';


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
                <TableCell>{execution.id}</TableCell>
            </TableRow>)
           })}
        </TableBody>
         </Table>
    </div>
  )
}

export default ExecutionsTable