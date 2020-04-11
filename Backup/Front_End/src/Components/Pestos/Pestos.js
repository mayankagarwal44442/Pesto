import React, {Component} from 'react';

import Pesto from '../Pesto/Pesto'

class Pestos extends Component {

    constructor(props) {
        super(props);   
        //Why? initialize this.props which is a member of parent to the props passed
        this.state = {array_pestos:[]}
        //state
    }

    xhr = new XMLHttpRequest();

    assignPestos = () => {
        // console.log(this.xhr.responseText);
        this.setState({array_pestos: (JSON.parse(this.xhr.responseText).pestos).split(';')})
    }

    getPestos(name){
        this.xhr.onload = this.assignPestos;
        this.xhr.open("GET", "http://localhost:2000?name=" + name, true);
        this.xhr.send(); 
    }

    componentDidMount(){
        this.getPestos(this.props.name);
        //as soon as component is mounted, get corresponding pestos and store in state
    }

    render() {
        return (

                this.state.array_pestos.map((pesto, index) => (
                    <Pesto key = {index} text = {pesto} />
                    //Need to have unique key for each element
                ))
        );				
    }

}

export default Pestos;
//export this moudule as Pestos