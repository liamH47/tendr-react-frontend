import React, { Component } from 'react';
import { Form, Button, Segment} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { logInUser } from '../Redux/actions'
import { withRouter } from 'react-router-dom'

class LogInForm extends Component {

    state = {
        username: "",
        password: ""
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    loginHandler = (e) => {
        e.preventDefault()
        this.props.loginHandler(this.state)
        this.props.history.push('/explore_cocktails')
        console.log("current user after pressing log in:",this.props.currentUser)

    }

    render() {
        return (
            <Segment>
                <Form onSubmit={this.loginHandler}>
                    <Form.Field required>
                        <label>Username</label>
                        <input type="text" name="username" placeholder='Your Username' value={this.state.username} onChange={this.changeHandler} />
                    </Form.Field>
                    <Form.Field required>
                        <label>Password</label>
                        <input type="password" name="password" placeholder='Your Password' value={this.state.password} onChange={this.changeHandler}/>
                    </Form.Field>
                    <Button type='submit'>Log In!</Button>
                </Form>
            </Segment>
        );
    }
}

function mapStateToProps(state) {
    return {
      currentUser: state.currentUser
    }
  }

function mapDispatchToProps(dispatch){
    return {
        loginHandler: (userObj) => dispatch(logInUser(userObj))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogInForm));