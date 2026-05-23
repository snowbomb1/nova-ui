import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface AccordionGroupContextValue {
    openItems: Set<string>;
    toggleItem: (id: string) => void;
    allowMultiple: boolean;
}

const AccordionGroupContext = createContext<AccordionGroupContextValue | null>(null);

export const useAccordionGroup = () => useContext(AccordionGroupContext);

export interface AccordionGroupProps {
    /** The accordion items to render */
    children: ReactNode;
    /** 
     * Whether multiple accordions can be open at the same time
     * @default false
     */
    allowMultiple?: boolean;
    /** 
     * Array of accordion IDs that should be open by default
     * @default []
     */
    defaultOpen?: string[];
}

/**
 * AccordionGroup manages the open/close state of multiple Accordion components.
 * When `allowMultiple` is false (default), only one accordion can be open at a time.
 */
export const AccordionGroup = ({ 
    children, 
    allowMultiple = false,
    defaultOpen = []
}: AccordionGroupProps) => {
    const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultOpen));

    const toggleItem = useCallback((id: string) => {
        setOpenItems(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                if (!allowMultiple) {
                    next.clear();
                }
                next.add(id);
            }
            return next;
        });
    }, [allowMultiple]);

    return (
        <AccordionGroupContext.Provider value={{ openItems, toggleItem, allowMultiple }}>
            {children}
        </AccordionGroupContext.Provider>
    );
};
