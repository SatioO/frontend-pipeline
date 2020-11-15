import "./index.css"
import React from "react"

function CardHeader(props) {
    return (
        <div className="header">
            <p className="header-title">Friends List</p>
            <img 
                src={process.env.PUBLIC_URL + '/icons/search-24px.svg'} 
                alt="search" 
                style={{ height: "28px", width: "28px"}}
                onClick={props.onSearchClick}
            />
        </div>
    )
}

export default CardHeader