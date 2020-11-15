import React from "react"
import ListItem from "./ListItem"

function FriendsList(props) {
    if (props.data.length === 0) {
        return <p className="empty-list">No items to display :(</p>
    }

    return (
        <div className="items">
            {props.data.map((item, index) =>
                <ListItem
                    key={`${item.title}-${index}`}
                    item={item}
                    index={index}
                    onDelete={props.onDelete}
                    onFavorite={props.onFavorite}
                />
            )}
        </div>
    )
}

export default FriendsList