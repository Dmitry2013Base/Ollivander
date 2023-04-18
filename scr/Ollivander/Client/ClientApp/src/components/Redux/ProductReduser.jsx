import {
    ADD_PARAM_FOR_PRODUCT,
    GET_PRODUCT,
    PARAM_REMOVE,
    PARAM_TITLE_UPDATE,
    PARAM_VALUE_UPDATE,
    PRODUCT_IS_UPDATE,
    PRODUCT_UPDATE_CATEGORY,
    PRODUCT_UPDATE_COUNT,
    PRODUCT_UPDATE_DESCRIPTION,
    PRODUCT_UPDATE_IMAGE,
    PRODUCT_UPDATE_NAME,
    PRODUCT_UPDATE_PRICE,
    PRODUCT_UPDATE_SALE,
    SET_IS_PRODUCT_UPDATE,
    UPDATE_PRODUCT
} from "./Types";

const init = {

    product: {
        id: 0,
        name: "",
        description: "",
        image: "",
        categoryName: "",
        infos: [],
        price: 0,
        sale: 0,
        count: 0,
        rate: 0,
    },
    isUpdate: false,
    counter: -1
}


export const ProductReduser = (state = init, action) => {

    switch (action.type) {

        case SET_IS_PRODUCT_UPDATE: {

            return (() => {

                return {
                    ...state,
                    isUpdate: !state.isUpdate,
                }
            })()
        }

        case GET_PRODUCT: {

            return (() => {

                return {
                    ...state,
                    product: action.data,
                    isUpdate: action.isUpdate
                }
            })()
        }

        case PRODUCT_UPDATE_NAME: {

            return (() => {

                return {
                    ...state,
                    product: {
                        ...state.product,
                        name: action.name
                    },
                }
            })()
        }

        case PRODUCT_UPDATE_DESCRIPTION: {

            return (() => {

                return {
                    ...state,
                    product: {
                        ...state.product,
                        description: action.description
                    },
                }
            })()
        }

        case PRODUCT_UPDATE_IMAGE: {

            return (() => {

                return {
                    ...state,
                    product: {
                        ...state.product,
                        image: action.image
                    },
                }
            })()
        }

        case PRODUCT_UPDATE_CATEGORY: {

            return (() => {

                return {
                    ...state,
                    product: {
                        ...state.product,
                        categoryName: action.categoryName
                    },
                }
            })()
        }

        case PRODUCT_UPDATE_PRICE: {

            return (() => {

                return {
                    ...state,
                    product: {
                        ...state.product,
                        price: action.price
                    },
                }
            })()
        }

        case PRODUCT_UPDATE_SALE: {

            return (() => {

                return {
                    ...state,
                    product: {
                        ...state.product,
                        sale: action.sale
                    },
                }
            })()
        }

        case PRODUCT_UPDATE_COUNT: {

            return (() => {

                return {
                    ...state,
                    product: {
                        ...state.product,
                        count: action.count
                    },
                }
            })()
        }

        case PARAM_TITLE_UPDATE: {

            return (() => {

                const { id } = action
                const { text } = action
                const index = state.product.infos.findIndex(res => res.id === id)

                const next = [
                    ...state.product.infos.slice(0, index),
                    { id: id, title: text, value: state.product.infos[index].value },
                    ...state.product.infos.slice(index + 1),
                ]
               
                var copy = Object.assign({}, state.product);
                copy.infos = next

                return {
                    ...state,
                    product: copy
                }
            })()
        }

        case PARAM_VALUE_UPDATE: {

            return (() => {

                const { id } = action
                const { text } = action
                const index = state.product.infos.findIndex(res => res.id === id)

                const next = [
                    ...state.product.infos.slice(0, index),
                    { id: id, title: state.product.infos[index].title, value: text },
                    ...state.product.infos.slice(index + 1),
                ]

                var copy = Object.assign({}, state.product);
                copy.infos = next

                return {
                    ...state,
                    product: copy
                }
            })()
        }

        case PARAM_REMOVE: {

            return (() => {

                const { id } = action
                const index = state.product.infos.findIndex(res => res.id === id)

                const next = [
                    ...state.product.infos.slice(0, index),
                    ...state.product.infos.slice(index + 1),
                ]

                var copy = Object.assign({}, state.product);
                copy.infos = next

                return {
                    ...state,
                    product: copy,
                }
            })()
        }

        case ADD_PARAM_FOR_PRODUCT: {

            return (() => {

                var copyProduct = Object.assign({}, state.product);

                copyProduct.infos = [...state.product.infos, { id: state.counter, title: "", value: "" }]

                return {
                    ...state,
                    product: copyProduct,
                    counter: state.counter - 1,
                }
            })()
        }

        case PRODUCT_IS_UPDATE: {

            return (() => {

                const { isUpdate } = action

                return {
                    ...state,
                    product: state.product,
                    isUpdate: isUpdate
                }
            })()


        }

        case UPDATE_PRODUCT: {

            return (() => {

                return {
                    ...state,
                    product: action.data,
                }
            })()
        }

        default: return state
    }
};