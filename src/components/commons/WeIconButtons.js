import IconButton from "@mui/material/IconButton";
import {Tooltip} from "@mui/material";

export default function WeIconButton({icon, hint, onClick}) {
    return (
        <Tooltip title={hint}>
            <IconButton onClick={onClick}>
                {icon}
            </IconButton>
        </Tooltip>
    );
}
