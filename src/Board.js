import React, { Component } from 'react';
import Tile from './Tile';

let numToLetter = {
  1:'a',
  2:'b',
  3:'c',
  4:'d',
  5:'e',
  6:'f',
  7:'g',
  8:'h'
};

let figures = [
  {
    color:'white',
    type:'pawn',
    position:'a2'
  },
  {
    color:'white',
    type:'rook',
    position:'a1'
  },
  {
    color:'white',
    type:'knight',
    position:'b1'
  },
  {
    color:'white',
    type:'bishop',
    position:'c1'
  },
  {
    color:'white',
    type:'queen',
    position:'d1'
  },
  {
    color:'white',
    type:'king',
    position:'e1'
  },
  {
    color:'white',
    type:'bishop',
    position:'f1'
  },
  {
    color:'white',
    type:'knight',
    position:'g1'
  },
  {
    color:'white',
    type:'rook',
    position:'h1'
  }
];

export default class Board extends Component {
  constructor(props){
    super(props);
    this.state ={
      selectedTile:undefined,
      figures: figures
    }
    this.tileClicked = this.tileClicked.bind(this);
  }

  tileClicked(position){
    if(!this.state.selectedTile){
      this.setState({
        selectedTile: position
      });
    }
    else{
      let figures = this.state.figures;
      figures.forEach(fig => {
        if(fig.position == this.state.selectedTile){
          fig.position = position;
        }
      });
      this.setState({
        selectedTile:undefined,
        figures: figures
      });
    }
  }
  
  render(){
    console.log(this.state);
    let rows = [];
    for(let r = 8; r >= 1; r--){
      let tiles = [];
      for(let i = 1; i <= 8; i++){
        let blackOrWhite = r % 2 != 0 ? (i%2 !=0 ? 'black':'white') : (i%2 == 0 ? 'black':'white');
        let position = numToLetter[i]+r;
        tiles.push(<Tile color={blackOrWhite} position={position} onClick={this.tileClicked}
                         figure={figures.find((fig) => fig.position == position)}/>);
      }
      rows.push(<div className="row">{tiles}</div>);
    }
    return (<div className="board">
      {rows}
    </div>);
  }
} 