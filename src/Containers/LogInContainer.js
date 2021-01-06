import React, { Component } from 'react';
import { Form, Button, Segment} from 'semantic-ui-react'
import SignUpForm from '../Components/SignUpForm';
import LogInForm from '../Components/LogInForm'
import { connect } from 'react-redux'

class LogInContainer extends Component {

    render() {
        return (
            <div style={{padding: '100px'}}>
                <LogInForm />
                <SignUpForm />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
      currentUser: state.currentUser
    }
  }

export default connect(mapStateToProps)(LogInContainer);