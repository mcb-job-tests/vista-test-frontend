import Grid from "@material-ui/core/Grid";
import React from "react";

export function Vista2018Copyright(){
    return (<Copyright text={'We are Vista 2018'}/>)
}

export function Copyright(props){
    return (
        <Grid item xs={12}>
            <p style={{fontSize: "0.8em", padding:24}}>
                {'\u00A9 copyright' + props.text}
            </p>
        </Grid>
    )
}