import { useLayoutEffect, useState, useCallback, type MouseEvent } from 'react';

type Theme = 'light' | 'dark'

export const useTheme = () => {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem('nova-ui-theme');
        if (!saved) {
            return window.matchMedia('(prefers-color-schmeme: dark)').media ? 'dark' : 'light';
        } else {
            return saved as Theme;
        }
    });
    
    useLayoutEffect(() => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
        localStorage.setItem('nova-ui-theme', theme);
    }, [theme])

    const toggleTheme = useCallback((event: MouseEvent) => {
        if (isTransitioning) return;

        const x = event.clientX;
        const y = event.clientY;

        document.documentElement.style.setProperty('--x', `${x}px`)
        document.documentElement.style.setProperty('--y', `${y}px`)
        
        const applyTheme = () => {
            setTheme(prev => prev === 'dark' ? 'light' : 'dark')
        };
        if (!document.startViewTransition) {
            applyTheme();
            return;
        }
        setIsTransitioning(true);
        const transition  = document.startViewTransition(applyTheme);
        transition.finished.finally(() => {
            setIsTransitioning(false);
        })
    }, [isTransitioning]);

    return { theme, isTransitioning, toggleTheme }
}