import React, {useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {useLazyQuery, useMutation} from "@apollo/client";
import {InputAdornment} from "@material-ui/core";
import Spinners from "../../components/utils/loaders/Spinners";
import Image from 'next/image';
import Link from 'next/link';
import SIGNUP_MUTATION from "../graphql/mutations/SignUp";
import CHECK_EMAIL_VALID_FOR_SIGNUP from "../graphql/queries/auths/CheckValidEmail";
import CHECK_USERNAME_VALID_FOR_SIGNUP from "../graphql/queries/auths/CheckValidUsername";
import DoneIcon from '@material-ui/icons/Done';
import ToolTipsNotOkIcon from "../popup/utils/ToolTipsNotOkIcon";
import {useRouter} from "next/router";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#ffff",
        borderRadius: "16px",
        boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
        maxWidth: 400,
        marginTop: 100,
    },
    form: {
        marginTop: theme.spacing(3),
    },
    submit: {
        color: "#ffff",
        width: "100%",
        fontWeight: "600",
        textTransform: "none",
        fontSize: "18px",
        margin: theme.spacing(2, 0, 2),
        height: '48px',
        // background: "#fd0",
        background: "rgb(29, 161, 242)",

        border: "none",
        boxShadow: "none",
        // borderRadius: "57px",
        // marginTop: "32px",
        '&:hover': {
            // background: "#f2d200",
            background: "rgb(29, 161, 242)",
            color: "white",

            border: "none",
            boxShadow: "none",
        },
        '&:disabled': {
            // background: "rgba(242,210,0,0.21)",
            background: "rgba(29,161,242,0.41)",
            color: "white",

            border: "none",
            boxShadow: "none",
        },
        '&:focus': {
            outline: "none",
        },
    },
    resize: {
        fontSize: "16px",
        height: "12px",
        "&::placeholder": {
            color: "gray",
        },
    },
    endAdornment: {
        padding: 0,
        backgroundColor: "transparent"
    },

    labelRoot: {
        fontSize: "16px",
    },
    forgotPass: {
        paddingBottom: 10,
        display: "flex",
        justifyContent: "center"
    },
    forgotPassText: {
        cursor: "pointer",
        "&:hover": {
            textDecoration: "1px underline",
            color: "rgb(29, 161, 242)"
        }
    },

    inputField: {
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                background: "rgba(255,255,255,0.05)",
            },
            "&.Mui-focused fieldset": {
                background: "rgba(255,255,255,0)",
                outline: "none",
            }
        },
        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #484850",
        },
    },
    privacy: {
        textAlign: "center",
        marginTop: "24px",
        paddingBottom: "24px",
        color: "rgba(113,113,113,.6)",
    },
    errorsSignUpContainer: {
        marginTop: "1rem",
        backgroundColor: "#ffebe8",
        border: "1px solid #dd3c10",
        display: "flex",
        justifyContent: "center"
    },
    errorsSignUpText: {
        margin: "4px 16px 6px 16px",
        padding: "10px"

    },
    successSignUpContainer: {
        marginTop: "1rem",
        backgroundColor: "rgba(66,186,150,0.3)",
        border: "1px solid #42ba96",
        display: "flex",
        justifyContent: "center"
    },
    successSignUpText: {
        margin: "4px 16px 6px 16px",
        padding: "10px"
    },
    statusOkIcon: {
        cursor: "pointer",
    },
    statusNotOkIcon: {
        cursor: "pointer",
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

export default function Signup() {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isEmailFieldDirty, setIsEmailFieldDirty] = useState(false);
    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [isUsernameFieldDirty, setIsUsernameFieldDirty] = useState(false);
    const [isSignUpSuccess, setIsSignUpSuccess] = useState(null);
    const [isSignUpFail, setIsSignUpFail] = useState(false);
    const [errorMessageSignUp, setErrorMessageSignUp] = useState(false);
    const [isSelectedEmailField, setIsSelectedEmailField] = useState(false);
    const [isSelectedUsernameField, setIsSelectedUsernameField] = useState(false);
    const classes = useStyles();
    const history = useRouter();


    const [userSignup, {loading: mutationLoading, error: mutationError}] = useMutation(SIGNUP_MUTATION, {
        variables: {
            email: email,
            username: username,
            password1: password1,
            password2: password2,
        }
    });
    const [checkValidEmail] = useLazyQuery(CHECK_EMAIL_VALID_FOR_SIGNUP, {
        onCompleted(data) {
            if (data.attemptEmail) {
                setIsEmailValid(true)
            } else {
                setIsEmailValid(false)
            }
        }
    });
    const [checkValidUsername] = useLazyQuery(CHECK_USERNAME_VALID_FOR_SIGNUP, {
        onCompleted(data) {
            if (data.attemptUsername) {
                setIsUsernameValid(true)
            } else {
                setIsUsernameValid(false)
            }
        }
    });

    const onSubmit = e => {
        e.preventDefault();
        userSignup().then((response) => {
            if (response.data.register.success) {
                setIsSignUpSuccess(true)
                setIsSignUpFail(false)
                history.push("/activate")
            } else {
                setIsSignUpSuccess(false)
                setIsSignUpFail(true)
                setErrorMessageSignUp(response.data.register.errors.password2[0].message)
            }
        })
    };

    return (
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
            {isSignUpSuccess ?
                <div className={classes.successSignUpContainer}>
                    <div className={classes.successSignUpText}>
                        <p style={{fontWeight: "bold", textAlign: "center"}}>
                            Signup Success
                        </p>
                    </div>
                </div> : ""
            }
            {isSignUpFail ?
                <div className={classes.errorsSignUpContainer}>
                    <div className={classes.errorsSignUpText}>
                        <p style={{fontWeight: "bold", textAlign: "center"}}>
                            Signup Fail
                        </p>
                        <ol>
                            <li>Password must contain at least 8 characters (number and characters)</li>
                            <li>Password is not too common.</li>
                            <li>Password is not similar to email or username.</li>
                        </ol>

                    </div>
                </div> : ""
            }
            <form onSubmit={onSubmit} className={classes.form}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            placeholder="Email"
                            // label="Email Address"
                            name="email"
                            value={email}
                            className={classes.inputField}
                            onChange={e => setEmail(e.target.value)}
                            autoComplete="email"
                            InputProps={{
                                classes: {
                                    input: classes.resize,
                                },
                                endAdornment: (
                                    <>
                                        <InputAdornment position="end">
                                            {isEmailFieldDirty && !isSelectedEmailField ?
                                                <>
                                                    {isEmailValid ?
                                                        <DoneIcon size={30} className={classes.statusOkIcon}
                                                                  style={{color: "#4bb543"}}/>
                                                        :
                                                        <ToolTipsNotOkIcon
                                                            content="Email already registered or invalid email."/>
                                                    }
                                                </>
                                                : ""}
                                        </InputAdornment>
                                    </>
                                ),
                            }}
                            InputLabelProps={{
                                classes: {
                                    root: classes.labelRoot,
                                }
                            }}
                            onBlur={(e) => {
                                checkValidEmail({
                                    variables: {
                                        email: e.target.value
                                    },
                                })
                                setEmail(e.target.value)
                                setIsEmailFieldDirty(true)
                                setIsSelectedEmailField(false)
                            }}
                            onFocus={e => setIsSelectedEmailField(true)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="username"
                            placeholder="Username"
                            // label="Username"
                            name="username"
                            className={classes.inputField}
                            // autoComplete="username"
                            value={username}
                            onChange={e => setUserName(e.target.value)}
                            InputProps={{
                                classes: {
                                    input: classes.resize,
                                    // adornedEnd: classes.endAdornment
                                },
                                endAdornment: (
                                    <>
                                        <InputAdornment position="end">
                                            {isUsernameFieldDirty && !isSelectedUsernameField ?
                                                <>
                                                    {isUsernameValid ?
                                                        <DoneIcon size={30} className={classes.statusOkIcon}
                                                                  style={{color: "#4bb543"}}/>
                                                        :
                                                        <ToolTipsNotOkIcon
                                                            content="Username already been used or invalid username."/>
                                                    }
                                                </>
                                                : ""}
                                        </InputAdornment>
                                    </>
                                ),

                            }}
                            InputLabelProps={{
                                classes: {
                                    root: classes.labelRoot,
                                }
                            }}
                            onBlur={(e) => {
                                checkValidUsername({
                                    variables: {
                                        username: e.target.value
                                    },
                                })
                                setUserName(e.target.value)
                                setIsUsernameFieldDirty(true)
                                setIsSelectedUsernameField(false)
                            }}
                            onFocus={e => setIsSelectedUsernameField(true)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password1"
                            placeholder="Password1"
                            // label="Password1"
                            type="password"
                            id="password1"
                            className={classes.inputField}
                            value={password1}
                            onChange={e => setPassword1(e.target.value)}
                            // autoComplete="current-password"
                            InputProps={{
                                classes: {
                                    input: classes.resize,
                                },
                                endAdornment: (
                                    <>
                                        <InputAdornment position="end">
                                            {errorMessageSignUp && isSignUpFail ?
                                                <>
                                                    <ToolTipsNotOkIcon
                                                        content={errorMessageSignUp}/>
                                                </>
                                                : ""}
                                        </InputAdornment>
                                    </>
                                ),
                            }}
                            InputLabelProps={{
                                classes: {
                                    root: classes.labelRoot,
                                }
                            }}
                            onBlur={() => {
                                setErrorMessageSignUp(false)
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password2"
                            className={classes.inputField}
                            placeholder="Password2"
                            // label="Password2"
                            type="password"
                            id="password2"
                            value={password2}
                            onChange={e => setPassword2(e.target.value)}
                            // autoComplete="current-password"
                            InputProps={{
                                classes: {
                                    input: classes.resize,
                                },
                                endAdornment: (
                                    <>
                                        <InputAdornment position="end">
                                            {errorMessageSignUp && isSignUpFail ?
                                                <>
                                                    <ToolTipsNotOkIcon
                                                        content={errorMessageSignUp}/>
                                                </>
                                                : ""}
                                        </InputAdornment>
                                    </>
                                ),
                            }}
                            InputLabelProps={{
                                classes: {
                                    root: classes.labelRoot,
                                }
                            }}
                            onBlur={() => {
                                setErrorMessageSignUp(false)
                            }}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    size="small"
                    variant="contained"
                    value='Signup'
                    disabled={!(username && email && password1 && password2 && isEmailValid && isUsernameValid)}
                    className={classes.submit}
                >
                    {mutationLoading ?
                        <Spinners/> : "Sign Up"}
                </Button>
                <Grid container className={classes.forgotPass}>
                    <Grid item>
                        <Link href="/login" passHref>
                            <span className={classes.forgotPassText}>
                                Sign in
                            </span>
                        </Link>
                    </Grid>
                </Grid>

                <Grid container className={classes.privacy}>
                    <Grid item>
                        <div>
                            By signing up, you agree to our terms and privacy policy. We do not allow adult
                            content. You must be at least 18 years old to start a page.
                        </div>
                    </Grid>
                </Grid>
            </form>
            {mutationLoading && <p><Spinners/></p>}
            {mutationError && <p>Error :( Please try again)</p>}
        </Container>
    );
};
