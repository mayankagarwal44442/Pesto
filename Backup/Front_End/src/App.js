/* eslint-disable */

import React, {Component} from 'react';
// import './App.css';
import Pestos from './Components/Pestos/Pestos'



class App extends Component {			//extending is important to use functions like componentDidMount



    render() { 
      return (
          <div>
              <Pestos name = "mayank" />
              {/*In vanilla JS, you would put onclick in a string, here direct. Also onClick not onclick */}
          </div>
      );
    }
  //Pestos component referes to all pestos together. This component in turn has pesto as componenet.
}


export default App;
