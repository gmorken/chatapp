import React from 'react'

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
                        <div className="message">
                            <div key={index} className="message-username">{message.senderId}</div>
                            <div className="message-text">{message.text}</div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default MessageList