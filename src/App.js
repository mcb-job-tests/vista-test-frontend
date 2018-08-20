import React, {Component} from 'react';
import { withTheme } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid"
import Typography from '@material-ui/core/Typography';
import weAreVistaLogo from './we-are-vista.png';
import './App.css';
import Question from "./ui/Question";
import Roles from "./ui/Roles";
import clone from 'clone';
import {Vista2018Copyright} from './ui/Copyright';

function WeAreVistaCalcHeader(){
    return(
        <Grid container alignItems={'center'} justify={'space-between'} style={{paddingBottom:24}}>
            <Grid item xs={12} sm={6} style={{textAlign: 'left', paddingBottom:12}} >
                <img className="inverted-image" src={weAreVistaLogo} alt="We are Vista" width="203" height="19"/>
            </Grid>
            <Grid item xs={12} sm={6} style={{textAlign: 'right', paddingBottom:12}} >
                <Typography className="career-calculator-title" variant="title" >
                    Career Calculator
                </Typography>
            </Grid>
        </Grid>
    )
}
function HowItWorks(){
    const howItWorksText = "Answer the 4 questions below using the up/down arrows to select your preferred " +
        "response. Our suggested most suitable roles(s) will then appear at the end.";

    return(
        <Grid container justify="flex-start" alignItems="flex-start" style={{paddingBottom:24}}>
            <Grid item xs sm style={{maxWidth: '160px'}} >
                <Grid container style={{textAlign: 'left'}}>
                    <h5 className="how-it-works-title" style={{marginLeft: 0, marginBottom: 0}}>
                        HOW IT WORKS
                    </h5>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={7}  >
                <Grid container style={{textAlign: 'left'}}>
                    <h5 className="how-it-works-body" style={{marginLeft: 0}}>
                        { howItWorksText }
                    </h5>
                </Grid>
            </Grid>
        </Grid>
    );
}

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            questions: [],
            roles: [],
            selectedAnswers: [],
            recommendedRoles: [],
            allAnswersSelected: false,
        }
    }

    componentDidMount(){
        fetch('/calc')
            .then(res => res.json())
            .then(calc => this.setState({
                questions: calc.questions,
                roles: calc.roles
            }))
            .then(()=>this.initialiseSelectedAnswers());


    }

    initialiseSelectedAnswers(){
        let initialSelectedAnswers = new Array(this.state.questions.length);
        initialSelectedAnswers.fill('');
        this.setState({
            selectedAnswers : initialSelectedAnswers
        });
    }

    static selectedAnswersCount(selectedAnswers){
        return selectedAnswers.filter(code => code !== '').length;
    }

    sortRecommededRoles(roles){
        roles.sort(( roleA, roleB ) => roleA.matchCount > roleB.matchCount ? -1
                                     : roleA.matchCount < roleB.matchCount ? 1
                                     : 0);
    }

    updateSelectedAnswers(index, answerCode){
        let updatedSelectedAnswers = clone(this.state.selectedAnswers);

        updatedSelectedAnswers[index] = answerCode;
        const count = App.selectedAnswersCount(updatedSelectedAnswers);
        let allSelected = (count === this.state.questions.length);
        let roles = [];
        if (allSelected){
             roles = this.getRecommendedRoles(updatedSelectedAnswers);
             this.sortRecommededRoles(roles);
             roles = roles.filter(role=>role.matchCount > 2);
        }

        this.setState({
            selectedAnswers : updatedSelectedAnswers,
            allAnswersSelected: allSelected,
            recommendedRoles: roles
        });
    }

    getRecommendedRoles(updatedSelectedAnswers){
        let roles = new Array(this.state.roles.length);
        for (let i = 0; i < roles.length; i ++){
            let roleAnswers = this.state.roles[i].answers;
            let matchCount = 0;
            for(let j = 0; j < roleAnswers.length; j++){
                if (updatedSelectedAnswers[j] === roleAnswers[j]){
                    matchCount++;
                }
            }
            roles[i] = {
                role: this.state.roles[i].role,
                matchCount: matchCount
            };

        }
        return roles;
    }

    render() {

        return (
            <div className="App">
                <div className="parent-content">
                    <Grid container className="parent-container" direction="column" justify="flex-start">
                        <Grid item xs={12} >
                            <WeAreVistaCalcHeader/>
                        </Grid>
                        <Grid item xs={12} >
                            <HowItWorks/>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={16} direction="row" alignItems='flex-start' justify='space-evenly'>
                                {this.state.questions.map( (question, index) => (
                                    <Grid item xs={12} sm={6} md={4} lg={true} key={index} >
                                        <Question
                                            index={index}
                                            question={question}
                                            updateSelectedAnswers={this.updateSelectedAnswers.bind(this)}
                                        />
                                    </Grid>
                                ))}
                                    <Grid item xs={12} sm={6} md={4} lg={true}>
                                        <Roles
                                            title={"RECOMMENDED ROLES"}
                                            roles={this.state.recommendedRoles}
                                        />
                                    </Grid>

                                    <Vista2018Copyright />
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default withTheme()(App);
