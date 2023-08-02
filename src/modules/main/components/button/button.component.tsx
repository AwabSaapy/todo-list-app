import React, {FC} from "react";
import {SvgIconProps} from "@mui/material";
import './button.component.scss';

type ButtonProps = {
    label?: string;
    labelColor?: string;
    background?: string;
    startIcon?: React.ReactElement<SvgIconProps>;
    endIcon?: React.ReactElement<SvgIconProps>;
    disabled?: boolean;
    onClick: () => void;
}

const Button: FC<ButtonProps> = (props) => {

    const {
        label = "",
        labelColor = "#fff",
        background = "#518dc9",
        startIcon = null,
        endIcon = null,
        disabled = false,
        onClick = () => {},
    } = props;

    return (
        <button
            className="button-component"
            disabled={disabled}
            onClick={onClick}
            style={{ background: background, color: labelColor }}
        >
            {
                startIcon && (
                    <span className="icon"> {startIcon} </span>
                )
            }

            <span className="label"> {label} </span>

            {
                endIcon && (
                    <span className="icon"> {endIcon} </span>
                )
            }
        </button>
    )
}

export default Button;
