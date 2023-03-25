import {Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";

type TableButtonProps = {
    title: string;
    icon: JSX.Element;
    handleClick: () => void;
}

export default function TableButton({title, icon, handleClick} :TableButtonProps) {

    return <Tooltip title={title}>
        <IconButton onClick={handleClick}>
            {icon}
        </IconButton>
    </Tooltip>

}