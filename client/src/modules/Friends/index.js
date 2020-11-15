import "./index.css"
import React from "react"
import { ADD_FRIEND, DELETE_FRIEND, FAVORITE_FRIEND, NEXT_PAGE, PREVIOUS_PAGE, SEARCH_FRIEND } from "./constants"
import { INITIAL_STATE, reducer } from "./reducer"
import Header from "./components/Header"
import AddFriend from "./components/AddFriend"
import ListView from "./components/ListView";
import Footer from "./components/Footer"

function Friends() {
    const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE)

    function onAddFriend(value) {
        dispatch({ type: ADD_FRIEND, value })
    }

    function onDeleteFriend(index) {
        if (window.confirm("Are you sure you want to delete?")) {
            dispatch({ type: DELETE_FRIEND, index })
        }
    }

    function onFavoriteFriend(index) {
        dispatch({ type: FAVORITE_FRIEND, index })
    }

    function onSearchFriend(query) {
        dispatch({ type: SEARCH_FRIEND, query })
    }

    function onPreviousPage() {
        dispatch({ type: PREVIOUS_PAGE })
    }

    function onNextPage() {
        dispatch({ type: NEXT_PAGE })
    }

    return (
        <div>
            <Header onChange={onSearchFriend} />
            <div className="search-bar">
                <AddFriend
                    placeholder="Enter your Friend's Name"
                    onSubmit={onAddFriend}
                />
            </div>
            <ListView
                data={state.data.slice(state.page.offset, state.page.limit)}
                onDelete={onDeleteFriend}
                onFavorite={onFavoriteFriend}
            />
            <Footer
                page={state.page}
                onNextPage={onNextPage} 
                onPreviousPage={onPreviousPage} 
            />
        </div>
    )
}

export default Friends