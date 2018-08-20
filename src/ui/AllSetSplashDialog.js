import {Component} from "react";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import React from "react";
import Zoom from '@material-ui/core/Zoom';
import {withTheme} from "@material-ui/core/styles";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {Vista2018Copyright} from "./Copyright";
import DialogTitle from "@material-ui/core/DialogTitle";
import VistaRocket from '../vista-rocket.png';
import '../App.css';

function Transition(props) {
    return <Zoom {...props} />;
}

function DialogButton(props){
    return(
        <DialogActions style={{
            float: "left",
            width: "100%",
            height: "50px",
            margin: 0}}
        >
            <Button variant="contained"
                    size="large"
                    type="button"
                    onClick={props.handleCloseDialog}
                    style={{
                        margin: 0,
                        paddingLeft:24,
                        paddingRight:24,
                        width: "100%",
                        height:"100%",
                        backgroundColor: 'var(--aqua-vista-light)',
                        color:'var(--main-text-color)'
                    }}
            >
                Back to career calculator
            </Button>
        </DialogActions>
    )
}

class AllSetSplashDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: true,
        }
    }

    handleClose = () => {
        this.setState({open: false});
    };

    render(){
        return(
            <Dialog
                fullScreen
                open={this.state.open}
                onClose={this.handleClose}
                TransitionComponent={Transition}
                PaperProps={{
                    style: {
                        backgroundColor: 'white',
                        boxShadow: 'none',
                    },
                }}
            >
                <Grid container className="parent-container" direction="column" justify="space-between" alignItems="center" style={{height:"100%"}}>
                    <Grid item style={{height:"100%",width:"100%"}}>
                        <Grid container direction="column" justify="space-between" alignItems="center" style={{height:"100%"}}>

                            <Grid item >
                                <Grid container direction="row" justify="flex-start" alignItems="center">
                                    <Grid item>
                                        <img src={VistaRocket} alt="Vista Rocket" width="36" height="36" style={{paddingTop:24}}/>
                                    </Grid>
                                    <Grid item>
                                        <DialogTitle style={{
                                            paddingBottom: 0,
                                            paddingLeft: 0,
                                            paddingRight: 0,
                                            fontSize: "1.5em",
                                            fontFamily: "tradeGothicNextLTPro-Bd",
                                        }}>
                                            {'You\'re all set!'}
                                        </DialogTitle>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item >
                                <DialogButton
                                    handleCloseDialog={this.props.handleButtonClick.bind(this)}
                                />
                            </Grid>
                            <Grid item >
                                <Vista2018Copyright/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        );
    }
}

export default withTheme()(AllSetSplashDialog);