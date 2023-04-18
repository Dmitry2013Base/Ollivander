import { ADD_USER_ROLE, CREATE_ROLE, GET_ALL_ROLES, GET_ROLES, GET_USERS, REMOVE_ROLE, REMOVE_USER_ROLE } from "./Types";

const init = {

    items: [],
    users: [],
    usersCopy: [],
    allRoles: [],
    roles: [],
    currentUser: null
}


export const DevelopmentReduser = (state = init, action) => {

    switch (action.type) {

        case GET_USERS: {

            return (() => {

                const items = action.users.map(res => {

                    return {
                        id: res.id,
                        userName: res.userName,
                    }
                })

                return {
                    ...state,
                    users: items,
                    usersCopy: items
                }
            })()
        }

        case GET_ALL_ROLES: {

            return (() => {

                const items = action.allRoles.map(res => {

                    return {
                        id: res.id,
                        roleName: res.name,
                    }
                })

                return {
                    ...state,
                    allRoles: items
                }
            })()
        }

        case GET_ROLES: {

            return (() => {

                return {
                    ...state,
                    roles: action.roles,
                    currentUser: action.currentUser
                }
            })()
        }

        case CREATE_ROLE: {

            return (() => {

                return {
                    ...state,
                    allRoles: [...state.allRoles, { roleName: action.roleName }]
                }
            })()
        }

        case REMOVE_ROLE: {

            return (() => {

                const { allRoles } = state
                const index = allRoles.findIndex(res => res.roleName === action.roleName)

                const next = [
                    ...allRoles.slice(0, index),
                    ...allRoles.slice(index + 1),
                ]

                return {
                    ...state,
                    allRoles: next,
                }
            })()
        }

        case ADD_USER_ROLE: {

            return (() => {

                return {
                    ...state,
                    roles: [...state.roles, action.roleName]
                }
            })()
        }

        case REMOVE_USER_ROLE: {

            return (() => {

                const { roles } = state
                const index = roles.indexOf(action.roleName)

                const next = [
                    ...roles.slice(0, index),
                    ...roles.slice(index + 1),
                ]

                return {
                    ...state,
                    roles: next,
                }
            })()
        }

        default: return state
    }
};