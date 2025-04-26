import NodeComponent from "@/app/(dashboard)/workflows/_components/nodes/NodeComponent";
import { Workflow } from "@/lib/generated/prisma";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { TaskType } from "@/types/task";
import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react";
import "@xyflow/react/dist/style.css";


const nodeTypes={
    FlowScrapeNode:NodeComponent,
}


export default function FlowEditor({workflow}: {workflow:Workflow}) {
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
          >
          <Controls position="top-left"/>
          <Background variant={BackgroundVariant.Dots} gap={12} size={1}/>
          </ReactFlow>
        </main>
    );
}
