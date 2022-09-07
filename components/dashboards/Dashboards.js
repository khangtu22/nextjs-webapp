import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/styles";
import {useQuery} from "@apollo/client";
import LoadingBarTop from "../utils/LoadingBarTop";

const useStyles = makeStyles((theme) => ({
    imageGrid1: {
        gap: "1.5rem",
        display: "grid",
        gridAutoFlow: "row",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        [theme.breakpoints.down('sm')]: {
            gap: ".15rem",
        },
    },
}));

export default function Dashboards() {
    const classes = useStyles();

    useEffect(() => {
        window.addEventListener("scroll", checkBottom)
        return () => {
            window.removeEventListener("scroll", checkBottom)
        };
    },);

    const checkBottom = () => {
        if ((window.innerHeight + window.scrollY + 100) >= document.body.scrollHeight) {
           //TODO
        }
    }
    return (
        <>
            <div style={{width: "100%", minHeight: "300px", marginBottom: "100px"}}>
                <div className={classes.imageGrid1}>
                    Dashboards Here
                </div>
            </div>
        </>
    );
}
