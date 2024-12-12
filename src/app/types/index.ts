import { Edge, EdgeProps, Node } from "@xyflow/react";

export type DefaultNodeData = {
    title: string
    instructions: string;
    userReadableType: string;
}

export type DefaultNodeType = Node<DefaultNodeData>;

export type EditNodeModalProps = {
    onSubmit: (newNode: Node) => void;
}
// Define a custom type for the ref
export type EditNodeModalRef = {
    open(node: Node): void;
    closeModal(): void;
};

export type ReactFlowLayoutProps = {
    children: React.ReactNode;
}



export type StartNodeData = {
    title: string;
    instructions: string;
}


export type StartNodeType = Node<StartNodeData>;

export type CustomEdgeData = {
    description: string;
    onChangeLabel: (id: string, description: string) => void;
};


export type CustomEdgeProps = EdgeProps<Edge<CustomEdgeData>>;

