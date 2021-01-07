import React, { Component } from 'react';
import { Dimmer, Loader, Segment, Image } from 'semantic-ui-react'

class Loading extends Component {
    render() {
        return (
            <div style={{padding: '100px'}}>
                <Segment>
                    <Dimmer active>
                        <Loader size='medium'>Loading</Loader>
                    </Dimmer>
                    <Image size='huge' src='https://i.pinimg.com/originals/03/d1/9c/03d19cb39a9f1eb688d808af5f6d14b5.jpg' />
                </Segment>
            </div>
        );
    }
}

export default Loading;