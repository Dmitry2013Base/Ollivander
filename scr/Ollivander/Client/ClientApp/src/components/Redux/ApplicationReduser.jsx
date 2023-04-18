import { GET_ORDER, SET_COMMENT_IN_ORDER, SET_STATUS_IN_ORDER } from "./Types";

const init = {

    id: 0,
    created: "",
    userName: "",
    productName: "",
    productPrice: 0,
    statusName: "",
    comment: "",
    userChange: "",
    dateChange: "",
    statuses: []
}

    

export const ApplicationReduser = (state = init, action) => {

    switch (action.type) {

        case GET_ORDER: {

            return (() => {

                return {
                    ...state,
                    id: action.order.id,
                    created: action.order.created,
                    userName: action.order.userName,
                    productName: action.order.productName,
                    productPrice: action.order.productPrice,
                    statusName: action.order.statusName,
                    comment: action.order.comment,
                    userChange: action.order.userChange,
                    dateChange: action.order.dateChange,
                    statuses: action.statuses,
                }
            })()
        }

        case SET_STATUS_IN_ORDER: {

            return (() => {

                return {
                    ...state,
                    statusName: action.status,
                    userChange: window.localStorage.getItem("userName")
                }
            })()
        }

        case SET_COMMENT_IN_ORDER: {

            return (() => {

                return {
                    ...state,
                    comment: action.comment,
                    userChange: window.localStorage.getItem("userName")
                }
            })()
        }

        default: return state
    }
};