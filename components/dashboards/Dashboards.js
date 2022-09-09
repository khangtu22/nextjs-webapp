import React, {useEffect} from 'react';
import Grid from "@mui/material/Grid";
import {styled} from "@mui/styles";
import {Paper, TextField} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    textAlign: 'center',
}));



const ItemGrid = styled(Box)({
    display: "flex",
    width: "100%",
    backgroundColor: "white",
    justifyItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    minWidth: "25%",
    boxShadow: "rgba(0, 0, 0, 0.16) 0 1px 4px",
    border: "1px solid rgba(var(--b6a, 219, 219, 219), 1)",
    "&:hover":{
        boxShadow: "rgba(0, 0, 0, 0.16) 0 1px 4px",
    }
})

const ImageGridDiv = styled("div")(({ theme }) => ({
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

const ImageContainer = styled(Grid)(({theme}) => ({
    height: "30px",
    width: undefined,
    marginLeft: "10px",
    [theme.breakpoints.down('sm')]: {
        marginLeft: "0px",
    },
}));


export default function Dashboards() {

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
                <CssBaseline />
                <ImageContainer>
                    <Grid container spacing={1}>
                        <Grid item xs >
                            <ItemGrid>xs</ItemGrid>
                        </Grid>
                        <Grid item xs>
                            <ItemGrid>xs=6</ItemGrid>
                        </Grid>
                        <Grid item xs>
                            <ItemGrid>xs=6</ItemGrid>
                        </Grid>
                        <Grid item xs>
                            <ItemGrid>xs</ItemGrid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs>
                            <Item>xs</Item>
                        </Grid>
                        <Grid item xs>
                            <Item>xs=6</Item>
                        </Grid>
                    </Grid>
                </ImageContainer>
            </div>
        </>
    );
}
