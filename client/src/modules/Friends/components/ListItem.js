import React from "react";

function ListItem({ item, index, onFavorite, onDelete }) {
    return (
        <div className="item">
            <div>
                <div className="list-title">{item.title}</div>
                <p className="list-subtitle">is your friend</p>
            </div>
            <div className="actions">
                <div className="action" onClick={() => onFavorite(index)}>
                    {item.active
                        ? <img src={process.env.PUBLIC_URL + '/icons/star-24px.svg'} alt="star" className="star-icon" />
                        : <img src={process.env.PUBLIC_URL + '/icons/star_border-24px.svg'} alt="star-outline"
                        />
                    }
                </div>
                <div className="action" onClick={() => onDelete(index)}>
                    <img src={process.env.PUBLIC_URL + '/icons/delete_outline-24px.svg'} alt="star" />
                </div>
            </div>
        </div>
    )
}

export default ListItem