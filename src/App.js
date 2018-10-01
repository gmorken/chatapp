import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit'
import logo from './logo.svg';
import './style.css';
import MessageList from './components/MessageList';
import Message from './components/Message';
import RoomList from './components/RoomList';
import NewRoomForm from './components/NewRoomForm';
import SendMessageForm from './components/SendMessageForm';
import { tokenUrl, instanceLocator } from './config'

class App extends Component {

  constructor() {
      super();
      // init state as an object
      this.state = {
          messages: [],
          joinableRooms: [],
          joinedRooms: [],
          roomId: null
      }
      this.sendMessage = this.sendMessage.bind(this);
      this.subscribeToRoom = this.subscribeToRoom.bind(this);
      this.getRooms = this.getRooms.bind(this);
      this.createRoom = this.createRoom.bind(this)
  }
  componentDidMount() {
      
    const chatManager = new Chatkit.ChatManager({
        instanceLocator,
        userId: 'tomas.axell',
        tokenProvider: new Chatkit.TokenProvider({
            url: tokenUrl
        })
    })
    
    chatManager.connect()
    .then(currentUser => {

        // define property currentuser
        this.currentUser = currentUser;
        
        // getJoinableRooms is a func from chatikit. returns a promise
        
        //this.subscribeToRoom();
        this.getRooms();
        
    })
    .catch(error => {
      console.error("error:", error);
    })
}
getRooms()
{
    this.currentUser.getJoinableRooms()
    .then(joinableRooms => {
        this.setState({
            joinableRooms: joinableRooms,
            joinedRooms: this.currentUser.rooms
        })

    })
    .catch(err => console.log('error in joinableRooms: ', err))
}
subscribeToRoom(roomId)
{
    this.setState( { messages: []});
    this.currentUser.subscribeToRoom({
        roomId: roomId,
        hooks: {
            onNewMessage: message => {
                this.setState({
                    // spread operator
                    messages: [...this.state.messages, message]
                })
                //console.log('message.text: ', message.text);
            }
        }
    }).then( room => {
        this.setState({ roomId: room.id})
        this.getRooms()
    })
    .catch(err => console.log('error', err))
}
createRoom(name)
{
    this.currentUser.createRoom({
        name
    })
    .then(room => this.subscribeToRoom(room.id))
    .catch(err => console.log('error with createRoom: ', err))
}
sendMessage(text) {
    this.currentUser.sendMessage({
        text: text,
        roomId: this.state.roomId

    });
}


  

  render() {
    return (
      <div className="app">
        
                <RoomList
                    roomId = {this.state.roomId}
                    subscribeToRoom={this.subscribeToRoom}
                    rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}/>
                <MessageList
                    roomId={this.state.roomId}
                    messages={this.state.messages}/>
                <SendMessageForm
                    disabled={!this.state.roomId}
                    sendMessage={this.sendMessage} />
                <NewRoomForm createRoom={this.createRoom} />
            </div>
    );
  }
}

export default App;
//