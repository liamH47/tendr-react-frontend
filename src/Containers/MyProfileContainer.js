import React, { Component } from 'react';
import { connect } from 'react-redux'

class MyProfileContainer extends Component {
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
      currentUser: state.currentUser
    }
  }
}

export default connect(mapStateToProps)(MyProfileContainer)