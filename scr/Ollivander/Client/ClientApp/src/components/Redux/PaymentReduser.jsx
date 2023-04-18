import { GET_PAYMENT, ORDER_ERROR } from "./Types";

const init = {

    items: [],
    orderError: '',
}


export const PaymentReduser = (state = init, action) => {

    switch (action.type) {

        case GET_PAYMENT: {

            return (() => {

                const items = action.items.map(res => {

                    return {
                        id: res.id,
                        name: res.name,
                        image: res.image,
                        price: res.price,
                    }
                })

                return {
                    ...state,
                    items: items,
                    orderError: '',
                }
            })()
        }

        case ORDER_ERROR: {

            return (() => {

                return {
                    ...state,
                    orderError: action.message,
                }
            })()
        }

        default: return state
    }
};