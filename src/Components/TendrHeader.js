import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react'

class TendrHeader extends Component {
    render() {
        return (
            <div className='header'>
                <Segment textAlign='center' inverted padded='very' vertical>
                    <h1>welcome to tendr</h1>
                </Segment>               
            </div>
        );
    }
}

export default TendrHeader;