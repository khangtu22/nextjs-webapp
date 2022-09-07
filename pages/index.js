import Layout from "../components/Layout";
import {makeStyles} from "@material-ui/styles";
import {Dashboard} from "@material-ui/icons";
import Dashboards from "./dashboards";

const useStyles = makeStyles((theme) => ({
    feedBody: {
        display: "flex",
        justifyContent: "center",
        [theme.breakpoints.down('sm')]: {
            paddingTop: "0px",
            width: "100%"
        },
    },
    quickAccessContainer: {
        [theme.breakpoints.up('lg')]: {
            width: "293px"
        },
        [theme.breakpoints.up('md')]: {
            width: "293px"
        },

        [theme.breakpoints.down('sm')]: {
            width: "100%",
            display: "none"
        },

        display: "flex",
    },
    feedContainer: {
        [theme.breakpoints.up('lg')]: {
            width: "614px"
        },
        [theme.breakpoints.up('md')]: {
            width: "614px"
        },

        [theme.breakpoints.down('sm')]: {
            width: "614px"
        },

        [theme.breakpoints.down('xs')]: {
            width: "100%"
        },
        justifyContent: "center",
    },
}));

export default function Home() {
    return (
            <Dashboards/>
    )
}
