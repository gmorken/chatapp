import React from 'react'

class RoomList extends React.Component {

    
    render () {
        
        // sortera roomlisten
        const orderedRooms = [...this.props.rooms].sort((a, b) => a.id - b.id);
        //console.log(this.props.rooms)
        return (
            <div className="rooms-list">
            <ul>
                <h3>Dina rum</h3>
                {orderedRooms.map(room => {
                    // kolla om rummet är det aktuella rummet. i så fall gör li class = active
                    const active = this.props.roomId === room.id ? "active" : "";
                    return (
                        <li key={room.id} className={"room " + active}>
                                <a
                                    onClick={() => this.props.subscribeToRoom(room.id)}
                                    href="#">
                                    # {room.name}
                                </a>
                            </li>
                    )

                })}
                </ul>
                {/* <div className="help-text">RoomList</div> */}
            </div>
        )
    }
}

export default RoomList