import Grid from "@material-ui/core/Grid";
import Nav from "./navs/Nav";
import {makeStyles} from "@material-ui/styles";
import {chatRoomVar, isLoggedInVar, meVar} from "./utils/Cache";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import SideBar from "./navs/SideBar";

const useStyles = makeStyles((theme) => ({
    header: {
        position: "fixed",
        zIndex: 3
    },
    pageContent: {
        paddingTop: "80px",
        display: "flex",
        justifyContent: "center",
        [theme.breakpoints.up('lg')]: {
            width: "950px"
        },
        [theme.breakpoints.up('md')]: {
            width: "100%"
        },
        [theme.breakpoints.down('sm')]: {
            paddingTop: "57px",
            width: "100%"
        },
    },
    mainPage: {
        display: "flex",
        justifyContent: "center",

    },
}));

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);


export default function Layout({children}) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Box component="main" position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Grid container className={classes.header}>
                        <Nav/>
                    </Grid>
                </Box>
                    <SideBar/>

                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <main>
                        <Grid container className={classes.mainPage}>
                            <Grid item className={classes.pageContent}>
                                {children}
                            </Grid>
                        </Grid>
                    </main>
                </Box>
            </Box>
        </>
    )
}
