import { ADD_FRIEND, DELETE_FRIEND, FAVORITE_FRIEND, SEARCH_FRIEND } from "./constants"

const data = [
    {
        title: "Vaibhav Satam",
        active: true
    },
    {
        title: "Ronak Shah",
        active: false
    },
    {
        title: "Rohit Natekar",
        active: false
    },
    {
        title: "Ronak Ruparel",
        active: false
    }
]

export const INITIAL_STATE = {
    page: {
        offset: 0,
        limit: 4
    },
    data,
    initialItems: data
}

export function reducer(state, action) {
    switch (action.type) {
        case ADD_FRIEND:
            return { ...state, data: [{ title: action.value, active: false }, ...state.data] }

        case DELETE_FRIEND:
            return {
                ...state, data: [
                    ...state.data.slice(0, action.index),
                    ...state.data.slice(action.index + 1)
                ]
            }

        case FAVORITE_FRIEND:
            return {
                ...state, data: state.data.map((item, i) =>
                    i === action.index
                        ? ({ ...item, active: !item.active })
                        : item
                ).sort((a, b) => b.active - a.active)
            }

        case SEARCH_FRIEND:
            return {
                ...state, data: state.initialItems.filter(
                    item =>
                        item.title
                            .toLowerCase()
                            .includes(action.query.toLowerCase()))
            }

        default:
            return state
    }
}