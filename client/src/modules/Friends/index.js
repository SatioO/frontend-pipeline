import "./index.css"
import React from "react"
import { ADD_FRIEND, DELETE_FRIEND, FAVORITE_FRIEND, NEXT_PAGE, PREVIOUS_PAGE, SEARCH_FRIEND } from "./constants"
import { INITIAL_STATE, reducer } from "./reducer"
import Header from "./components/Header"
import AddFriend from "./components/AddFriend"
import ListView from "./components/ListView";
import Footer from "./components/Footer"

function Friends() {
    const [query, setQuery] = React.useState('')
    const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE)

    const items = React.useMemo(() => state.data.filter(item => item.title
        .toLowerCase()
        .includes(query.toLowerCase())), [query, state.data])

    function onAddFriend(value) {
        dispatch({ type: ADD_FRIEND, value })
    }

    function onDeleteFriend(item, index) {
        dispatch({ type: DELETE_FRIEND, item, index })
    }

    function onFavoriteFriend(item, index) {
        dispatch({ type: FAVORITE_FRIEND, item, index })
    }

    function onSearchFriend(query) {
        setQuery(query)
        dispatch({ type: SEARCH_FRIEND, query })
    }

    function onPreviousPage() {
        dispatch({ type: PREVIOUS_PAGE })
    }

    function onNextPage() {
        dispatch({ type: NEXT_PAGE })
    }

    return (
        <>
            <Header onChange={onSearchFriend} />
            <AddFriend
                placeholder="Enter your Friend's Name"
                onSubmit={onAddFriend}
            />
            <ListView
                data={items.slice(state.page.offset, state.page.limit)}
                onDelete={onDeleteFriend}
                onFavorite={onFavoriteFriend}
            />
            <Footer
                page={{ ...state.page, total: items.length }}
                onNextPage={onNextPage}
                onPreviousPage={onPreviousPage}
            />
        </>
    )
}

export default Friends