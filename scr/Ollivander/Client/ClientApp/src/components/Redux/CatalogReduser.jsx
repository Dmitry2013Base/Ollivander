import {
    ADD_ITEM_IN_COLLECTION,
    CREATE_PRODUCT,
    DELETE_CATALOG_ITEM,
    GET_CATALOG_ITEMS,
    GET_COLLECTION_ITEMS,
    GET_PRODUCTS_CATEGORIES,
    REMOVE_ITEM_FROM_COLLECTION,
} from "./Types";

const init = {

    header: '',
    count: 0,
    start: 0,
    limit: 10,
    currentPage: 1,
    categories: [],
    catalogItems: [],
    isEdit: false
}

export const CatalogReduser = (state = init, action) => {

    switch (action.type) {

        case GET_PRODUCTS_CATEGORIES: {

            return (() => {
                
                return {
                    ...state,
                    categories: action.data,
                    header: action.data[0]
                }
            })()
        }

        case GET_CATALOG_ITEMS: {

            return (() => {

                const items = action.data.map(res => {

                    return {
                        id: res.id,
                        name: res.name,
                        image: res.image,
                        price: res.price,
                        sale: res.sale,
                        rating: res.rate,
                        category: res.categoryName,
                        count: res.count
                    }
                })

                var page = window.sessionStorage.getItem("currentPage")

                return {
                    ...state,
                    catalogItems: items,
                    currentPage: Number(page),
                    header: action.header,
                    categories: action.categories,
                    count: action.count,
                    isEdit: true
                }
            })()
        }

        case CREATE_PRODUCT: {

            return (() => {

                const { product } = action

                return {
                    ...state,
                    catalogItems: [...state.catalogItems, product],
                    count: state.count + 1
                }
            })()
        }

        case DELETE_CATALOG_ITEM: {

            return (() => {

                const { id } = action
                const { catalogItems } = state
                const index = catalogItems.findIndex(res => res.id === id)

                const next = [
                    ...catalogItems.slice(0, index),
                    ...catalogItems.slice(index + 1),
                ]

                return {
                    ...state,
                    catalogItems: next,
                    count: state.count - 1
                }
            })()
        }

        case GET_COLLECTION_ITEMS: {

            return (() => {

                const items = action.data.map(res => {

                    return {
                        id: res.id,
                        name: res.name,
                        image: res.image,
                        price: res.price,
                        sale: res.sale,
                        rating: res.rate,
                        category: res.categoryName,
                        count: res.count
                    }
                })

                const collection = action.collectionName
                var head = ''

                switch (collection) {

                    case 'basket': { head = 'Корзина'; break; }
                    case 'favourites': { head = 'Избранное'; break;}
                    default: { head = ''; break; }
                }

                return {
                    ...state,
                    catalogItems: items,
                    header: head,
                    count: action.count,
                    isEdit: false
                }
            })()
        }

        case ADD_ITEM_IN_COLLECTION: {

            return (() => {

                return {
                    ...state,
                }
            })()
        }

        case REMOVE_ITEM_FROM_COLLECTION: {

            return (() => {

                const { catalogItems } = state
                const index = catalogItems.findIndex(res => res.id === action.productId)

                const next = [
                    ...catalogItems.slice(0, index),
                    ...catalogItems.slice(index + 1),
                ]

                return {
                    ...state,
                    catalogItems: next,
                    count: state.count - 1
                }
            })()
        }

        default: return state
    }
};