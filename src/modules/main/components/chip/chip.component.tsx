import React, { FC } from "react";
import './chip.component.scss';

type ChipProps = {
    label: string;
    color?: string;
}

const Chip: FC<ChipProps> = (props) => {

    const {
        label,
        color = '#fff',
    } = props;

    return (
        <div className="chip-component" style={{backgroundColor: color}}>
            <span className="label"> {label} </span>
        </div>
    )
}

export default Chip;
