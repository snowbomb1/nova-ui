import { useEffect } from "react";

type Event = 'down' | 'up' | 'enter' | 'escape'

interface KeyHandler {
    handler: (event: Event) => void;
    enabled?: boolean;
}

export const useKeyboardShortcuts = ({ enabled = true, handler }: KeyHandler) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!enabled) return;
            switch (event.key) {
                case 'ArrowDown':
                    event.preventDefault();
                    handler("down")
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    handler("up")
                    break;
                case 'Enter':
                    event.preventDefault();
                    handler("enter")
                    break;
                case 'Escape':
                    event.preventDefault();
                    handler("escape")
                    break;
                default:
                    break;
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [enabled, handler])
}