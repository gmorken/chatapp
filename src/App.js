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
          messages: []
      }
  }
  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
        instanceLocator,
        userId: 'tomas.axell',
        tokenProvider: new Chatkit.TokenProvider({
            url: tokenUrl
        })
    })
    
    // chatmanager
    chatManager.connect()
    .then(currentUser => {
        currentUser.subscribeToRoom({
            roomId: 17308005,
            hooks: {
                onNewMessage: message => {
                    this.setState({
                        // spread operator
                        messages: [...this.state.messages, message]
                    })
                    //console.log('message.text: ', message.text);
                }
            }
        })
    })
    .catch(error => {
      console.error("error:", error);
    })
}
             
  

  render() {
    return (
      <div className="app">
                <RoomList />
                <MessageList messages={this.state.messages}/>
                <SendMessageForm />
                <NewRoomForm />
            </div>
    );
  }
}

export default App;
//