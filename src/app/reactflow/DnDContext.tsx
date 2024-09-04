import { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';

// Define the type of the context value
type DnDContextType = [string | null, Dispatch<SetStateAction<string | null>>];

// Create the context with the correct type
const DnDContext = createContext<DnDContextType | undefined>(undefined);

interface DnDProviderProps {
    children: React.ReactNode;
}

export const DnDProvider: React.FC<DnDProviderProps> = ({ children }) => {
    const [type, setType] = useState<string | null>(null);

    return (
        <DnDContext.Provider value={[type, setType]}>
            {children}
        </DnDContext.Provider>
    );
};

export default DnDContext;

export const useDnD = (): DnDContextType => {
    const context = useContext(DnDContext);

    if (context === undefined) {
        throw new Error('useDnD must be used within a DnDProvider');
    }

    return context;
};
