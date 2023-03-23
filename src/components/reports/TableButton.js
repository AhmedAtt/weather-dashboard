import {Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";

export default function TableButton({title, icon, handleClick}) {

    return <Tooltip title={title}>
        <IconButton onClick={handleClick}>
            {icon}
        </IconButton>
    </Tooltip>

}