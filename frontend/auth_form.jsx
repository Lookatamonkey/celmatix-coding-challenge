import React from 'react';
import * as UserAPIUtil from './api_util';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import NameForm from './name_form';
import EmailForm from './email_form';
import BioForm from './bio_form';
import ColorForm from './color_form';

export default class AuthForm extends React.Component{
 
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            fname : "",
            lname: "",
            email: "",
            age: "17 or younger",
            feet: 0,
            inches: 0,
            weight: "",
            favorite_color: "",
            errors: [],
        };

        this.renderErrors = this.renderErrors.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleNameVerification = this.handleNameVerification.bind(this);
        this.handleEmailVerification = this.handleEmailVerification.bind(this);
        this.handleBioVerification = this.handleBioVerification.bind(this);
        this.handleColorVerification = this.handleColorVerification.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.createUser = this.createUser.bind(this);
        this.turnPage = this.turnPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.prevButton = this.prevButton.bind(this);
        this.nextButton = this.nextButton.bind(this);
        this.setAge = this.setAge.bind(this);
    }

    // event handlers
    handleChange(prop) {
        return e => this.setState({[prop]: e.currentTarget.value});
    }

    // handleSubmit(e) {
    //     e.preventDefault();
    //     this.createUser();
    // }

    turnPage() {
        this.setState((prevState, props) => {
            return {
                page: prevState.page + 1,
                errors: [],
            };
        });
    }

    prevPage() {
        this.setState((prevState, props) => {
            return {
                page: prevState.page - 1,
                errors: [],
            };
        });
    }

    // sends post request to backend
    // createUser() {
    //     const state = this.state;
    //     UserAPIUtil.createUser({
    //         user: this.state 
    //     });
    // }

    setErrorState(err) {
        this.setState({
            errors: [err],
        });
    }

    handleNameVerification(e) {
        e.preventDefault();
        UserAPIUtil.verifyName({
            name: {
                fname: this.state.fname,
                lname: this.state.lname
            } 
         }).then(() => {
             this.turnPage();
         },
         (err) => {
             this.setErrorState(err.responseJSON);
         });
    }

    handleEmailVerification(e) {
        e.preventDefault();
        UserAPIUtil.verifyEmail({
            email: this.state.email
        }).then(() => {
            this.turnPage();
        },
        (err) => {
            this.setErrorState(err.responseJSON);
        });
    }

    handleBioVerification(e) {
        e.preventDefault();
        UserAPIUtil.verifyBio({
            bio: {
                age: this.state.age,
                height: this.state.feet.toString() + "'" + this.state.inches.toString(),
                weight: this.state.weight,
            }
        }).then(() => {
            this.turnPage();
        },
        (err) => {
            this.setErrorState(err.responseJSON);
        });
    }

    handleColorVerification(e) {
        e.preventDefault();
        UserAPIUtil.verifyBio({
            color: this.state.color,
        }).then(() => {
            this.turnPage();
        },
        (err) => {
            this.setErrorState(err.responseJSON);
        });
    }

    nextButton() {
        return(
            <Button className="pull-right" bsStyle="primary" type='submit'>{ this.state.page === 4 ? "Finish" : "Next"}</Button>
        );
    }

    prevButton() {
        return (
            <Button className="pull-right" bsStyle="primary" onClick={this.prevPage} type='button'>Prev</Button>
        );
    }

    renderErrors() {
        return (
            <div className="errors">
                {this.state.errors}
            </div>
        );
    }

    setAge(e) {
        const checkedAge = e.target.value;
        console.log(this.state.age);
        e.preventDefault();
        this.setState((prevState, props) => {
            return {
                age: checkedAge,
            };
        });
    }

    setColor(e) {
        debugger;
        const checkedColor = e.target.value;
        e.preventDefault();
        this.setState((prevState, props) => {
            return {
                color: checkedColor,
            };
        });
    }

    render() {
        console.log(this.state.age);
        return (
            <Grid>
                <Row className="row-1">
                    <Col xs={1} s={1} md={3} lg={3} xl={3}/>
                    <Col xs={11} s={11} md={6} lg={6} xl={6}>
                        <div className="auth-wrapper">
                        
                        {/* Name Form */}
                        { this.state.page === 0 ?
                            <NameForm
                                fname={this.state.fname}
                                lname={this.state.lname}
                                handleChange={this.handleChange}
                                handleNameVerification={this.handleNameVerification}
                                errors={this.state.errors}
                                nextButton={this.nextButton}
                                renderErrors={this.renderErrors}
                            /> : null }

                        {/* Email Form */}
                        { this.state.page === 1 ?
                            <EmailForm 
                                email={this.state.email}
                                handleChange={this.handleChange}
                                handleEmailVerification={this.handleEmailVerification}
                                errors={this.state.errors}
                                prevPage={this.prevPage}
                                prevButton={this.prevButton}
                                nextButton={this.nextButton}
                                renderErrors={this.renderErrors}
                            /> : null }
                        
                        {/* Bio Form */}
                        { this.state.page === 2 ?
                            <BioForm 
                                age={this.state.age}
                                feet={this.state.feet}
                                inches={this.state.inches}
                                weight={this.state.weight}
                                handleChange={this.handleChange}
                                handleBioVerification={this.handleBioVerification}
                                errors={this.state.errors}
                                prevPage={this.prevPage}
                                prevButton={this.prevButton}
                                nextButton={this.nextButton}
                                renderErrors={this.renderErrors}
                                setAge={this.setAge}
                            /> : null }

                        {/* Color Form */}
                        { this.state.page === 3 ?
                            <ColorForm 
                                color={this.state.color}
                                handleChange={this.handleChange}
                                handleColorVerification={this.handleColorVerification}
                                errors={this.state.errors}
                                prevPage={this.prevPage}
                                prevButton={this.prevButton}
                                nextButton={this.nextButton}
                                renderErrors={this.renderErrors}
                            /> : null }
                        </div>
                    </ Col>  
                    <Col xs={1} s={1} md={3} lg={3} xl={3}/>
                </Row>
            </Grid>
        );
    }
}