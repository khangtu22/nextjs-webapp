import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {Drawer} from "@mui/material";
import {styled, useTheme} from "@mui/material/styles";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
const drawerWidth = 200;

const NavBarListItemButton = styled(ListItemButton)(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    minHeight: 48,
    paddingLeft: "20px",
    [`& .MuiTypography-root`]: {
        fontSize: "14px"
    },
}));


const NavBarListContainer = styled("div")(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: "column",
}));


const NavBarListItemIcon = styled(ListItemIcon)(({theme}) => ({
    minWidth: 0,
    marginRight: "20px",
    justifyContent: 'center',
    disableRipple: true,
}));


export default function SideBar({size}) {
    const router = useRouter();
    const theme = useTheme();
    const [open, setOpen] = useState(true);
    const [activePage, setActivePage] = useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    useEffect(() => {
        if (router.pathname === "/"){
            setActivePage(true)
        }
        console.log(router.pathname)
    }, [activePage])

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Drawer variant="permanent" open={true} sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
        }}>
            <List sx={{pt: 7}}>
                <ListItem disablePadding sx={{display: 'block'}}>
                    <NavBarListItemButton disableRipple disableTouchRipple>
                        <NavBarListItemIcon >
                                <span className="material-symbols-outlined">
                                    grid_view
                                </span>
                        </NavBarListItemIcon>
                        <ListItemText primary={"Dashboard"}/>
                    </NavBarListItemButton>
                    <NavBarListItemButton  disableRipple disableTouchRipple>
                        <NavBarListItemIcon>
                                <span className="material-symbols-outlined">
                                    receipt_long
                                </span>
                        </NavBarListItemIcon>
                        <ListItemText primary={"Report"}/>
                    </NavBarListItemButton>
                    <NavBarListItemButton  disableRipple disableTouchRipple>
                        <NavBarListItemIcon>
                                <span className="material-symbols-outlined">
                                    inventory
                                </span>
                        </NavBarListItemIcon>
                        <ListItemText primary={"Test Screen"}/>
                    </NavBarListItemButton>
                    <NavBarListItemButton  disableRipple disableTouchRipple>
                        <NavBarListItemIcon>
                                <span className="material-symbols-outlined">
                                    group
                                </span>
                        </NavBarListItemIcon>
                        <ListItemText primary={"Manage Users"}/>
                    </NavBarListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
}