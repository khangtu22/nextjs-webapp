import React from 'react'
import {makeStyles} from "@material-ui/styles";

const useStyle = makeStyles((theme) => ({
    commentPopup: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "2px",
        background: "linear-gradient(-45deg, #00e676, #fe6b8b, #ee7752, #23a6d5, #23d5ab)",
        backgroundSize: "200% 200%",
        zIndex: 1000,
        animation: `$myEffect 1000ms ${theme.transitions.easing.easeInOut} infinite`
    },
    "@keyframes myEffect": {
        "0%": {
            backgroundPosition: "0%  50%"
        },
        "50%": {
            backgroundPosition: "100% 50%"
        },
        "100%": {
            backgroundPosition: "0% 50%"
        }
    },

}))
export default function LoadingBarTop() {
    const classes = useStyle();
    return <div className={classes.commentPopup}/>
}
