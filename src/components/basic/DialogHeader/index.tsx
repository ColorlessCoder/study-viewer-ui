import { createStyles, IconButton, makeStyles, Theme, Typography } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { Close } from '@material-ui/icons';
interface DialogHeaderProps {
    id?: string,
    title: string,
    onClose?: () => any
};
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    }));

export default function DialogHeader(props: DialogHeaderProps) {
    const { title, onClose, id } = props;
    const classes = useStyles()
    return (
        <MuiDialogTitle id={id}>
            <Typography component="div" variant="h6">{title}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <Close />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
}