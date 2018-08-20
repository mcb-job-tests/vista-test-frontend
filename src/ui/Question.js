import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';
import Paper from "@material-ui/core/Paper";
import React, {Component} from "react";
import {withTheme} from "@material-ui/core/styles/index";
import '../App.css';

import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';
import Button from '@material-ui/core/Button';;

function AnswerBox(props){
    const { answerIndex, answerText} = props;
    return(
        <Grid container className="answer-box"
              direction="row"
              alignItems="center"
              justify="space-around"
        >
            <h5 className="answer-text" >
                {answerIndex === -1 ? "Select an answer" : answerText}
            </h5>
        </Grid>
    )
}

class Question extends Component {

    constructor ( props ) {
        super(props);
        this.state = {
            answerIndex : -1,
            answerText : '',
            slideUp : false,
        }
    }

    updateAnswerState(newIndex){
        const code = this.props.question.answers[newIndex].code;
        this.setState({
            answerIndex: newIndex,
            answerText: code + '. ' + this.props.question.answers[newIndex].answer
        });
        this.props.updateSelectedAnswers(this.props.index, code);
    }

    handleUpButtonClick(){
        if (this.state.answerIndex > 0){
            const newIndex = this.state.answerIndex - 1;
            this.updateAnswerState(newIndex);
        }
    }

    handleDownButtonClick(){
        const maxIndex = this.props.question.answers.length - 1;
        if (this.state.answerIndex < maxIndex){
            const newIndex = this.state.answerIndex + 1;
            this.updateAnswerState(newIndex);
        }
    }

    render() {

        return (
            <Paper>
                <Grid container className="question-card" direction="column" justify='space-between'>
                    <Grid item className="question-title-box">
                        <h5 className="question-title">
                            {"QUESTION " + (this.props.index + 1)}
                        </h5>
                        <h5 className="question-text">
                            {this.props.question.text}
                        </h5>
                    </Grid>
                    <Grid item>
                        <Grid container direction="column">

                            <Grid item className="up-arrow-selector-box">
                                <Button className="answer-button"
                                        disabled={this.state.answerIndex <= 0}
                                        onClick={this.handleUpButtonClick.bind(this)}
                                        style={{fontSize: "200%"}}
                                >
                                    <ArrowDropUp fontSize="inherit" />
                                </Button>
                            </Grid>

                            <AnswerBox
                                answerIndex={this.state.answerIndex}
                                answerText={this.state.answerText}
                            />

                            <Grid item className="down-arrow-selector-box">
                                <Button className="answer-button"
                                        disabled={this.state.answerIndex === this.props.question.answers.length - 1}
                                        onClick={this.handleDownButtonClick.bind(this)}
                                        style={{fontSize: "200%"}}
                                >
                                    <ArrowDropDown fontSize="inherit" />
                                </Button>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

Question.propTypes = {
    index: PropTypes.number.isRequired,
    question: PropTypes.object.isRequired,
    updateSelectedAnswers: PropTypes.func.isRequired,
};

export default withTheme()(Question);