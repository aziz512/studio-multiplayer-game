import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Board from './Board';

export default class MyGame extends Component {
  constructor(props){
    super(props);
    this.state ={
      clicks: 0
    }
    this.onButtonClicked=this.onButtonClicked.bind(this)
  }
  
  onButtonClicked(event){
    this.setState({
     clicks: this.state.clicks + 1
    })
  }
  
  render(){
    return (
      <div>
      <Board />
    </div>);
  }
} 