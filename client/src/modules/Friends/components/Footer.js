import React from "react"

function Footer(props) {
    return (
        <div className="footer">
            {props.page.offset !== 0 ? <img
                src={process.env.PUBLIC_URL + '/icons/keyboard_arrow_left-24px.svg'}
                alt="search"
                className="icon"
                onClick={props.onPreviousPage}
            /> : <img
                    src={process.env.PUBLIC_URL + '/icons/keyboard_arrow_left_disabled-24px.svg'}
                    alt="search"
                    className="icon"
                />
            }

            {props.page.total > props.page.offset + 4
                ? <img
                    src={process.env.PUBLIC_URL + '/icons/keyboard_arrow_right-24px.svg'}
                    alt="add"
                    className="icon"
                    onClick={props.onNextPage}
                />
                : <img
                    src={process.env.PUBLIC_URL + '/icons/keyboard_arrow_right_disabled-24px.svg'}
                    alt="add"
                    className="icon"

                />
            }

        </div>
    )
}

export default Footer