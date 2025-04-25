import { Workflow } from "@/lib/generated/prisma";
import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react";
import "@xyflow/react/dist/style.css";



export default function FlowEditor({workflow}: {workflow:Workflow}) {
    const [nodes, setNodes, onNodeChange]=useNodesState([]);
    const [edges, setEdges, onEdgeChange] = useEdgesState([]);
    
    return (
        <main className="h-full w-full">
          <ReactFlow nodes={nodes} edges={edges}
          onEdgesChange={onEdgeChange}
          onNodesChange={onNodeChange}
          >
          <Controls position="top-left"/>
          <Background variant={BackgroundVariant.Dots} gap={12} size={1}/>
          </ReactFlow>
        </main>
    );
}
