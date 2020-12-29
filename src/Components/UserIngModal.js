import React, { Component } from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { deleteIngredient } from '../Redux/actions'

class UserIngModal extends Component {

    state = {
        open: false
    }

    componentDidMount() {
        this.setState({ open: false })
    }
    

    render() {
        return (
            <Modal
              onClose={() => this.setState({ open: false})}
              onOpen={() => this.setState({ open: true})}
              open={this.state.open}
              trigger=
            >

            </Modal>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {localDeleteHandler: (id) => dispatch(deleteIngredient(id))}
}

function mapStateToProps(state){
    return {userIngApi: state.userIngApi}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserIngModal); 