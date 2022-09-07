import {useMutation} from "@apollo/client";
import VERIFY_ACCOUNT from "../graphql/commons/ActivateAccount";
import React from "react";
import {Button, Container, makeStyles} from "@material-ui/core";
import Image from "next/image";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from '@material-ui/icons/Close';
import {useRouter} from "next/router";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#ffff",
        borderRadius: "16px",
        boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
        maxWidth: 400,
        marginTop: 100,
    },

    submit: {
        color: "#ffff",
        marginTop: "24px",
        width: "100%",
        fontWeight: "600",
        textTransform: "none",
        fontSize: "18px",
        margin: theme.spacing(1, 0, 2),
        height: '32px',
        background: "rgb(29, 161, 242)",
        border: "none",
        boxShadow: "none",
        '&:hover': {
            background: "rgb(29, 161, 242)",
            color: "white",
            border: "none",
            boxShadow: "none",
        },
        '&:disabled': {
            background: "rgba(29,161,242,0.41)",
            color: "white",
            border: "none",
            boxShadow: "none",
        },
        '&:focus': {
            outline: "none",
        },
    },

    successMessage: {
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        marginTop: "16px",
    },
    flexBox: {
        paddingTop: "30px",
        display: "flex",
        justifyContent: "center",
    },
    logoAuthContainer: {
        height: "60px",
        width: "200px",
    },

}));

const Activate = ({token}) => {
    const classes = useStyles();
    const history = useRouter();
    const [verifyAccount, {data}] = useMutation(VERIFY_ACCOUNT, {
        variables: {token: token},
    });
    if (token) {
        verifyAccount();
    }

    let response;
    if (data) {
        if (data.verifyAccount.success) {
            response = <>
                <Container>
                    <Container className={classes.root}>
                        <div className={classes.flexBox}>
                            <div className={classes.logoAuthContainer}>
                                <Image
                                    loading="eager"
                                    priority={true}
                                    src="https://d7t56feocllwr.cloudfront.net/logo3.png"
                                    height={"560"}
                                    width={"1593"}
                                    layout={"responsive"}
                                    alt="logo"
                                />
                            </div>
                        </div>
                        <div className={classes.successMessage}>
                            <DoneIcon fontSize={"large"} style={{color: "#4bb543"}}/>
                        </div>
                        <div className={classes.successMessage}>
                            <p>You are set! Login now</p>
                        </div>
                        <Button
                            type="button"
                            value='Login'
                            fullWidth
                            size="small"
                            variant="contained"
                            className={classes.submit}
                            onClick={() => {
                                history.push("/login")
                            }}
                        >
                            Login
                        </Button>
                    </Container>
                </Container>

            </>
        } else {
            response = <>
                <Container>
                    <Container className={classes.root}>
                        <div className={classes.flexBox}>
                            <div className={classes.logoAuthContainer}>
                                <Image
                                    loading="eager"
                                    priority={true}
                                    src="https://d7t56feocllwr.cloudfront.net/logo3.png"
                                    height={"560"}
                                    width={"1593"}
                                    quality={10}
                                    layout={"responsive"}
                                    alt="logo"
                                />
                            </div>
                        </div>
                        <div className={classes.successMessage}>
                            <CloseIcon fontSize={"large"} style={{color: "red"}}/>
                        </div>
                        <div className={classes.successMessage}>
                            <p>Verify account fail! Link verify may not work anymore!</p>
                        </div>
                        <Button
                            type="button"
                            value='Login'
                            fullWidth
                            size="small"
                            variant="contained"
                            className={classes.submit}
                            onClick={() => {
                                history.push("/login")
                            }}
                        >
                            Login
                        </Button>
                    </Container>
                </Container>

            </>
        }
    }
    return (<>
        {response}
    </>);
};

export default Activate;