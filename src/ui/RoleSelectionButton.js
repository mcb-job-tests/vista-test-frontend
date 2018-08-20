import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button'
import '../App.css';

export default function RoleSelectionButton(props){
    const buttonStyleA = {
        backgroundColor: props.backgroundColor,
        borderRadius: '16px',
        paddingTop: '0px',
        paddingBottom: '0px',
        paddingLeft: '4px',
        paddingRight: '4px',
        width: '100%',
        height:'50%',
        textTransform: "none",
        color: 'var(--main-text-color)'
    };


    console.log(props);
    return(
        <Grid item xs >
            <Button
                variant="contained"
                style={buttonStyleA}
                onClick={props.handleClick}
            >
                <h5 align={'center'} style={{fontSize: '100%', margin:0}}>
                    {props.role}
                </h5>
            </Button>
        </Grid>
    );
}