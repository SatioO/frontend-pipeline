import "./index.css"
import React from "react"

function FriendsList(props) {
    if(props.data.length === 0) {
        return <p>No items to display</p>
    }

    return (
        <div className="list">
            {props.data.map((item, index) => (
                <div className="list-item" key={item.title}>
                    <div>
                        <div>{item.title}</div>
                        <p>is your friend</p>
                    </div>
                    <div className="actions">
                        <div className="action" onClick={() => props.onFavorite(index)}>
                            {item.active
                                ? <img src={process.env.PUBLIC_URL + '/icons/star-24px.svg'} alt="star" />
                                : <img src={process.env.PUBLIC_URL + '/icons/star_border-24px.svg'} alt="star-outline"
                                />
                            }
                        </div>
                        <div className="action" onClick={() => props.onDelete(index)}>
                            <img src={process.env.PUBLIC_URL + '/icons/delete_outline-24px.svg'} alt="star" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FriendsList