"use client";

import { Workflow } from '@/lib/generated/prisma';
import React from 'react';
import {ReactFlowProvider} from "@xyflow/react";
import FlowEditor from './FlowEditor';
import Topbar from '@/app/(dashboard)/workflows/_components/topbar/Topbar';
import TaskMenu from './TaskMenu';
import {  FlowValidationContextProvider } from '@/components/context/FlowValidationContext';
import { WorkflowStatus } from '@/types/workflow';


export default function Editor({workflow}:{workflow:Workflow}) {
    return (
        <FlowValidationContextProvider>
        <ReactFlowProvider>
            <div className='flex flex-col h-full w-full overflow-hidden'>
                <Topbar title="Workflow Editor" subtitle={workflow.name} workflowId={workflow.id} isPublished={workflow.status === WorkflowStatus.PUBLISHED}/>
             <section className='flex h-full overflow-auto'>
                <TaskMenu/>
                    <FlowEditor workflow={workflow}/>
             </section>
            </div>
        </ReactFlowProvider>
        </FlowValidationContextProvider>
    );
}


