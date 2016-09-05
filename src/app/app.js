'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

class MyComponent extends React.Component {
    render () {
        return (
            <p>My name is Paul ;)</p>
        );
    }
}

ReactDOM.render(
    <MyComponent/>,
    document.getElementById('test')
);