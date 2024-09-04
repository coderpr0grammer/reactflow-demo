'use client'
import React, { use, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    Connection,
    BackgroundVariant,
    EdgeChange,
    NodeChange,
    Node,
    Edge,
    Panel,
    useReactFlow,
    ColorMode,
    NodeProps,
    ReactFlowStore,
    EdgeProps,

} from '@xyflow/react';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import '@xyflow/react/dist/style.css';
import CustomNode from './nodes/StartNode';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Sidebar from './Sidebar';
import { DnDProvider, useDnD } from './DnDContext';
import EndNode from './nodes/EndNode';
import { toast } from 'sonner';
import DefaultNode from './nodes/DefaultNode';
import CustomEdge from './edges/CustomEdge';
import { useTheme } from 'next-themes';
import { CustomEdgeData, CustomEdgeProps, DefaultNodeType, EditNodeModalRef } from '../types';
import { v4 as uuidv4 } from 'uuid'
import EditNodeModal from './EditNodeModal';
import { useFlowContext } from '../infrastructure/flow.context';
import { initialNodes } from '../constants/initialFlowState';







// const useSelectedNode = () => {
//     const reactFlow = useReactFlow()
//     const selectedNode = reactFlow.getNodes().find((node) => node.selected);
//     return selectedNode;
// };

const ReactFlowDemo = () => {
    const { nodes, setNodes, edges, setEdges } = useFlowContext()

    // const [nodes, setNodes] = useLocalStorage<Node[]>('nodes', initNodes);
    // const [edges, setEdges] = useLocalStorage<Edge[]>('edges', initialEdges);

    const [modalOpen, setModalOpen] = useState(false);
    const { screenToFlowPosition } = useReactFlow();
    // const selectedNode = useSelectedNode();


    // console.log(selectedNode)


    const { resolvedTheme, setTheme } = useTheme();
    const [colorMode, setColorMode] = useState<ColorMode>(resolvedTheme as ColorMode || 'light');
    const [mounted, setMounted] = useState(false);
    const modalRef = useRef<EditNodeModalRef>(null);


    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted && resolvedTheme) {
            setColorMode(resolvedTheme as ColorMode);
        }
    }, [resolvedTheme, mounted]);

    useEffect(() => {
        if (nodes.length === 0) {
            setNodes(initialNodes);
        }
        if (nodes.length === 0) {
        }
    }, [nodes, edges]);

    const [type] = useDnD();

    const reactFlowWrapper = useRef<HTMLDivElement>(null);


    const onNodesChange: (changes: NodeChange[]) => void = useCallback(
        (changes) => {

            setNodes((nds) => {
                return applyNodeChanges(
                    changes.filter((change) => {
                        //   Prevent deletion of the start node
                        if (change.type === 'remove' && change.id === 'start-node' || change.type === 'remove' && change.id === 'end-node') {
                            console.log('prevented');
                            toast.error('You cannot delete the start or end node');
                            return false
                        }
                        return true;
                    }),
                    nds
                )
            });
        },
        [setNodes],
    );

    const onEdgesChange: (changes: EdgeChange[]) => void = useCallback(
        (changes) => {
            setEdges((eds) => applyEdgeChanges(changes, eds));
        },
        [setEdges],
    );

    const onConnect = useCallback(
        (params: Connection) => {

            const newEdge = {
                ...params,
                animated: true,
                type: 'customEdge',
                data: {
                    description: 'user responded',
                    onChangeLabel: (id: string, label: string) => {
                        setEdges((prev: Edge[]) =>
                            prev.map((edge) => (edge.id === id ? { ...edge, data: { ...edge.data, label } } : edge))
                        );
                    },
                },
            }

            setEdges((prev) => addEdge(newEdge, prev));
        },
        [setEdges],
    );

    const handleChangeLabel = useCallback((id: string, label: string) => {
        console.log(id, label)
        return;
        setEdges((prevEdges) => {
            return prevEdges.map((edge) => {
                if (edge.id === id) {
                    return { ...edge, label };
                }
                return edge;
            });
        });
    }, [setEdges]);



    const nodeTypes = useMemo(() => ({
        startNode: CustomNode,
        endNode: EndNode,
        defaultNode: DefaultNode,
    }), []);


    const edgeTypes = useMemo(() => ({
        customEdge: (props: CustomEdgeProps) => (
          <CustomEdge
            {...props}
            data={{
              ...props.data as CustomEdgeData,
              onChangeLabel: handleChangeLabel, // Pass the handler here
            }}
          />
        ),
      }), []);

    // const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    //     event.preventDefault();
    //     event.dataTransfer.dropEffect = 'move';
    // }, []);

    // const onDrop = useCallback(
    //     (event: React.DragEvent<HTMLDivElement>) => {
    //         event.preventDefault();

    //         // check if the dropped element is valid
    //         if (event.dataTransfer.getData("contentType") !== 'application/reactflow') {
    //             return;
    //         }
    //         if (!type) {
    //             return;
    //         }

    //         // project was renamed to screenToFlowPosition
    //         // and you don't need to subtract the reactFlowBounds.left/top anymore
    //         // details: https://reactflow.dev/whats-new/2023-11-10
    //         const position = screenToFlowPosition({
    //             x: event.clientX,
    //             y: event.clientY,
    //         });
    //         const newId = getId()
    //         const newNode = {
    //             id: getId(),
    //             type: type,
    //             position,
    //             data: {
    //                 instructions: "Placeholder instructions for agent to say",
    //             },
    //         }

    //         setStoredNodes((nds) => nds.concat(newNode));
    //     },
    //     [screenToFlowPosition, type],
    // );

    const handleAddNode = (node: Node & { icon: React.ReactNode, data: { userReadableType: string } }) => {
        const newNode = {
            id: node.id,
            type: node.type,
            position: node.position,
            data: node.data
        }

        setNodes((nds) => nds.concat(newNode));
    }

    const onNodeDoubleClick = (event: React.MouseEvent<Element, MouseEvent>, node: Node) => {
        modalRef?.current?.open(node)
    }

    const handleEditNodeSubmit = (node: Node) => {
        setNodes((nds) => nds.map((n) => {
            if (n.id === node.id) {
                console.log(node)
            } else {
                console.log("not equal")
            }
            return n.id === node.id ? node : n
        }))
    }

    if (!mounted) {
        return null; // or a loading spinner
    }


    return (

        <div className='h-screen w-screen' >

            <ResizablePanelGroup direction="horizontal" >
                <ResizablePanel >
                    <Sidebar onAddNode={handleAddNode} />
                </ResizablePanel>
                <ResizableHandle />

                <ResizablePanel defaultSize={75}>

                    <div ref={reactFlowWrapper} className=' h-full flex-1'>

                        <ReactFlow
                            key={colorMode}
                            nodes={nodes}
                            edges={edges}
                            colorMode={colorMode}
                            onNodesChange={onNodesChange}
                            onNodeDoubleClick={onNodeDoubleClick}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            nodeTypes={nodeTypes}
                            edgeTypes={edgeTypes}
                            // onDrop={onDrop}
                            // onDragOver={onDragOver}
                            fitView
                            proOptions={{ hideAttribution: true }}
                        >

                            <Controls />
                            {/* <MiniMap className='!bg-transparent' /> */}
                            <Background variant={BackgroundVariant.Dots} gap={16} size={0.75} />
                        </ReactFlow>
                        <EditNodeModal ref={modalRef} onSubmit={handleEditNodeSubmit} />
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>


        </div>
    );
};

ReactFlowDemo.displayName = "ReactFlowDemo";

export default ReactFlowDemo;
