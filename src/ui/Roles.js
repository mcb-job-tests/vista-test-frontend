import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';
import Paper from "@material-ui/core/Paper";
import React, {Component} from "react";
import {withTheme} from "@material-ui/core/styles/index";
import '../App.css';
import RoleSelectionButton from './RoleSelectionButton';
import AllSetSplashDialog from './AllSetSplashDialog';
import CreateJobAlertDialog from './CreateJobAlertDialog';
import clone from 'clone';

class Roles extends Component {

    constructor ( props ) {
        super(props);
        this.state = {
            roles: [],
            selectedRoles: [],
            open: false,
            userPosted: false,
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.roles !== state.roles) {
            return {
                roles: props.roles,
                selectedRoles: Array(props.roles.length).fill(false),
            }
        }
        return null;
    }

    handleSelectionClick = (index) => {
        let newSelectedRoles = clone(this.state.selectedRoles);
        newSelectedRoles[index] = !newSelectedRoles[index];

        this.setState({
            selectedRoles: newSelectedRoles
        })
    };

    handlePostResponse = () => {
        console.log("handlePostResponse!!");
        this.setState({
            userPosted: true
        });
    };

    handleCloseSplashDialog = () => {
        this.setState({
            userPosted: false
        });
    };

    render() {

        console.log(this.props.roles);
        console.log(this.state.selectedRoles);
        const backgroundColor = 'var(--aqua-vista-shaded)';

        return (
            <Paper>
                <Grid container className="roles-card" direction="column" justify='space-between'>
                    <Grid item className="roles-title-box">
                        <h5 className="roles-title">
                            {this.props.title}
                        </h5>
                        <h5 className="roles-help-text">
                            {this.props.roles.length === 0 ? "Select your answers" : "Select roles and click below to create a job alert"}
                        </h5>
                    </Grid>
                    <Grid item>
                        <Grid container spacing={8} direction="column" justify="space-between">
                            {this.state.roles.map((role, index)=>(
                                <RoleSelectionButton
                                    role={role.role}
                                    handleClick={this.handleSelectionClick.bind(this, index)}
                                    backgroundColor={ this.state.selectedRoles[index] ? 'white' : backgroundColor }
                                    key={index}
                                />
                            ))}
                        </Grid>
                    </Grid>
                    { typeof this.state.roles !== "undefined" && this.state.roles.length > 0 ?
                        <CreateJobAlertDialog
                            roles={this.state.roles.filter((role, index)=>this.state.selectedRoles[index])}
                            handlePostResponse={this.handlePostResponse}
                        /> : ''
                    }
                    { this.state.userPosted ? <AllSetSplashDialog handleButtonClick={this.handleCloseSplashDialog} /> : ''}
                </Grid>
            </Paper>
        )
    }
}

Roles.propTypes = {
    title: PropTypes.string.isRequired,
    roles: PropTypes.array.isRequired
};

export default withTheme()(Roles);