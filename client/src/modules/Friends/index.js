import "./index.css"
import React from "react"
import { ADD_FRIEND, DELETE_FRIEND, FAVORITE_FRIEND, SEARCH_FRIEND } from "./constants"
import { INITIAL_STATE, reducer } from "./reducer"
import Header from "./components/Header"
import AddFriend from "./components/AddFriend"
import ListView from "./components/ListView";
import SearchBox from "./components/SearchBox"

function Friends() {
    const [isSearchActive, setSearchActive] = React.useState(false)
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

    return (
        <div>
            <Header 
                onSearch={() => setSearchActive(true)}
                onAdd={() => setSearchActive(false)}/>
            <div className="search-bar">
                {!isSearchActive
                    ? <AddFriend
                        placeholder="Enter your Friend's Name"
                        onSubmit={onAddFriend}
                    />
                    : <SearchBox placeholder="Search a Friend" onChange={onSearchFriend} />
                }
            </div>
            <ListView
                data={state.data.slice(state.page.offset, state.page.limit)}
                onDelete={onDeleteFriend}
                onFavorite={onFavoriteFriend}
            />
        </div>
    )
}

export default Friends