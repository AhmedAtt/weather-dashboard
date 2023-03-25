import IconButton from "@mui/material/IconButton";
import {Tooltip} from "@mui/material";

type WeIconButtonProps = {
    hint: string,
    onClick: () => void,
    icon: JSX.Element
}

export default function WeIconButton({icon, hint, onClick}: WeIconButtonProps) {
    return (
        <Tooltip title={hint}>
            <IconButton onClick={onClick}>
                {icon}
            </IconButton>
        </Tooltip>
    );
}
