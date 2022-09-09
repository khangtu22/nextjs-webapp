import Grid from "@material-ui/core/Grid";
import Nav from "./navs/Nav";
import {useState} from "react";
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import SideBar from "./navs/SideBar";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});


const PageContentGrid = styled(Grid)(({theme}) => ({
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
}));


const NavContainer = styled(Grid)(({theme}) => ({
    position: "fixed",
    zIndex: 3
}));

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
})(({theme, open}) => ({
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

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
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
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Box sx={{display: 'flex'}}>
                <Box component="main" position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                    <NavContainer container>
                        <Nav/>
                    </NavContainer>
                </Box>
                <SideBar/>

                <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    <main>
                        <Grid container sx={{
                            display: "flex",
                            justifyContent: "center",
                        }}>
                            <PageContentGrid item>
                                {children}
                            </PageContentGrid>
                        </Grid>
                    </main>
                </Box>
            </Box>
        </>
    )
}
