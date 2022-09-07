import {useRef, useState} from 'react';
import {Container, Divider, Hidden, MenuItem, MenuList} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import {gql, useApolloClient, useQuery} from "@apollo/client";
import {Cache, navigationPositionVar} from "../utils/Cache";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import {useRouter} from "next/router";
import Image from "next/image";
import {Popup} from "semantic-ui-react";
import Avatar from "@material-ui/core/Avatar";
import {AUTH_TOKEN} from "../utils/Constants";
import GET_NAVIGATION_POSITION_CACHE_ONLY from "../graphql/commons/GetNavigationPositionCacheOnly";

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
const useStyles = makeStyles((theme) => ({
    AppBar: {
        background: '#fff',
        // borderBottom: "1px solid rgb(229, 231, 235)",
        borderBottom: "1px solid rgba(var(--b6a,219,219,219),1)",
        position: "static",
        padding: "0 20px",
    },
    avatarSmall: {
        cursor: "pointer",
        width: theme.spacing(3.2),
        height: theme.spacing(3.2),
        "&:active": {
            opacity: "50%"
        }
    },
    navIcons: {
        fontSize: "18px",
        marginRight: theme.spacing(2),
    },

    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },

    divider: {
        margin: theme.spacing(0, 0),
    },
    logo: {
        height: "2rem",
        "&:active": {
            opacity: "50%"
        }
    },
    logoNextImage: {
        height: "2rem",
        opacity: "80%",
        "&:active": {
            opacity: "50%"
        }
    },
    avatarNextImage: {
        cursor: "pointer",
        borderRadius: "50%",
        "&:active": {
            opacity: "50%"
        }
    },
    iconAppBar: {
        strokeWidth: "1.2px",
        width: 25,
        height: 25,
        cursor: "pointer",
        "&:active": {
            opacity: "50%"
        }
    },
    toolBar: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "12px 0 12px 0",
    },
    imageContainer: {
        height: "30px",
        width: undefined,
        marginLeft: "10px",
        [theme.breakpoints.down('sm')]: {
            marginLeft: "0px",
        },
    },

    title: {
        flexGrow: 1,
    },
    test: {
        [theme.breakpoints.down('sm')]: {
            width: "100%"
        },
        [theme.breakpoints.up('md')]: {
            width: "950px"
        },
        [theme.breakpoints.up('lg')]: {
            width: "950px"
        },
    },
    optionDropdown: {
        fontSize: '15px',
        paddingRight: "120px"
    },
    menuItems: {
        marginTop: 0,
        padding: "10px  20px"
    },
    menu: {
        height: "100%",
        padding: 0,
    },
    rounded: {
        backgroundColor: "transparent"
    },
    iconContainer: {
        margin: 0,
        padding: 0,
        color: "#000000",
        "&:active": {
            backgroundColor: "rgba(0,0,0,0.09)"
        }
    },
    iconContainerActive: {
        margin: 0,
        padding: 0,
        color: "#1a90ff",
        "&:active": {
            backgroundColor: "rgba(0,0,0,0.12)"
        }
    },
    usernameDetail: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "20px",
    }
}));

function Nav() {
    const classes = useStyles();
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
        if (currentUserData.me.username != null) {
            renderAvatar = <Container className={classes.usernameDetail}>
                {currentUserData.me.username}
                <Avatar alt="Remy Sharp"
                        className={classes.avatarSmall}/>
            </Container>
        } else {
            renderAvatar =
                <Avatar alt="Remy Sharp"
                        className={classes.avatarSmall}/>
        }
    }

    return (
        <Grid item xs={12} className={classes.AppBar}>
            <Grid container style={{display: "flex", justifyContent: "center"}}>
                <Grid item className={classes.test}>
                    <div className={classes.toolBar}>
                        <div className={classes.imageContainer}>
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
                        </div>
                        <div className={classes.grow}/>
                        <Hidden xsDown>
                            <div style={{display: "flex", justifyContent: "center", marginRight: "16px"}}>
                                {/*<SearchBox/>*/}
                            </div>
                        </Hidden>
                        <div style={{display: 'flex', justifyContent: "center", justifyItems: "center", gap: "16px"}}>
                            <div style={{
                                width: "25px",
                                height: "25px",
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

                                <Popup trigger={
                                    <div>
                                        {renderAvatar}
                                    </div>
                                }
                                       style={{
                                           borderRadius: "8px",
                                           margin: "0px",
                                           padding: "0px",
                                           boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                                       }}
                                       on={"click"}
                                       position={"bottom right"}
                                       basic
                                >
                                    <MenuList
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                        className={classes.menu}
                                    >
                                        <MenuItem className={classes.menuItems}
                                                  onClick={() => {
                                                      setOpen(false)
                                                      handleToggle()
                                                      if (currentUserData) {
                                                          router.push('/' + currentUserData.me.username)
                                                      }
                                                  }}>
                                            <PersonOutlineIcon className={classes.navIcons}/>
                                            <span className={classes.optionDropdown}>
                                                Profile
                                            </span>
                                        </MenuItem>
                                        <MenuItem className={classes.menuItems} onClick={() => {
                                            setOpen(false)

                                        }}>
                                            <BookmarkBorderOutlinedIcon className={classes.navIcons}/>
                                            <span className={classes.optionDropdown}>
                                                Saved
                                            </span>
                                        </MenuItem>
                                        <MenuItem className={classes.menuItems} onClick={() => {
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

                                            <SettingsOutlinedIcon className={classes.navIcons}/>
                                            <span className={classes.optionDropdown}>
                                                Setting
                                            </span>
                                        </MenuItem>
                                        <Divider className={classes.divider}/>
                                        <MenuItem className={classes.menuItems} onClick={() => {
                                            setOpen(false)
                                            localStorage.removeItem(AUTH_TOKEN)
                                            client.resetStore();
                                            router.push("/login");
                                        }}>
                                            <ExitToAppIcon className={classes.navIcons}/>
                                            <span className={classes.optionDropdown}>
                                                Logout
                                            </span>
                                        </MenuItem>
                                    </MenuList>
                                </Popup>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Nav;
