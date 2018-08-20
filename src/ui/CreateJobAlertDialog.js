import React, {Component} from "react";
import PropTypes from "prop-types";
import '../App.css';
import {withTheme} from "@material-ui/core/styles/index";
import Slide from '@material-ui/core/Slide';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import UserFormControl from "./UserFormControl";
import {Vista2018Copyright} from "./Copyright";

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

function DialogFormSubmitButton(props){
    return(
        <DialogActions style={{
            float: "left",
            width: "180px",
            height: "50px",
            padding: 24,
            margin: 0}}
        >
            <Button variant="contained"
                    size="large"
                    type="button"
                    onClick={props.handleSubmit}
                    disabled={props.disabled}
                    style={{
                        margin: 0,
                        width: "100%",
                        height:"100%",
                        backgroundColor: 'var(--aqua-vista-light)',
                    }}
            >
                Submit
            </Button>
        </DialogActions>
    )
}

function Role(props){
    return(
        <Grid item xs={12} sm={6} >
            <Grid container
                  direction="row"
                  alignItems="center"
                  justify="space-around"
            >
                <Paper style={{
                    height: 40,
                    width: 220,
                    backgroundColor: 'var(--gray-vista-light)',
                }} >
                    <h5 className="role-text">
                        { props.role }
                    </h5>
                </Paper>
            </Grid>
        </Grid>
    )
}

class CreateJobAlertDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            roles: this.props.roles,

            firstName: '',
            lastName: '',
            emailAddress: '',
            isFormComplete: false,
            postSuccess: false,
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.roles !== state.roles) {
            return {
                roles: props.roles,
            }
        }
        return null;
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleInputValueChange = (inputLabel, inputValue) => {
        switch (inputLabel){
            case 'First name':
                this.setState({
                    firstName: inputValue,
                }, ()=> this.updateIsFormComplete());
                break;
            case 'Last name':
                this.setState({
                    lastName: inputValue
                }, ()=> this.updateIsFormComplete());
                break;
            case 'Email address':
                this.setState({
                    emailAddress: inputValue
                }, ()=> this.updateIsFormComplete());
                break;
            default:
                break;
        }

    };

    updateIsFormComplete = () => {
        this.setState({
            isFormComplete: this.isFormComplete()
        })
    };

    handleSubmit = (event) => {
        console.log("handleSubmit!");
        event.preventDefault();

        fetch('/users/submit', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                emailAddress: this.state.emailAddress,
                roles: this.state.roles
            })
        })
        .then( (res) => {
            if (res.ok){
                this.setState({
                    postSuccess: true
                });
                console.log("OK!!");
                this.props.handlePostResponse();
                this.handleClose();
            }
        });
    };

    isFormComplete = () => {
        const {firstName, lastName, emailAddress} = this.state;
        return firstName !== '' && lastName !== '' && emailAddress !== '';
    };

    render() {
        return (
            <Grid item >

               <Button variant="outlined" onClick={this.handleOpen} style={{textTransform: "none", height:50, width:"80%", padding:0}}>
                    <h5 className="create-job-alert-text"
                    >
                        {typeof this.state.roles === "undefined" || this.state.roles.length === 0 ? '' : 'Create a job alert'}
                    </h5>
                </Button>


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
                    <Grid container className="parent-container" direction="column">
                        <Grid className="close-button-container" style={{ float: "right" }}>
                            <IconButton color="inherit"
                                        onClick={this.handleClose}
                                        aria-label="Close"
                                        style={{width: 64, height: 64, padding: 16, marginLeft:"auto", marginRight:"0"}}
                            >
                                <CloseIcon style={{ width:"100%", height:"100%" }}/>
                            </IconButton>
                        </Grid>

                        <Grid container direction="column" justify="flex-start" alignItems="center">
                            <Grid item xs={12}>
                                <form>
                                    <Grid container direction="column" alignItems="stretch" style={{ maxWidth: "500px" }}>

                                        <Grid item xs={12}>
                                            <DialogTitle style={{paddingBottom:0, fontSize:'1.5em'}}>
                                                Create an email alert for:
                                            </DialogTitle>
                                        </Grid>

                                        <Grid item xs={12} style={{margin: 24}}>
                                            <Grid container spacing={8} direction="row" alignItems="flex-start" justify="space-between">
                                                {this.state.roles.map( (role, index) => (
                                                    <Role role={role.role} key={index}/>
                                                ))}
                                            </Grid>
                                        </Grid>


                                        <Grid item xs={12} >
                                            <DialogContent style={{paddingTop:0}}>
                                                <Grid container spacing={16} direction="column" alignItems="stretch" justify="space-between" >
                                                    {["First name", "Last name", "Email address"].map( (inputName, index) => (
                                                        <UserFormControl
                                                            key={index}
                                                            inputName={inputName}
                                                            handleInputChange={ this.handleInputValueChange.bind(this, inputName) }
                                                        />
                                                    ))}
                                                </Grid>
                                            </DialogContent>
                                        </Grid>


                                        <Grid item xs={12} style={{paddingLeft: 24, paddingTop: 12}}>

                                            <span style={{fontSize: "0.9em"}}>
                                                {'By submitting you agree to our '}
                                            </span>
                                            <span style={{fontSize: "0.9em", textDecoration: "underline"}}>
                                                {'terms and conditions.'}
                                            </span>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <DialogFormSubmitButton
                                                handleSubmit={this.handleSubmit}
                                                disabled={!this.state.isFormComplete}
                                            />
                                        </Grid>

                                        <Vista2018Copyright/>

                                    </Grid>
                                </form>
                            </Grid>
                        </Grid>
                    </Grid>
                </Dialog>
            </Grid>
        );
    }
}

CreateJobAlertDialog.propTypes = {
    roles: PropTypes.array,
    handlePostResponse: PropTypes.func.isRequired
};

export default withTheme()(CreateJobAlertDialog);