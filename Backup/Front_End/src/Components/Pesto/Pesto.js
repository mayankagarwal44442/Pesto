import React, {Component} from 'react';

import "./Pesto.css"

class Pesto extends Component {

    render(){
        return (
            <div className = "pesto">
                <p> {this.props.text} </p>
            </div>
        );
    }

}

export default Pesto;