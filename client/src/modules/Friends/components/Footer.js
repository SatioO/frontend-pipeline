import React from "react"

function Footer(props) {
    return (
        <div className="footer">
            <img
                src={process.env.PUBLIC_URL + '/icons/keyboard_arrow_left-24px.svg'}
                alt="search"
                className="icon"
                onClick={props.onPreviousPage}
                style={{ pointerEvents: props.page.offset === 0 ? "none": "initial" }}
            />
            <img
                src={process.env.PUBLIC_URL + '/icons/keyboard_arrow_right-24px.svg'}
                alt="add"
                className="icon"
                onClick={props.onNextPage}
                style={{ pointerEvents: (props.page.total <= props.page.offset + 4) ? "none": "initial" }}
            />
        </div>
    )
}

export default Footer