import React from 'react'

// class Message extends React.Component {  
//     render() {
//         return (
//             <div className="message">
           
//                 <div key={this.key} className="message-username">{this.props.username}</div>
//                 <div className="message-text">{this.props.text}</div>
            
//             </div>
//         )
//     }
// }

// export default Message


// same as above but a functional component.
function Message(props) {  
  
        return (
            <div className="message">
           
                <div className="message-username">{props.username}</div>
                <div className="message-text">{props.text}</div>
            
            </div>
        )
   
}

export default Message