import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Thank extends Component {
     
  render() {
    return (
    <div className="container">
        <div className="column">
            <h2>Thank you!</h2>
            <Link to="/Login">
                    <button className="button" onClick={this.clickLog}>Login</button>
            </Link>
             <Link to="/">
                <p  className="back">Back</p>
            </Link>
        </div>
    </div>
        
    );
  }
}

export default Thank;
