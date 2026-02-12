import { useLayoutEffect, useState, useCallback, type MouseEvent } from 'react';

export const useTheme = () => {
    const [isDark, setIsDark] = useState<boolean>();
    const [isTransitioning, setIsTransitioning] = useState(false);
    
    useLayoutEffect(() => {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const hasDarkClass = document.documentElement.classList.contains('dark')
        setIsDark(isDarkMode && hasDarkClass)
        if (isDarkMode && hasDarkClass) {
            document.documentElement.classList.remove('light')
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark')
            document.documentElement.classList.add('light');
        }
    }, [])

    const toggleTheme = useCallback((event: MouseEvent) => {
        if (isTransitioning) return;

        const x = event.clientX;
        const y = event.clientY;

        document.documentElement.style.setProperty('--x', `${x}px`)
        document.documentElement.style.setProperty('--y', `${y}px`)
        const isDarkNow = document.documentElement.classList.contains('dark');
        setIsDark(!isDarkNow)
        if (!document.startViewTransition) {
            if (isDarkNow) {
                document.documentElement.classList.remove('dark')
                document.documentElement.classList.add('light')
            } else {
                document.documentElement.classList.remove('light')
                document.documentElement.classList.add('dark')
            }
            return;
        }
        setIsTransitioning(true);
        const transition = document.startViewTransition(() => {
            if (isDarkNow) {
                document.documentElement.classList.remove('dark');
                document.documentElement.classList.add('light');
            } else {
                document.documentElement.classList.remove('light');
                document.documentElement.classList.add('dark');
            }
            return;
        });
        transition.finished.finally(() => {
            setIsTransitioning(false);
        })
    }, [isTransitioning]);

    return { isDark, isTransitioning, toggleTheme }
}