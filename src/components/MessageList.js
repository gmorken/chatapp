import React from 'react'
import Message from './Message'

// const DUMMY_DATA = [
//     {
//         senderId: 'Tomas Axell',
//         text: 'Hey, how is it going?'
//     },
//     {
//         senderId: 'janedoe',
//         text: 'Great! How about you?'
//     },
//     {
//         senderId: 'perborgen',
//         text: 'Good to hear! I am great as well'
//     }
// ]

class MessageList extends React.Component {
    render() {
        return (
            <div className="message-list">
                {this.props.messages.map((message, index) => {
                    var x = message;
                    return (
                        <Message key={index} username={message.senderId} text={message.text} />
                        
                    )
                })}
            </div>
        )
    }
}

export default MessageList