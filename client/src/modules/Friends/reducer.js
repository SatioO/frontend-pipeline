import { ADD_FRIEND, DELETE_FRIEND, FAVORITE_FRIEND, NEXT_PAGE, PREVIOUS_PAGE, SEARCH_FRIEND } from "./constants"

const step = 4
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
        limit: step,
        total: data.length
    },
    data,
    initialItems: data
}

export function reducer(state, action) {
    switch (action.type) {
        case ADD_FRIEND: {
            const data = [{ title: action.value, active: false }, ...state.data].sort((a, b) => b.active - a.active)
            return {
                ...state,
                page: {
                    ...state.page,
                    total: state.page.total + 1
                },
                initialItems: data,
                data,
            }
        }

        case DELETE_FRIEND: {
            const data = [
                ...state.data.slice(0, state.page.offset + action.index),
                ...state.data.slice(state.page.offset + action.index + 1)
            ]

            return {
                ...state,
                page: {
                    ...state.page,
                    offset: state.page.total - 1 === step ? 0 : state.page.offset,
                    limit: state.page.total - 1 === step ? step : state.page.limit,
                    total: state.page.total - 1
                },
                initialItems: data,
                data,
            }
        }

        case FAVORITE_FRIEND: {
            const data = state.data.map((item, i) =>
                i === state.page.offset + action.index
                    ? ({ ...item, active: !item.active })
                    : item
            ).sort((a, b) => b.active - a.active)
            
            return {
                ...state,
                initialItems: data,
                data
            }
        }

        case SEARCH_FRIEND:
            return {
                ...state,
                page: {
                    ...state.page,
                    offset: 0,
                    limit: step,
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
                    offset: state.page.offset - step,
                    limit: state.page.limit - step
                }
            }

        case NEXT_PAGE:
            return {
                ...state,
                page: {
                    ...state.page,
                    offset: state.page.offset + step,
                    limit: state.page.limit + step
                }
            }

        default:
            return state
    }
}