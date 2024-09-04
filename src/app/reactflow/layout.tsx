'use client'

import { ReactFlowProvider } from "@xyflow/react";
import { DnDProvider } from "./DnDContext";
import { ReactFlowLayoutProps } from "../types";
import { FlowContextProvider } from "../infrastructure/flow.context";


const ReactFlowLayout: React.FC<ReactFlowLayoutProps> = ({ children }) => {
    return (
        <FlowContextProvider>
            <ReactFlowProvider>
                <DnDProvider>

                    {children}
                </DnDProvider>

            </ReactFlowProvider>
        </FlowContextProvider>
    )
}
export default ReactFlowLayout