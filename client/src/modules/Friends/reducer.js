import { ADD_FRIEND, DELETE_FRIEND, FAVORITE_FRIEND, NEXT_PAGE, PREVIOUS_PAGE, SEARCH_FRIEND } from "./constants"

const data = [
    {
        title: "Vaibhav Satam",
        active: false
    },
    {
        title: "Aman Thakur",
        active: false
    },
    {
        title: "Abhishek Dubey",
        active: false
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
        limit: 4,
        total: data.length
    },
    data,
    initialItems: data
}

export function reducer(state, action) {
    switch (action.type) {
        case ADD_FRIEND:
            return { 
                ...state,
                page: {
                    ...state.page,
                    total: state.page.total + 1
                }, 
                data: [{ title: action.value, active: false }, ...state.data].sort((a, b) => b.active - a.active)
            }

        case DELETE_FRIEND:
            return {
                ...state,
                page: {
                    ...state.page,
                    offset: state.page.total - 1 === 4 ? 0 : state.page.offset,
                    limit: state.page.total - 1 === 4 ? 4 : state.page.limit,
                    total: state.page.total - 1
                }, 
                data: [
                    ...state.data.slice(0, state.page.offset + action.index),
                    ...state.data.slice(state.page.offset + action.index + 1)
                ]
            }

        case FAVORITE_FRIEND:
            return {
                ...state, data: state.data.map((item, i) =>
                    i === state.page.offset + action.index
                        ? ({ ...item, active: !item.active })
                        : item
                ).sort((a, b) => b.active - a.active)
            }

        case SEARCH_FRIEND:
            return {
                ...state, 
                page: {
                    ...state.page,
                    offset: 0,
                    limit: 4,
                    total: data.length
                },
                data: state.initialItems.filter(
                    item =>
                        item.title
                            .toLowerCase()
                            .includes(action.query.toLowerCase()))
            }

        case PREVIOUS_PAGE:
            return {
                ...state, 
                page: {
                    ...state.page,
                    offset: state.page.offset - 4,
                    limit: state.page.limit - 4
                }
            }

        case NEXT_PAGE:
            return {
                ...state, 
                page: {
                    ...state.page,
                    offset: state.page.offset + 4,
                    limit: state.page.limit + 4
                }
            }

        default:
            return state
    }
}