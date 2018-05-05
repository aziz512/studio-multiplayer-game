import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Board from './Board';

export default class MyGame extends Component {
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <div>
      <Board gameId={this.props.location.state.id} users={this.props.location.state.users}/>
    </div>);
  }
} 