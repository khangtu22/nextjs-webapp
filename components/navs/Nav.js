import {useRef, useState} from 'react';
import {Container, Divider, Hidden, MenuItem, MenuList} from "@mui/material";
import Grid from "@mui/material/Grid";
import {gql, useApolloClient, useQuery} from "@apollo/client";
import {Cache, navigationPositionVar} from "../utils/Cache";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import {useRouter} from "next/router";
import Image from "next/image";
import {Popup} from "semantic-ui-react";
import Avatar from "@mui/material/Avatar";
import {AUTH_TOKEN} from "../utils/Constants";
import GET_NAVIGATION_POSITION_CACHE_ONLY from "../graphql/commons/GetNavigationPositionCacheOnly";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";

const CURRENT_USER_QUERY = gql`
  query MeQuery{
      me {
        pk,
        email,
        userType,
        username
      }
}
`;

const ResponsiveGrid = styled(Grid)(({theme}) => ({
    [theme.breakpoints.down('sm')]: {
        width: "100%"
    },
    [theme.breakpoints.up('md')]: {
        width: "100%"
    },
    [theme.breakpoints.up('lg')]: {
        width: "100%"
    },
}));
const ImageContainer = styled(Grid)(({theme}) => ({
    height: "30px",
    width: undefined,
    marginLeft: "10px",
    [theme.breakpoints.down('sm')]: {
        marginLeft: "0px",
    },
}));
const MenuPopup = styled(Popup)({
    zIndex: 1000,
    backgroundColor: "white",
    borderRadius: "8px",
    margin: "20px",
    padding: "0px",
    boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
})

function Nav() {
    const router = useRouter();
    const client = useApolloClient();

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const {data: currentUserData} = useQuery(CURRENT_USER_QUERY);
    const {data: navigationPositionData} = useQuery(GET_NAVIGATION_POSITION_CACHE_ONLY);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    let renderAvatar;
    if (currentUserData) {
        if (currentUserData.me?.username != null) {
            renderAvatar = <Container sx={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "20px",
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1px",
                    fontSize: "14px",
                    lineHeight: "15px",
                    userSelect: "none",
                    justifyContent: "center",
                }}>
                    <Box sx={{
                        fontWeight: "400",
                        color: "rgba(0, 0, 0, 0.54)",
                        fontSize: "14px",
                    }}>
                        {currentUserData.me.username}
                    </Box>
                    <Box sx={{
                        fontSize: "12px",
                        fontWeight: "200",
                        color: "rgba(0, 0, 0, 0.54)",
                    }}>
                        {currentUserData.me.userType === "A_2" ? "Admin" : "Member"}
                    </Box>
                </Box>
                <Avatar alt="Remy Sharp" sx={{
                    cursor: "pointer",
                    width: "30px",
                    height: "30px",
                    "&:active": {
                        opacity: "50%"
                    }
                }}/>
            </Container>
        } else {
            renderAvatar =
                <Avatar alt="Remy Sharp" sx={{
                    cursor: "pointer",
                    width: "30px",
                    height: "30px",
                    "&:active": {
                        opacity: "50%"
                    }
                }}/>
        }
    }

    return (
        <Grid item xs={12} sx={{
            background: '#fff',
            borderBottom: "1px solid rgba(var(--b6a,219,219,219),1)",
            position: "static",
            padding: "0 20px",
            zIndex: 1,
        }}>
            <Grid container sx={{display: "flex", justifyContent: "center"}}>
                <ResponsiveGrid item>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        padding: "12px 0 12px 0",
                    }}>
                        <ImageContainer>
                            <Image
                                loading="eager"
                                priority={true}
                                src="/hcl_logo.svg"
                                height={32}
                                width={"100%"}
                                alt="logo"
                                onClick={() => {
                                    router.push("/")
                                }}
                            />
                        </ImageContainer>
                        <Box sx={{flexGrow: 1,}}/>
                        <Hidden xsDown>
                            <div style={{display: "flex", justifyContent: "center", marginRight: "16px"}}>
                                {/*<SearchBox/>*/}
                            </div>
                        </Hidden>
                        <div style={{display: 'flex', justifyContent: "center", justifyItems: "center", gap: "16px"}}>
                            <div style={{
                                borderRadius: "50%",
                            }}
                                 ref={anchorRef}
                                 id="composition-button"
                                 aria-controls={open ? 'composition-menu' : undefined}
                                 aria-expanded={open ? 'true' : undefined}
                                 aria-haspopup="true"
                                 onClick={() => {
                                     navigationPositionVar(4)
                                     handleToggle()
                                 }}
                            >

                                <MenuPopup trigger={
                                    <div>
                                        {renderAvatar}
                                    </div>
                                }
                                           on={"click"}
                                           position={"bottom right"}
                                           basic
                                >
                                    <MenuList
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                    >
                                        <MenuItem sx={{
                                            marginTop: 0,
                                            padding: "10px  20px"
                                        }}
                                                  onClick={() => {
                                                      setOpen(false)
                                                      handleToggle()
                                                      if (currentUserData) {
                                                          router.push('/' + currentUserData.me.username)
                                                      }
                                                  }}>
                                            <PersonOutlineIcon sx={{
                                                fontSize: "18px",
                                                marginRight: "16px",
                                            }}/>
                                            <Box sx={{
                                                fontSize: '15px',
                                                paddingRight: "120px"
                                            }}>
                                                Profile
                                            </Box>
                                        </MenuItem>
                                        <MenuItem sx={{
                                            marginTop: 0,
                                            padding: "10px  20px"
                                        }} onClick={() => {
                                            setOpen(false)

                                        }}>
                                            <BookmarkBorderOutlinedIcon sx={{
                                                fontSize: "18px",
                                                marginRight: "16px",
                                            }}/>
                                            <Box sx={{
                                                fontSize: '15px',
                                                paddingRight: "120px"
                                            }}>
                                                Saved
                                            </Box>
                                        </MenuItem>
                                        <MenuItem sx={{
                                            marginTop: 0,
                                            padding: "10px  20px"
                                        }} onClick={() => {
                                            setOpen(false)
                                            Cache.writeQuery({
                                                    query: GET_CART_ITEMS,
                                                    data: {
                                                        actionSettingVar: "editProfile"
                                                    }
                                                }
                                            )
                                            router.push('/accounts/edit')
                                        }}>

                                            <SettingsOutlinedIcon sx={{
                                                fontSize: "18px",
                                                marginRight: "16px",
                                            }}/>
                                            <Box sx={{
                                                fontSize: '15px',
                                                paddingRight: "120px"
                                            }}>
                                                Setting
                                            </Box>
                                        </MenuItem>
                                        <Divider sx={{
                                            margin: 0,
                                            zIndex: 1,
                                        }}/>
                                        <MenuItem sx={{
                                            marginTop: 0,
                                            padding: "10px  20px"
                                        }} onClick={() => {
                                            setOpen(false)
                                            router.push("/login");
                                            localStorage.removeItem(AUTH_TOKEN)
                                            client.resetStore();
                                        }}>
                                            <ExitToAppIcon sx={{
                                                fontSize: "18px",
                                                marginRight: "16px",
                                            }}/>
                                            <Box sx={{
                                                fontSize: '15px',
                                                paddingRight: "120px"
                                            }}>
                                                Logout
                                            </Box>
                                        </MenuItem>
                                    </MenuList>
                                </MenuPopup>
                            </div>
                        </div>
                    </Box>
                </ResponsiveGrid>
            </Grid>
        </Grid>
    )
}

export default Nav;
