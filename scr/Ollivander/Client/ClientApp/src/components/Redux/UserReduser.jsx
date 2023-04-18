import { ADD_ITEM_IN_COLLECTION, GET_COUNT_COLLECTION_ITEMS, LOGIN, LOGIN_ERROR, LOGOUT, REGISTRATION, REMOVE_ITEM_FROM_COLLECTION } from "./Types";

const init = {

    collections: [
        { name: "basket", count: 0},
        { name: "favourites", count: 0},
    ],
    counter: 0,
    loginError: '',
}


export const UserReduser = (state = init, action) => {

    switch (action.type) {

        case LOGIN: {

            return (() => {

                const user = action.data

                window.localStorage.setItem("userId", user.userId)
                window.localStorage.setItem("userName", user.userName)
                return {
                    ...state,
                    collections: action.collections,
                    counter: state.counter + 1,
                    loginError: ''
                }
            })()
        }

        case GET_COUNT_COLLECTION_ITEMS: {

            return (() => {

                return {
                    ...state,
                    collections: action.collections
                }
            })()
        }

        case ADD_ITEM_IN_COLLECTION: {

            return (() => {

                const { collections } = state
                const index = collections.findIndex(res => res.name === action.collectionName)

                const next = [
                    ...collections.slice(0, index),
                    { name: action.collectionName, count: collections[index].count + 1 },
                    ...collections.slice(index + 1),
                ]

                return {
                    ...state,
                    collections: next
                }
            })()
        }

        case REMOVE_ITEM_FROM_COLLECTION: {

            return (() => {

                const { collections } = state
                const index = collections.findIndex(res => res.name === action.collectionName)

                const next = [
                    ...collections.slice(0, index),
                    { name: action.collectionName, count: collections[index].count - 1 },
                    ...collections.slice(index + 1),
                ]

                return {
                    ...state,
                    collections: next,
                }
            })()
        }

        case REGISTRATION: {

            return (() => {

                return {
                    ...state,
                }
            })()
        }

        case LOGOUT: {

            return (() => {

                window.localStorage.removeItem("AccessToken")
                window.localStorage.removeItem("RefrechToken")
                window.localStorage.removeItem("userId")
                window.localStorage.removeItem("userName")
                window.localStorage.removeItem("time")
                
                return {
                    ...state,
                    counter: state.counter - 1
                }
            })()
        }

        case LOGIN_ERROR: {

            return (() => {

                return {
                    ...state,
                    loginError: action.message
                }
            })()
        }

        default: return state
    }
};