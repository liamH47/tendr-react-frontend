import React from 'react';
import {Segment, Sticky} from 'semantic-ui-react'

const Header = () => {
    return (
        <Sticky>
            <Segment inverted vertical>
                <h1>welcome to tendr</h1>
            </Segment>
        </Sticky>
    )
}

export default Header