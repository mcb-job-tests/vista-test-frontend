import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import React, {Component} from "react";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';

import '../App.css';

const styles = theme => ({
    cssLabel: {
        '&$cssFocused': {
            color: 'var(--aqua-vista-shaded)',
        },
    },
    cssUnderline: {
        '&:after': {
            borderBottom: '2px solid var(--aqua-vista-shaded)',
        },
        '&:before': {
            borderBottom: '2px solid var(--aqua-vista-shaded)',
        },
    }
});

class UserFormControl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputText: ''
        }
    }

    handleChange = (event) => {
        this.setState({
           inputText: event.target.value
        });
        this.props.handleInputChange(event.target.value);
    };

    render(){
        const { classes } = this.props;
        return(
            <Grid item xs={12}>
                <FormControl style={{width:"100%"}}>
                    <InputLabel
                        style={{fontSize: "1.5em", color:'var(--gray-vista-dark)', fontFamily: 'tradeGothicNextLTPro-Rg'}}
                    >
                        { this.props.inputName }
                    </InputLabel>
                    <Input
                        style={{fontSize: "1.6em", color:'var(-main-text-color)', fontFamily: 'tradeGothicNextLTPro-Rg'}}
                        classes={{
                            underline: classes.cssUnderline,
                        }}
                        autoFocus={this.props.inputName === "First Name"}
                        value={this.state.inputText}
                        onChange={this.handleChange}
                    />
                </FormControl>
            </Grid>
        )
    }
}

UserFormControl.propTypes = {
    inputName: PropTypes.string.isRequired,
    handleInputChange: PropTypes.func.isRequired
};

export default withStyles(styles)(UserFormControl);
