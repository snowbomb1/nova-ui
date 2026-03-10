import React, { forwardRef } from 'react';
import styles from './styles.module.css';

export type GridGap = 'sm' | 'md' | 'lg'

export type GridCellDef = {
    colspan: { default: number; sm?: number; md?: number; lg?: number };
}

export interface GridProps {
    gridDefinition: GridCellDef[];
    gap?: GridGap;
    children: React.ReactNode[];
}

const buildCellClasses = (def: GridCellDef): string => {
    const classes = [];

    console.log('def:', def);
    console.log('colspan:', def.colspan);

    if (typeof def.colspan === 'object') {
        if (def.colspan.default) classes.push(styles[`colspan${def.colspan.default}`]);
        if (def.colspan.sm) classes.push(styles[`colspanSm${def.colspan.sm}`]);
        if (def.colspan.md) classes.push(styles[`colspanMd${def.colspan.md}`]);
        if (def.colspan.lg) classes.push(styles[`colspanLg${def.colspan.lg}`]);
    }

    console.log('classes:', classes);
    return classes.join(' ');
}


export const Grid = forwardRef<HTMLDivElement, GridProps>(
    ({ gridDefinition, gap, children }, ref) => {
        const childArray = React.Children.toArray(children);

        return (
            <div ref={ref} className={`${styles.grid} ${gap ? styles[`gap${gap}`] : ''}`}>
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
)