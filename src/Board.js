import React, { Component } from 'react';
import Tile from './Tile';
import firebase from 'firebase';

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
    type:'pawn',
    position:'b2'
  },
  {
    color:'white',
    type:'pawn',
    position:'c2'
  },
  {
    color:'white',
    type:'pawn',
    position:'d2'
  },
  {
    color:'white',
    type:'pawn',
    position:'e2'
  },
  {
    color:'white',
    type:'pawn',
    position:'f2'
  },
  {
    color:'white',
    type:'pawn',
    position:'g2'
  },
  {
    color:'white',
    type:'pawn',
    position:'h2'
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
  },
  
  ///////  PLAYER 2    ////////
  
  {
    color:'black',
    type:'pawn',
    position:'a7'
  },
  {
    color:'black',
    type:'pawn',
    position:'b7'
  },
  {
    color:'black',
    type:'pawn',
    position:'c7'
  },
  {
    color:'black',
    type:'pawn',
    position:'d7'
  },
  {
    color:'black',
    type:'pawn',
    position:'e7'
  },
  {
    color:'black',
    type:'pawn',
    position:'f7'
  },
  {
    color:'black',
    type:'pawn',
    position:'g7'
  },
  {
    color:'black',
    type:'pawn',
    position:'h7'
  },
  {
    color:'black',
    type:'rook',
    position:'a8'
  },
  {
    color:'black',
    type:'knight',
    position:'b8'
  },
  {
    color:'black',
    type:'bishop',
    position:'c8'
  },
  {
    color:'black',
    type:'queen',
    position:'d8'
  },
  {
    color:'black',
    type:'king',
    position:'e8'
  },
  {
    color:'black',
    type:'bishop',
    position:'f8'
  },
  {
    color:'black',
    type:'knight',
    position:'g8'
  },
  {
    color:'black',
    type:'rook',
    position:'h8'
  }
];

export default class Board extends Component {
  constructor(props){
    super(props);
    this.state ={
      selectedTile:undefined,
      figures: figures, 
      moves:[]
    }
    this.tileClicked = this.tileClicked.bind(this);
    this.updateFigures = this.updateFigures.bind(this);
    this.loadFigures = this.loadFigures.bind(this);
    this.loadFigures();
    this.loadMoves = this.loadMoves.bind(this);
    this.loadMoves();
  }
  
  loadMoves(){
    let movesRef = firebase.database().ref('session-metadata/' + this.props.gameId + '/moves');
    movesRef.on('value', snapshot => {
      let newState = this.state;
      newState.moves = Object.values(snapshot.val() || {});
      this.setState(Object.assign({}, newState));
    });
  }

  loadFigures(){
    let sessionRef = firebase.database().ref('session-metadata/'+this.props.gameId + '/figures');
    sessionRef.on('value', (snapshot) => {
      this.setState({
        selectedTile: undefined,
        figures: snapshot.val() || figures,
        moves: this.state.moves
      });
    });
  }

  updateFigures(figures, move){
    let figuresRef = firebase.database().ref('session-metadata/' + this.props.gameId + '/figures');
    let movesRef = firebase.database().ref('session-metadata/' + this.props.gameId + '/moves');
    movesRef.push(move);
    return figuresRef.set(figures);
  }

  tileClicked(position, figure){
    if(this.state.moves.length > 0){
      if(this.state.moves[this.state.moves.length - 1].color == this.props.color){
        return;
      }
    }
    else{
      if(this.props.color != 'white'){
        return;
      }
    }
    if(!this.state.selectedTile){
      if(figure){
        if(this.props.color == figure.color){
          this.setState({
            selectedTile: position,
            figures: this.state.figures,
            moves: this.state.moves
          });
        }
      }
    }
    else{
      let figures = this.state.figures;
      let isMoved = false;
      let move = null;
      figures.forEach((fig,i) => {
        if(fig.position == this.state.selectedTile){
          if(fig && figure){
            if(fig.color === figure.color){
              return;
            }
            else{
              isMoved = true;
            }
          }
          move = Object.assign({}, fig);
          move.position1 = position;
          fig.position = position;
        }
      });
      let newFigures = figures.filter(x => {
        return isMoved ? !(x.position == figure.position && x.color == figure.color) : true;
      });
      this.setState({
        selectedTile:undefined,
        figures: newFigures,
        moves: this.state.moves
      });
      this.updateFigures(newFigures, move);
    }
  }
  
  render(){
    let moves = [];
    moves = this.state.moves.map((move, i) => {
      return (<div key={i}>{move.position} {move.position1}</div>);
    });
    let rows = [];
    if(this.props.color == 'white'){
      for(let r = 8; r >= 1; r--){
        let tiles = [];
        for(let i = 1; i <= 8; i++){
          let blackOrWhite = r % 2 != 0 ? (i%2 !=0 ? 'black':'white') : (i%2 == 0 ? 'black':'white');
          let position = numToLetter[i]+r;
          tiles.push(<Tile color={blackOrWhite} position={position} click={this.tileClicked}
                           figure={this.state.figures.find((fig) => fig.position == position)}
                           isSelected={this.state.selectedTile == position} lastMove={this.state.moves[this.state.moves.length-1]} />);
        }
        rows.push(<div className="row">{tiles}</div>);
      }
    }
    else{
      for(let r = 1; r <= 8; r++){
        let tiles = [];
        for(let i = 8; i >= 1; i--){
          let blackOrWhite = r % 2 != 0 ? (i%2 !=0 ? 'black':'white') : (i%2 == 0 ? 'black':'white');
          let position = numToLetter[i]+r;
          tiles.push(<Tile color={blackOrWhite} position={position} click={this.tileClicked}
                           figure={this.state.figures.find((fig) => fig.position == position)}
                           isSelected={this.state.selectedTile == position} lastMove={this.state.moves[this.state.moves.length-1]}/>);
        }
        rows.push(<div className="row">{tiles}</div>);
      }
    }
    
    return (<div>
      <div className="board col">{rows}</div>
      <div className="col movesBlock">
        <h3>Moves</h3>
        {moves}
      </div>
    </div>);
  }
} 