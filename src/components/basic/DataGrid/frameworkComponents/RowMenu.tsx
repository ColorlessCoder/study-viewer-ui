import { Fade, IconButton, ListItemIcon, Menu, MenuItem, Typography } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { ICellRendererParams } from 'ag-grid-community';
import React from 'react';

export interface RowMenuInt {
    label: string,
    icon?: () => any,
    onClick?: (props: RowMenuProps) => void,
    textColor?: string,
}

export interface RowMenuProps extends ICellRendererParams {
    menuItems?: RowMenuInt[]
}

export default function RowMenu(props: RowMenuProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const menuOpened = Boolean(anchorEl);
    const optionClicked = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return <span>
        <IconButton aria-controls="row-menu" style={{ color: 'inherit' }} className="center-element" size="small" onClick={optionClicked}><MoreVert /></IconButton>
        <Menu
            id="row-menu"
            anchorEl={anchorEl}
            keepMounted
            open={menuOpened}
            onClose={handleClose}
            TransitionComponent={Fade}
        >
            {props.menuItems && props.menuItems.map((menuItem, key) => <MenuItem key={key} onClick={() => menuItem.onClick && menuItem.onClick(props)}>
                {menuItem.icon && <ListItemIcon>
                    {menuItem.icon()}
                </ListItemIcon>}
                <Typography variant="inherit">{menuItem.label}</Typography>
            </MenuItem>)}
        </Menu>
    </span>
};
