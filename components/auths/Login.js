import React, {useEffect, useState} from 'react';
import {gql, useMutation} from '@apollo/client';
import Image from 'next/image'
import {Container, IconButton, InputAdornment, TextField} from "@mui/material";
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from 'next/link';
import {AUTH_TOKEN} from "../utils/Constants";
import {useRouter} from "next/router";
import {isLoggedInVar} from "../utils/Cache";
import {styled} from "@mui/styles";

const StyledTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
        "&:fieldset": {
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
})

const CardLoginContainer = styled(Container)({
    backgroundColor: "#ffff",
    borderRadius: "16px",
    boxShadow: "rgba(0, 0, 0, 0.15) 0px .5px 5px 0px",
    maxWidth: "400px!important",
    marginTop: 100,
    position: "relative"
})

const FlexBoxDiv = styled("div")({
    paddingTop: "30px",
    display: "flex",
    justifyContent: "center",
})
const LogoDiv = styled("div")({
    height: "60px",
    width: "200px",
})
const ErrorDiv = styled("div")({
    marginTop: "1rem",
    backgroundColor: "#ffebe8",
    border: "1px solid #dd3c10",
    display: "flex",
    justifyContent: "center"
})
const ErrorChildDiv = styled("div")({
    margin: "4px 16px 6px 16px",
    padding: "10px"
})

const SuccessDiv = styled("div")({
    marginTop: "1rem",
    backgroundColor: "rgba(66,186,150,0.3)",
    border: "1px solid #42ba96",
    display: "flex",
    justifyContent: "center"
})
const SuccessChildDiv = styled("div")({
    margin: "4px 16px 6px 16px",
    padding: "10px"
})
const LoginForm = styled("form")({
    marginTop: 10,
})
const ForgotPassGrid = styled(Grid)({
    paddingBottom: 10,
})

const ForgotPassTextSpan = styled("span")({
    cursor: "pointer",
    "&:hover": {
        textDecoration: "1px underline",
        color: "rgb(29, 161, 242)"
    }
})

const PrivacyGrid = styled(Grid)({
    textAlign: "center",
    marginTop: "24px",
    paddingBottom: "24px",
    color: "rgba(113,113,113,.6)",
})

const LoginDrawerDiv = styled("div")({
    textAlign: "center",
    color: "rgba(113,113,113,.6)",
    bottom: 0,
    width: 500,
    position: "absolute",
    left: 400,
})
const LoginDrawerMetricsDiv = styled("div")({
    textAlign: "center",
    color: "rgba(113,113,113,.6)",
    bottom: 0,
    width: 500,
    position: "absolute",
    left: -500,
})

const SubmitButton = styled(Button)({
    "&.MuiButton-root": {
        background: "#006cb7",
        color: "#ffff",
        width: "100%",
        fontWeight: "600",
        textTransform: "none",
        fontSize: "18px",
        margin: "16px 0 24px 0",
        height: '48px',
        border: "none",
        boxShadow: "none",
        "&:hover": {
            background: "rgb(29, 161, 242)",
            color: "white",
            border: "none",
            boxShadow: "none",
        },
        "&:disabled": {
            background: "rgba(29,161,242,0.41)",
            color: "white",
            border: "none",
            boxShadow: "none",
        },
        '&:focus': {
            outline: "none",
        },
    },
})

const LoginContainer = styled("div")({
    position: "static",
})

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
                    console.log("Run")
                }
            })
        }
    },[currentUsername]);

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
                location.replace('/dashboards');
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
        return <SubmitButton
            type="submit"
            fullWidth
            size="small"
            value='Login'
            variant="contained"
            onClick={() => {
                isLoggedInVar(true)
                location.replace('/dashboards');
            }}
        >

            <Link href={"/"} passHref>
                <span>
                    Continue as {currentUsername}
                </span>
            </Link>
        </SubmitButton>
    }

    return (
        <Container>
            <LoginContainer>
                <CardLoginContainer>
                    <FlexBoxDiv>
                        <LogoDiv>
                            <Image
                                loading="eager"
                                priority={true}
                                src="/hcl_logo.svg"
                                height={"560"}
                                width={"1593"}
                                layout={"responsive"}
                                quality={100}
                                alt="logo"
                            />
                        </LogoDiv>
                    </FlexBoxDiv>
                    {isLoginFail ?
                        <ErrorDiv>
                            <ErrorChildDiv>
                                <div style={{fontWeight: "bold", textAlign: "center"}}>
                                    Login Fail
                                </div>
                                <div>
                                    Check your email and password
                                </div>
                            </ErrorChildDiv>
                        </ErrorDiv> : ""
                    }

                    {isLoginSuccess ?
                        <SuccessDiv>
                            <SuccessChildDiv>
                                <div style={{fontWeight: "bold", textAlign: "center"}}>
                                    Login Success
                                </div>
                                <div>
                                    Redirect to home page...
                                </div>
                            </SuccessChildDiv>
                        </SuccessDiv> : ""
                    }

                    <LoginForm onSubmit={onSubmit}>
                        <StyledTextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            placeholder="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={e => setEmail(e.target.value)}
                            InputProps={{
                                classes: {
                                    input: {
                                        fontSize: "16px",
                                        height: "12px",
                                        "&::placeholder": {
                                            color: "gray",
                                        },
                                    },
                                },
                            }}
                            InputLabelProps={{
                                classes: {
                                    root: {
                                        fontSize: "16px",
                                    },
                                },
                            }}
                        />
                        <StyledTextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            placeholder="Password"
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
                                    input: {
                                        fontSize: "16px",
                                        height: "12px",
                                        "&::placeholder": {
                                            color: "gray",
                                        },
                                    },
                                },
                            }}
                            onChange={e => setPassword(e.target.value)}
                            InputLabelProps={{
                                classes: {
                                    root: {
                                        fontSize: "16px",
                                    }
                                }
                            }}
                        />
                        <SubmitButton
                            type="submit"
                            value='Login'
                            fullWidth
                            size="small"
                            variant="contained"
                            disabled={!(email && password && !mutationLoading)}
                        >
                            {mutationLoading ?
                                "loading..." : "Sign In"}
                        </SubmitButton>

                        {currentUsername ? handleUserValidToken() : null}
                        <ForgotPassGrid container>
                            <Grid item xs>
                                <Link href={"/accounts/password/reset/"} passHref>
                                    <ForgotPassTextSpan>
                                        Forgot password?
                                    </ForgotPassTextSpan>
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href={"/signup/"} passHref>
                                    <ForgotPassTextSpan>
                                        Sign up
                                    </ForgotPassTextSpan>
                                </Link>
                            </Grid>
                        </ForgotPassGrid>
                        <PrivacyGrid container>
                            <Grid item>
                                <ForgotPassTextSpan>
                                    By signing up, you agree to our <span>terms and
                                privacy</span> policy.
                                    We do not allow adult
                                    content. You must be at least 18 years old to start a page.
                                </ForgotPassTextSpan>
                            </Grid>
                        </PrivacyGrid>

                    </LoginForm>
                    <LoginDrawerDiv>
                        <Image
                            loading="eager"
                            priority={true}
                            src="/login2.svg"
                            height={"1000"}
                            width={"1593"}
                            layout={"responsive"}
                            quality={100}
                            alt="logo"
                        />
                    </LoginDrawerDiv>
                    <LoginDrawerMetricsDiv>
                        <Image
                            loading="eager"
                            priority={true}
                            src="/metric.svg"
                            height={"1000"}
                            width={"1593"}
                            layout={"responsive"}
                            quality={100}
                            alt="logo"
                        />
                    </LoginDrawerMetricsDiv>
                </CardLoginContainer>

            </LoginContainer>


        </Container>
    );
};

``