import React, { Component } from 'react';



export default class Tile extends Component {
  constructor(props){
    super(props);
  }
  
  render(){
    let figure = undefined;
    if(this.props.figure){
      figure = <img src={'/assets/' + this.props.figure.color + '_' + this.props.figure.type + '.png'} className='icon'/>;
    }
    return <div className={'tile ' + this.props.color} onClick={() => this.props.onClick(this.props.position)}>
      {figure}
    </div>;
  }
} 