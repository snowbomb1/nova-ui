import React, { forwardRef } from 'react';
import styles from './grid.module.css';

export type GridGap = 'sm' | 'md' | 'lg'
export type GridAlign = 'start' | 'center' | 'end' | 'stretch'
export type GridJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'

export type GridCellDef = {
    /** 
     * Column span at different breakpoints
     * - default: Base span (mobile-first)
     * - sm: 576px and up
     * - md: 768px and up
     * - lg: 1024px and up
     */
    colspan: { default: number; sm?: number; md?: number; lg?: number };
}

export interface GridProps {
    /** 
     * Array of cell definitions that map to each child element.
     * Each definition specifies the column span at different breakpoints.
     */
    gridDefinition: GridCellDef[];
    /** 
     * Gap size between grid cells
     * - 'sm' - 0.5rem
     * - 'md' - 1rem
     * - 'lg' - 1.5rem
     */
    gap?: GridGap;
    /** 
     * Vertical alignment of grid items
     * @default 'stretch'
     */
    alignItems?: GridAlign;
    /** 
     * Horizontal distribution of grid items
     * @default 'start'
     */
    justifyContent?: GridJustify;
    /** The grid cell contents. Each child maps to a gridDefinition entry by index. */
    children: React.ReactNode[];
}

const buildCellClasses = (def: GridCellDef): string => {
    const classes = [];

    if (typeof def.colspan === 'object') {
        if (def.colspan.default) classes.push(styles[`colspan${def.colspan.default}`]);
        if (def.colspan.sm) classes.push(styles[`colspanSm${def.colspan.sm}`]);
        if (def.colspan.md) classes.push(styles[`colspanMd${def.colspan.md}`]);
        if (def.colspan.lg) classes.push(styles[`colspanLg${def.colspan.lg}`]);
    }

    return classes.join(' ');
}


export const Grid = forwardRef<HTMLDivElement, GridProps>(
    ({ gridDefinition, gap, alignItems, justifyContent, children }, ref) => {
        const childArray = React.Children.toArray(children);

        const gridClasses = [
            styles.grid,
            gap ? styles[`gap${gap}`] : '',
            alignItems ? styles[`align${alignItems}`] : '',
            justifyContent ? styles[`justify${justifyContent}`] : ''
        ].filter(Boolean).join(' ');

        return (
            <div ref={ref} className={gridClasses}>
                {childArray.map((child, index) => {
                    const def = gridDefinition[index] ?? {};
                    return (
                        <div key={index} className={buildCellClasses(def)}>
                            {child}
                        </div>
                    )
                })}
            </div>
        )
    }
);

Grid.displayName = 'Grid';
