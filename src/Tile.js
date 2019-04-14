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
    let moveClass = '';
    if(this.props.lastMove){
      if(this.props.position === this.props.lastMove.position){
        moveClass = 'oldMove';
      }
      else if(this.props.position === this.props.lastMove.position1){
        moveClass = 'newMove';
      }
    }
    return <div className={`tile ${this.props.color} ${this.props.isSelected ? 'selected':''} ${moveClass} `} onClick={() => this.props.click(this.props.position, this.props.figure)}>
      {figure}
    </div>;
  }
} 