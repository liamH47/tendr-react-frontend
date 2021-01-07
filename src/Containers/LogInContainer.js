import React, { Component } from 'react';
import { Form, Button, Segment, Divider, Header} from 'semantic-ui-react'
import SignUpForm from '../Components/SignUpForm';
import LogInForm from '../Components/LogInForm'
import { connect } from 'react-redux'

class LogInContainer extends Component {

    render() {
        return (
            <div className='login-container' style={{padding: '100px'}}>
                <Header size='medium' textAlign='center' content='Log in' />
                <LogInForm />
                {/* <Segment> */}
                <>
                <Divider horizontal>Or</Divider>
                </>
                <Header size='medium' textAlign='center' content='Sign Up' />
                {/* </Segment> */}
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