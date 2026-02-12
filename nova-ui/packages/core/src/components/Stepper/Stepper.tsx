import { motion } from "motion/react";
import { IMinus } from "../../icons/minus";
import { IPlus } from "../../icons/plus";
import { Input } from "../Input";
import styles from './stepper.module.css';

export interface StepperProps {
    value: number;
    onChange: (value: number) => void;
}

export const Stepper = ({ value, onChange }: StepperProps) => {
    return (
        <motion.div className={styles.stepperInput}>
            <IMinus width="25" onClick={() => onChange(value - 1)} />
            <Input value={value?.toString()} hideClear readOnly />
            <IPlus width="25" onClick={() => onChange(value + 1)} />
        </motion.div>
    )
}