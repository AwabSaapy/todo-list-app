import React, {FC} from "react";
import {SvgIconProps} from "@mui/material";
import './icon-button.component.scss';

type IconButtonProps = {
    icon?: React.ReactElement<SvgIconProps>;
    iconColor?: string;
    iconSize?: number;
    disabled?: boolean;
    onClick: () => void;
}

const IconButton: FC<IconButtonProps> = (props) => {

    const {
        icon,
        iconColor,
        disabled = false,
        onClick = () => {},
    } = props;

    return (
        <button className="icon-button-component" disabled={disabled} onClick={onClick}>
            <span className="icon" style={{ color: iconColor }}>
                {icon}
            </span>
        </button>
    )
}

export default IconButton;
