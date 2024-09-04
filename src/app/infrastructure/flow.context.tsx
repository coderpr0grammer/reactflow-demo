import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Edge, Node } from "@xyflow/react";
import React from "react";
import { initialEdges, initialNodes } from "../constants/initialFlowState";

const FlowContext = React.createContext<FlowContextType | undefined>(undefined);

interface FlowContextType {
    nodes: Node[];
    setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
    edges: Edge[];
    setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}

interface FlowContextProviderProps {
    children: React.ReactNode;
}

export const useFlowContext = () => {
    const context = React.useContext(FlowContext as React.Context<FlowContextType>);
    if (context === undefined) {
        throw new Error('useFlowContext must be used within a FlowContextProvider');
    }
    return context;
};

export const FlowContextProvider: React.FC<FlowContextProviderProps> = ({ children }) => {
    const [nodes, setNodes] = useLocalStorage<Node[]>('nodes', initialNodes);
    const [edges, setEdges] = useLocalStorage<Edge[]>('edges', initialEdges);

    return (
        <FlowContext.Provider value={{
            nodes,
            setNodes,
            edges,
            setEdges
        }}>
            {children}
        </FlowContext.Provider>
    )
}


FlowContextProvider.displayName = "FlowContextProvider"