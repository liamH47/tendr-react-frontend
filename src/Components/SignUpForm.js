import React, { Component } from 'react';
import { Form, Button, Segment} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { createUser } from '../Redux/actions'

class SignUpForm extends Component {

    state = {
        username: "",
        email: "",
        password: ""
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.submitHandler(this.state)
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <Segment>
                <Form onSubmit={this.submitHandler}>
                    <Form.Field required>
                        <label>Username</label>
                        <input type="text" name="username" placeholder='Desired Username' value={this.state.username} onChange={this.changeHandler}/>
                    </Form.Field>
                    <Form.Field required>
                        <label>Email</label>
                        <input type="text" name="email" placeholder='Your Email' value={this.state.email} onChange={this.changeHandler} />
                    </Form.Field>
                    <Form.Field required>
                        <label>Password</label>
                        <input type="text" name="password" placeholder='Desired Password' value={this.state.password} onChange={this.changeHandler}/>
                    </Form.Field>
                    <Button type='submit'>Submit</Button>
                </Form>
            </Segment>
        );
    }
}

function mapDispatchToProps(dispatch){
    return {
        submitHandler: (userObj) => {
            return dispatch(createUser(userObj));
        }
    }
}

export default connect(null, mapDispatchToProps)(SignUpForm);