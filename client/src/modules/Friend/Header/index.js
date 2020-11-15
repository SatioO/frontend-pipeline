import "./index.css"
import React from "react"

function Header(props) {
    return (
        <div className="header">
            <p className="header-title">Friends List</p>
            <div>
                <img 
                    src={process.env.PUBLIC_URL + '/icons/playlist_add-24px.svg'} 
                    alt="add"
                    onClick={props.onAdd}
                    className="icon"
                />
                <img 
                    src={process.env.PUBLIC_URL + '/icons/search-24px.svg'} 
                    alt="search" 
                    onClick={props.onSearch}
                    className="icon"
                />
            </div>
        </div>
    )
}

export default Header