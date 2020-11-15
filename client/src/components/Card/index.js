import "./index.css"
import React, { useReducer } from "react"
import CardHeader from "../CardHeader"
import FriendsList from "../FriendsList"
import AddFriend from "../AddFriend"
import SearchBox from "../SearchBox"
import { ADD_FRIEND, DELETE_FRIEND, FAVORITE_FRIEND, SEARCH_FRIEND } from "../../constants"
import { friendsReducer, FRIENDS_STATE } from "../../reducers/friends"

function Card() {
    const [state, dispatch] = useReducer(friendsReducer, FRIENDS_STATE)
    const [isSearchActive, setSearchActive] = React.useState(false)

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

    function toggleSearch() {
        setSearchActive(!isSearchActive)
    }

    return (
        <div className="card">
            <CardHeader onSearchClick={toggleSearch} />
            {!isSearchActive
                ? <AddFriend
                    placeholder="Enter your Friend's Name"
                    onSubmit={onAddFriend}
                />
                : <SearchBox placeholder="Search a Friend" onChange={onSearchFriend} />
            }
            <FriendsList
                data={state.data.slice(state.page.offset, state.page.limit)}
                onDelete={onDeleteFriend}
                onFavorite={onFavoriteFriend}
            />
        </div>
    )
}

export default Card