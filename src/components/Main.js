import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Main extends Component {
     constructor(){
      super();
      this.state={
          users:[]
      }
  }   
  render() {
    return (
    <div className="container">
        <div className="buttons">
            <Link to="/Registration">
                <button className="button">Registration</button>
            </Link>
            <Link to="/Login">
                <button className="button">Login</button>
            </Link>
        </div>
    </div>
        
    );
  }
}

export default Main;
