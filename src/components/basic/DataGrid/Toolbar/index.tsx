import { Button, createStyles, makeStyles, PropTypes as MUI } from "@material-ui/core";
import { GridApi } from "ag-grid-community";

const useStyles = makeStyles((theme) =>
    createStyles({
        toolbar: {
            padding: theme.spacing(1),
        },
        toolbarButton: {
            marginLeft: theme.spacing(1),
            fontWeight: "bold",
            marginTop: theme.spacing(1)
        }
    })
)

export interface ToolbarButtonInt {
    label?: string,
    icon?: () => any,
    onClick: (gridApi: GridApi) => any,
    color?: MUI.Color,
    style?: React.CSSProperties,
}

interface ToolBarProps {
    gridApi?: GridApi,
    buttons?: ToolbarButtonInt[]
}

export default function Toolbar(props: ToolBarProps): any {
    const { buttons, gridApi } = props;
    const classes = useStyles()
    const getIcon = (button: ToolbarButtonInt) => {
        return button.icon ? button.icon() : undefined
    }
    const handleButtonClick = (button: ToolbarButtonInt) => {
        if (gridApi && button.onClick) {
            button.onClick(gridApi)
        }
    }
    return <div className={classes.toolbar}>
        {buttons && buttons.map((button, i) => <Button
            key={i + 1}
            startIcon={getIcon(button)}
            onClick={() => handleButtonClick(button)}
            style={button.style}
            color={button.color}
            variant="contained"
            className={classes.toolbarButton}
        >
            {button.label}
        </Button>)}
    </div>
}