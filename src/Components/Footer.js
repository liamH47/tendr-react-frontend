import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react'

class Footer extends Component {
    render() {
        return (
            <div className='footer'>
                <Segment padded='very' inverted vertical></Segment>
            </div>
        );
    }
}

export default Footer;