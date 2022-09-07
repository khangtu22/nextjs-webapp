import Grid from "@material-ui/core/Grid";
import Nav from "./navs/Nav";
import {makeStyles} from "@material-ui/styles";
import {chatRoomVar, isLoggedInVar, meVar} from "./utils/Cache";
import {useEffect} from "react";
import {useRouter} from "next/router";

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
            width: "950px"
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


export default function Layout({children}) {
    const classes = useStyles();
    return (
        <>
            <header>
                <title>Navbar</title>
                <Grid container className={classes.header}>
                    <Nav/>
                </Grid>
            </header>
            <main>
                <Grid container className={classes.mainPage}>
                    <Grid item className={classes.pageContent}>
                        {children}
                    </Grid>
                </Grid>
            </main>
        </>
    )
}
