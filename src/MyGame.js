import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Board from './Board';
import firebase from 'firebase';

export default class MyGame extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  
  componentWillMount(){
    let sessionRef = firebase.database().ref('/session-metadata/' + this.props.location.state.id);
    let creatorColorRef = sessionRef.child('creator_color');
    firebase.auth().onAuthStateChanged((user) => {
      let currentUserId = user.uid;
      let isCreator = this.props.location.state.creator === currentUserId;
      creatorColorRef.once('value', (snapshot) => {
        if(!snapshot.val()){
          let color = Math.round(Math.random()) === 1 ? 'white' : 'black';
          sessionRef.child('creator_color').set(color).then(() => {
            this.setState({
              color:color
            });
          });
        }
        else{
          this.setState({
            color: isCreator  ? snapshot.val() : (snapshot.val() === 'white' ? 'black': 'white')
          });
        }
      });
    });
  }
  
  render(){
    let board = this.state.color ? (<Board gameId={this.props.location.state.id} users={this.props.location.state.users} color={this.state.color}/>)  : null;
    return (
      <div>
        {board}
      </div>);
  }
} 