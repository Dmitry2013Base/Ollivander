import { GET_ORDERS, SET_ORDER } from "./Types";

const init = {

    orders: [],
    statuses: [],
}


export const OrdersReduser = (state = init, action) => {

    switch (action.type) {

        case GET_ORDERS: {

            return (() => {

                return {
                    ...state,
                    orders: action.orders,
                    statuses: action.statuses
                }
            })()
        }

        case SET_ORDER: {

            return (() => {

                var next = state.orders

                if (action.updateStatus) {

                    const { orders } = state
                    const index = orders.findIndex(res => res.id === action.order.id)

                    next = [
                        ...orders.slice(0, index),
                        ...orders.slice(index + 1),
                    ]
                }

                return {
                    ...state,
                    orders: next,
                }
            })()
        }

        default: return state
    }
};