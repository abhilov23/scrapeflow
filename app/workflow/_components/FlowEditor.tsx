import NodeComponent from "@/app/(dashboard)/workflows/_components/nodes/NodeComponent";
import { Workflow } from "@/lib/generated/prisma";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { TaskType } from "@/types/task";
import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react";
import "@xyflow/react/dist/style.css";


const nodeTypes={
    FlowScrapeNode:NodeComponent,
}

const snapGrid: [number, number] = [50, 50];


export default function FlowEditor({workflow}: {workflow:Workflow}) {

   const fitViewOptions = {padding: 1};


    const [nodes, setNodes, onNodeChange]=useNodesState([
        CreateFlowNode(TaskType.LAUNCH_BROWSER),
    ]);
    const [edges, setEdges, onEdgeChange] = useEdgesState([]);
    
    return (
        <main className="h-full w-full">
          <ReactFlow nodes={nodes} edges={edges}
          onEdgesChange={onEdgeChange}
          onNodesChange={onNodeChange}
          nodeTypes={nodeTypes}
          snapToGrid={true}
          snapGrid={snapGrid}
          fitViewOptions={fitViewOptions}
          fitView
          >
          <Controls position="top-left" fitViewOptions={fitViewOptions}/>
          <Background variant={BackgroundVariant.Dots} gap={12} size={1}/>
          </ReactFlow>
        </main>
    );
}
