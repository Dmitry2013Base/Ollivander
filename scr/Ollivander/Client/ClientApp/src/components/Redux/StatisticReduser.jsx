import { GET_STATISTIC_PAYMENT, GET_STATISTIC_USER, GET_STATISTIC_PRODUCT, GET_STATUSES } from "./Types";

const init = {

    statuses: [],
    statisticPayment: [],
    statistic2: [],
    statisticProduct: [],
}


export const StatisticReduser = (state = init, action) => {

    switch (action.type) {


        case GET_STATUSES: {

            return (() => {

                return {
                    ...state,
                    statuses: action.statuses
                }
            })()
        }

        case GET_STATISTIC_PAYMENT: {

            return (() => {

                return {
                    ...state,
                    statisticPayment: action.statisticPayment
                }
            })()
        }

        case GET_STATISTIC_USER: {

            return (() => {

                return {
                    ...state,
                    statisticUser: action.statisticUser
                }
            })()
        }

        case GET_STATISTIC_PRODUCT: {

            return (() => {

                return {
                    ...state,
                    statisticProduct: action.statisticProduct
                }
            })()
        }

        default: return state
    }
};