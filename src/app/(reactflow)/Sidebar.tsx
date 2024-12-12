'use client'
import React from 'react';
import { useDnD } from './DnDContext';
import { Separator } from '@/components/ui/separator';
import { PhoneCallIcon, PhoneIncomingIcon } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Node, applyNodeChanges } from '@xyflow/react';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Button } from '@/components/ui/button';
import { useFlowContext } from '../infrastructure/flow.context';

type allNodesType = Node & { icon: React.ReactNode, data: { userReadableType: string, title: string, instructions: string } };
const Sidebar = ({ onAddNode }: { onAddNode: (node: allNodesType) => void }) => {
    const [_, setType] = useDnD();

    const { setNodes, setEdges } = useFlowContext()

    const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
        setType(nodeType);
        if (event.dataTransfer) {
            event.dataTransfer.setData("contentType", "application/reactflow");
            event.dataTransfer.effectAllowed = 'move';
        }
    };

    const allNodes: allNodesType[] = [
        {
            id: uuidv4(),
            position: { x: 50, y: 50 },
            type: 'defaultNode',
            icon: <PhoneCallIcon className='h-6 w-6' />,
            data: {
                userReadableType: 'Default',
                title: "New Default Node",
                instructions: "Placeholder instructions for agent to say",
            }
        },
        {
            id: uuidv4(),
            position: { x: 50, y: 50 },
            type: 'endNode',
            icon: <PhoneIncomingIcon className='h-6 w-6' />,
            data: {
                userReadableType: 'Conversation End',
                title: "End Phone Call",
                instructions: "Placeholder instructions for agent to say",
            }
        }
    ]

    const handleResetNodes = () => {
        setNodes([]);
        setEdges([]);
    }



    return (
        <aside className='w-full h-full '>
            <div className='h-full w-full flex flex-col items-end justify-between '>
                <div className='flex flex-col h-full w-full'>
                    <div className='w-full flex items-end justify-between p-4 pb-2'>
                        <div className='  font-medium'>Add New Node</div>
                        <ThemeToggle />
                    </div>
                    <Separator />

                    <div className='p-2 flex flex-col h-full gap-2'>
                        {allNodes.map((node) => (
                            <div key={node.type} onClick={() => onAddNode(node)} className="dndnode w-full relative text-muted-foreground border rounded-md p-4 hover:border hover:border-indigo-300 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 hover:bg-muted"
                            // onDragStart={(event) => onDragStart(event, node.type)}
                            // draggable
                            >
                                {node.icon}
                                <div className='text-sm leading-5 mt-3'>{node?.data?.title}</div>
                                {/* {node.title} */}
                            </div>
                        ))}
                    </div>

                </div>

                <div className='p-2 w-full'>
                    <Button onClick={handleResetNodes} variant="outline" className="w-full">
                        Reset Nodes
                    </Button>
                </div>
            </div>



        </aside >
    );
};

Sidebar.displayName = "Sidebar";

export default Sidebar;