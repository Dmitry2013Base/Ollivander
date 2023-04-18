import { publicRoutes } from "../Store/Routes";
import { GET_NEXT_ROUTES } from "./Types";


const init = {

    userRoles: [],
    routes: [...publicRoutes]
}


export const RoutesReduser = (state = init, action) => {

    switch (action.type) {

        case GET_NEXT_ROUTES: {

            return (() => {

                const roles = action.data
                var routes = []

                if (roles.length !== 0) {

                    [...publicRoutes].forEach(e => {

                        roles.forEach(i => {

                            if (e.roles.includes(i) || e.roles.length === 0) {

                                routes.push(e)
                            }
                        })
                    })

                } else {

                    routes = state.routes.filter(e => e.roles.length === 0)
                }

                return {
                    ...state,
                    routes: routes,
                    userRoles: roles
                }
            })()
        }

        default: return state
    }
};
