import NodeComponent from "@/app/(dashboard)/workflows/_components/nodes/NodeComponent";
import { Workflow } from "@/lib/generated/prisma";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { TaskType } from "@/types/task";
import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState, useReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useEffect } from "react";

const nodeTypes={
    FlowScrapeNode:NodeComponent,
}

const snapGrid: [number, number] = [50, 50];


export default function FlowEditor({workflow}: {workflow:Workflow}) {

   const fitViewOptions = {padding: 1};


    const [nodes, setNodes, onNodeChange]=useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const {setViewport} = useReactFlow();

    useEffect(()=>{
        try {
          const flow = JSON.parse(workflow.definition)
          if(!flow) return;
          setNodes(flow.nodes || []);
          setEdges(flow.edges || []);
          if(!flow.viewport) return;
          const {x=0, y=0, zoom=1} = flow.viewport;
          setViewport({x, y, zoom});
        } catch (error) {}
    },[workflow.definition, setEdges, setNodes, setViewport]);
    
    return (
        <main className="h-full w-full">
          <ReactFlow nodes={nodes} edges={edges}
          onEdgesChange={onEdgesChange}
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
