import React, {useEffect, useState} from 'react';
import {gql, useMutation} from '@apollo/client';
import Image from 'next/image'
import {Button, Container, IconButton, InputAdornment, makeStyles, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Link from 'next/link';
import {AUTH_TOKEN} from "../utils/Constants";
import {useRouter} from "next/router";
import {isLoggedInVar} from "../utils/Cache";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#ffff",
        borderRadius: "16px",
        boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
        maxWidth: 400,
        marginTop: 100,
    },
    form: {
        marginTop: theme.spacing(1),
    },
    submit: {
        color: "#ffff",
        width: "100%",
        fontWeight: "600",
        textTransform: "none",
        fontSize: "18px",
        margin: theme.spacing(1, 0, 2),
        height: '48px',
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
    resize: {
        fontSize: "16px",
        height: "12px",
        "&::placeholder": {
            color: "gray",
        },
    },

    labelRoot: {
        fontSize: "16px",
    },
    forgotPass: {
        paddingBottom: 10,
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
    errorsLoginContainer: {
        marginTop: "1rem",
        backgroundColor: "#ffebe8",
        border: "1px solid #dd3c10",
        display: "flex",
        justifyContent: "center"
    },
    errorsLoginText: {
        margin: "4px 16px 6px 16px",
        padding: "10px"
    },
    successLoginContainer: {
        marginTop: "1rem",
        backgroundColor: "rgba(66,186,150,0.3)",
        border: "1px solid #42ba96",
        display: "flex",
        justifyContent: "center"
    },
    successLoginText: {
        margin: "4px 16px 6px 16px",
        padding: "10px"
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
    divider: {
        display: "flex",
        justifyContent: "center",
        width: "100%"
    },
}));


const LOGIN_MUTATION = gql`
  mutation userLogin($email: String!, $password: String!){
    tokenAuth(email: $email, password: $password) { 
        token,
        success,
        errors
    }
  }
`;

const VERIFY_TOKEN_MUTATION = gql`
    mutation verifyTokenUser($token: String!){
      verifyToken(token: $token) {
        success,
        errors,
        payload
      }
    }
`;

export default function Login() {
    const classes = useStyles();
    const route = useRouter();
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [currentUsername, setCurrentUsername] = useState('');
    const [isLoginSuccess, setIsLoginSuccess] = useState(null);
    const [isLoginFail, setIsLoginFail] = useState(false);
    useEffect(() => {
        if (localStorage.getItem(AUTH_TOKEN) !== null) {
            verifyTokenUser().then(res => {
                if (res.data.verifyToken.success) {
                    setCurrentUsername(res.data.verifyToken.payload.username)
                }
            })
        }
    },);

    const [userLogin, {loading: mutationLoading, error: mutationError}] = useMutation(LOGIN_MUTATION, {
        variables: {
            email: email,
            password: password,
        }
    });
    const [verifyTokenUser, {
        loading: mutationVerifyTokenLoading,
        error: mutationVerifyTokenError
    }] = useMutation(VERIFY_TOKEN_MUTATION, {
        variables: {
            token: localStorage.getItem(AUTH_TOKEN),
        },
    });

    const onSubmit = e => {
        e.preventDefault();
        userLogin().then(response => {
            if (response.data.tokenAuth.token) {
                localStorage.setItem(AUTH_TOKEN, response.data.tokenAuth.token);
            }
            if (response.data.tokenAuth.success) {

                isLoggedInVar(true);
                route.replace('/dashboards');
                // route.push("/dashboards");
                setIsLoginSuccess(true)
                setIsLoginFail(false)
            } else {
                setIsLoginSuccess(false)
                setIsLoginFail(true)
            }
        }).catch(e => {
            setIsLoginFail(true)
        })
    }

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const handleUserValidToken = () => {
        return <Button
            type="submit"
            fullWidth
            size="small"
            value='Login'
            variant="contained"
            onClick={() => {
                isLoggedInVar(true)
                route.push("/dashboards");
            }}
            className={classes.submit}
        >

            <Link href={"/"} passHref>
                <span>
                    Continue as {currentUsername}
                </span>
            </Link>
        </Button>
    }

    return (
        <Container>
            <Container className={classes.root}>
                <div className={classes.flexBox}>
                    <div className={classes.logoAuthContainer}>
                        <Image
                            loading="eager"
                            priority={true}
                            src="/hcl_logo.svg"
                            height={"560"}
                            width={"1593"}
                            layout={"responsive"}
                            quality={10}
                            alt="logo"
                        />
                    </div>
                </div>
                {isLoginFail ?
                    <div className={classes.errorsLoginContainer}>
                        <div className={classes.errorsLoginText}>
                            <div style={{fontWeight: "bold", textAlign: "center"}}>
                                Login Fail
                            </div>
                            <div>
                                Check your email and password
                            </div>
                        </div>
                    </div> : ""
                }

                {isLoginSuccess ?
                    <div className={classes.successLoginContainer}>
                        <div className={classes.successLoginText}>
                            <div style={{fontWeight: "bold", textAlign: "center"}}>
                                Login Success
                            </div>
                            <div>
                                Redirect to home page...
                            </div>
                        </div>
                    </div> : ""
                }

                <form className={classes.form} onSubmit={onSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        placeholder="Email"
                        name="email"
                        className={classes.inputField}
                        autoComplete="email"
                        autoFocus
                        onChange={e => setEmail(e.target.value)}
                        InputProps={{
                            classes: {
                                input: classes.resize,
                            },
                        }}
                        InputLabelProps={{
                            classes: {
                                root: classes.labelRoot,
                            },
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        placeholder="Password"
                        className={classes.inputField}
                        type={showPassword ? "text" : "password"}
                        id="password"
                        autoComplete="current-password"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        size="small"
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            classes: {
                                input: classes.resize,
                            },
                        }}
                        onChange={e => setPassword(e.target.value)}
                        InputLabelProps={{
                            classes: {
                                root: classes.labelRoot,
                            }
                        }}
                    />
                    <Button
                        type="submit"
                        value='Login'
                        fullWidth
                        size="small"
                        variant="contained"
                        className={classes.submit}
                        disabled={!(email && password && !mutationLoading)}
                    >
                        {mutationLoading ?
                            "loading..." : "Sign In"}
                    </Button>

                    {currentUsername ? handleUserValidToken() : null}
                    <Grid container className={classes.forgotPass}>
                        <Grid item xs>
                            <Link href={"/accounts/password/reset/"} passHref>
                                <span className={classes.forgotPassText}>
                                    Forgot password?
                                </span>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href={"/signup/"} passHref>
                                <span className={classes.forgotPassText}>
                                    Sign up
                                </span>
                            </Link>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.privacy}>
                        <Grid item>
                            <div>
                                By signing up, you agree to our <span className={classes.forgotPassText}>terms and
                                privacy</span> policy.
                                We do not allow adult
                                content. You must be at least 18 years old to start a page.
                            </div>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </Container>
    );
};
