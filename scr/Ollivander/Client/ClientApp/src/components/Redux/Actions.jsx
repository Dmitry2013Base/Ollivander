import {
    addItemInCollectionAsync,
    createCommentsAsync,
    createOrderAsync,
    createRoleAsync,
    deleteCatalogItemAsync,
    getAllRolesAsync,
    getCatalogItemByIdAsync,
    getCatalogItemsAsync,
    getCategoriesCatalogItemsAsync,
    getCollectionItemsAsync,
    getCommentsAsync,
    getCountCatalogItemsAsync,
    getCountCollectionItemsAsync,
    getOrderAsync,
    getOrdersAsync,
    getPaymentAsync,
    getRolesAsync,
    getStatUsersAsync,
    getStatProductAsync,
    getStatPaymentAsync,
    getStatusesAsync,
    getUserRolesAsync,
    getUsersAsync,
    loginAsync,
    logoutAsync,
    registrationAsync,
    removeItemFromCollectionAsync,
    removeRoleAsync,
    updateOrderAsync,
    updateProductAsunc,
    addOrRemoveUserRoleAsync,
    passwordChangeAsync
} from "../Api/Api"
import {
    ADD_ITEM_IN_COLLECTION,
    ADD_PARAM_FOR_PRODUCT,
    ALERT_BAD_OFF,
    ALERT_BAD_ON,
    ALERT_OK_OFF,
    ALERT_OK_ON,
    COMMENT_ERROR,
    CREATE_COMMENT,
    CREATE_ROLE,
    DELETE_CATALOG_ITEM,
    GET_ALL_ROLES,
    GET_CATALOG_ITEMS,
    GET_COLLECTION_ITEMS,
    GET_COMMENTS,
    GET_COUNT_COLLECTION_ITEMS,
    GET_NEXT_ROUTES,
    GET_ORDER,
    GET_ORDERS,
    GET_PAYMENT,
    GET_PRODUCT,
    GET_PRODUCTS_CATEGORIES,
    GET_ROLES,
    GET_STATISTIC_PAYMENT,
    GET_STATISTIC_USER,
    GET_STATISTIC_PRODUCT,
    GET_STATUSES,
    GET_USERS,
    LOADER_OFF,
    LOADER_ON,
    LOGIN,
    LOGIN_ERROR,
    LOGOUT,
    ORDER_ERROR,
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
    REGISTRATION,
    REMOVE_ITEM_FROM_COLLECTION,
    REMOVE_ROLE,
    SET_COMMENT_IN_ORDER,
    SET_IS_PRODUCT_UPDATE,
    SET_ORDER,
    SET_STATUS_IN_ORDER,
    UPDATE_PRODUCT,
    VISIBLE_OFF,
    VISIBLE_ON,
    ADD_USER_ROLE,
    REMOVE_USER_ROLE,
    SET_ARRAY,
    SEARCH_IN_ARRAY,
} from "./Types"


//loader

export const loaderOn = () => { return { type: LOADER_ON } }

export const loaderOff = () => { return { type: LOADER_OFF } }

export const visibleOn = () => { return { type: VISIBLE_ON } }

export const visibleOff = () => { return { type: VISIBLE_OFF } }

//alert

export const alertOkOn = () => { return { type: ALERT_OK_ON } }

export const alertOkOff = () => { return { type: ALERT_OK_OFF } }

export const alertBadOn = () => { return { type: ALERT_BAD_ON } }

export const alertBadOff = () => { return { type: ALERT_BAD_OFF } }

//collection

export const getCollectionItems = (collectionName, start, limit, userId) => {

    return async dispatch => {

        dispatch(visibleOff())
        dispatch(loaderOn())

        try {

            const data = await getCollectionItemsAsync(collectionName, start, limit, userId)
            const count = await getCountCollectionItemsAsync(userId, collectionName)

            dispatch({
                type: GET_COLLECTION_ITEMS,
                data,
                collectionName,
                count
            })


        } catch (e) {

            console.log(e)
        } finally {

            dispatch(loaderOff())
            dispatch(visibleOn())
        }
    }
}

export const addItemInCollection = (userId, collectionName, productId) => {

    return async dispatch => {

        try {

            await addItemInCollectionAsync(userId, collectionName, productId)

            dispatch({
                type: ADD_ITEM_IN_COLLECTION,
                collectionName
            })
            dispatch(alertOkOn())
        } catch (e) {

            dispatch(alertBadOn())
        } finally {

            window.setTimeout(() => {

                dispatch(alertOkOff())
                dispatch(alertBadOff())
            }, 2000)
        }
    }
}

export const removeItemFromCollection = (userId, collectionName, productId) => {

    return async dispatch => {

        try {
            await removeItemFromCollectionAsync(userId, collectionName, productId)

            dispatch({
                type: REMOVE_ITEM_FROM_COLLECTION,
                productId,
                collectionName
            })
            dispatch(alertOkOn())
        } catch (e) {

            dispatch(alertBadOn())
        } finally {

            window.setTimeout(() => {

                dispatch(alertOkOff())
                dispatch(alertBadOff())
            }, 2000)
        }
    }
}

export const getCountCollectionItems = (userId) => {

    return async dispatch => {

        try {

            const countBasketItem = await getCountCollectionItemsAsync(userId, "basket")
            const countFavouritesItem = await getCountCollectionItemsAsync(userId, "favourites")

            dispatch({
                type: GET_COUNT_COLLECTION_ITEMS,
                collections: [
                    { name: "basket", count: countBasketItem },
                    { name: "favourites", count: countFavouritesItem },
                ],
            })
        } catch (e) {

            console.log(e)
        }
    }
}

//product

export const setIsUpdateProduct = () => { return { type: SET_IS_PRODUCT_UPDATE } }

export const addParamForProduct = () => { return { type: ADD_PARAM_FOR_PRODUCT } }

export const paramTitleUpdate = (id, text) => { return { type: PARAM_TITLE_UPDATE, id, text } }

export const paramValueUpdate = (id, text) => { return { type: PARAM_VALUE_UPDATE, id, text } }

export const paramRemove = (id) => { return { type: PARAM_REMOVE, id } }

export const productUpdateName = (name) => { return { type: PRODUCT_UPDATE_NAME, name} }

export const productUpdateDescription = (description) => { return { type: PRODUCT_UPDATE_DESCRIPTION, description } }

export const productUpdateImage = (image) => { return { type: PRODUCT_UPDATE_IMAGE, image } }

export const productUpdateCategory = (categoryName) => { return { type: PRODUCT_UPDATE_CATEGORY, categoryName } }

export const productUpdatePrice = (price) => { return { type: PRODUCT_UPDATE_PRICE, price } }

export const productUpdateSale = (sale) => { return { type: PRODUCT_UPDATE_SALE, sale } }

export const productUpdateCount = (count) => { return { type: PRODUCT_UPDATE_COUNT, count } }

export const productIsUpdate = (isUpdate) => { return { type: PRODUCT_IS_UPDATE, isUpdate } }

export const getProduct = (id) => {

    return async dispatch => {

        dispatch(visibleOff())
        dispatch(loaderOn())
        
        try {
            const data = await getCatalogItemByIdAsync(id)

            if (data !== '') {

                dispatch({
                    type: GET_PRODUCT,
                    data,
                    isUpdate: false
                })
            }
            else {
                dispatch({
                    type: GET_PRODUCT,
                    data: {
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
                    isUpdate: true
                })
            }
        } catch (e) {

            console.log(e)
        } finally {

            dispatch(loaderOff())
            dispatch(visibleOn())
        }
    }
}

export const updateProduct = (id, product, goHome) => {

    return async dispatch => {
        try {

            product.infos.map(el => {
                if (el.id < 0) {
                    return el.id = 0
                }
                return el.id
            })

            const data = await updateProductAsunc(id, product)

            dispatch({
                type: UPDATE_PRODUCT,
                data
            })
            dispatch(alertOkOn())

            if (id === 0) {

                goHome()
            }
        } catch (e) {

            dispatch(alertBadOn())
            console.log(e)
        } finally {

            window.setTimeout(() => {

                dispatch(alertOkOff())
                dispatch(alertBadOff())
            }, 2000)
        }
    }
}

//comments

export const getComments = (productId) => {

    return async dispatch => {

        try {

            const data = await getCommentsAsync(productId)

            dispatch({
                type: GET_COMMENTS,
                data: data,
            })
        } catch (e) {

            console.log(e)
        }
    }
}

export const createComment = (productId, comment, setVisible) => {

    return async dispatch => {

        try {
            const response = await createCommentsAsync(productId, comment)

            if (typeof response.data === 'undefined') {

                throw ""
            }

            dispatch({
                type: CREATE_COMMENT,
                data: response.data,
            })
            dispatch(alertOkOn())
            setVisible(false)
        }
        catch (e) {

            dispatch(alertBadOn())
            dispatch(commentError("Комментарий уже создан"))
            setVisible(true)
            
        } finally {

            window.setTimeout(() => {

                dispatch(alertOkOff())
                dispatch(alertBadOff())
            }, 2000)
        }
    }
}

export const commentError = (message) => { return { type: COMMENT_ERROR, message } }

//catalog

export const getProductCategories = () => {

    return async dispatch => {

        try {
            const data = await getCategoriesCatalogItemsAsync()

            dispatch({
                type: GET_PRODUCTS_CATEGORIES,
                data
            })
        } catch (e) {

            console.log(e)
        }
    }
}

export const getCatalogItems = (category, start, limit) => {

    return async dispatch => {

        dispatch(visibleOff())
        dispatch(loaderOn())
        try {

            const data = await getCatalogItemsAsync(category, start, limit)
            const categories = await getCategoriesCatalogItemsAsync()
            const count = await getCountCatalogItemsAsync(category)

            var header = category

            if (category === 'default') {

                header = categories[0]
            }

            window.sessionStorage.setItem("currentPage", Math.ceil(start + limit) / limit)

            dispatch({
                type: GET_CATALOG_ITEMS,
                data,
                header,
                categories,
                count,
            })
        } catch (e) {

            console.log(e)
        } finally {

            dispatch(loaderOff())
            dispatch(visibleOn())
        }
    }
}

export const deleteCatalogItem = (id) => {

    return async dispatch => {

        try {
            const response = await deleteCatalogItemAsync(id)

            if (response.status !== 204) {

                dispatch({
                    type: DELETE_CATALOG_ITEM,
                    id
                })

                dispatch(alertOkOn())
            } else {

                dispatch(alertBadOn())
            }
        } catch (e) {

            dispatch(alertBadOn())
        } finally {

            window.setTimeout(() => {

                dispatch(alertOkOff())
                dispatch(alertBadOff())
            }, 2000)
        }
    }
}

//user

export const loginError = (message) => { return { type: LOGIN_ERROR, message } }

export const login = (user, setVisible) => {

    return async dispatch => {

        try {
            const data = await loginAsync(user)

            if (data === '') {

                dispatch(loginError("Неверный логин или пароль"))
                setVisible(true)
                return
            }

            window.localStorage.setItem("AccessToken", data.accessToken)
            window.localStorage.setItem("RefrechToken", data.refrechToken)
            window.localStorage.setItem("time", data.time)

            const countBasketItem = await getCountCollectionItemsAsync(data.userId, "basket")
            const countFavouritesitem = await getCountCollectionItemsAsync(data.userId, "favourites")

            dispatch({
                type: LOGIN,
                data,
                collections: [
                    { name: "basket", count: countBasketItem },
                    { name: "favourites", count: countFavouritesitem },
                ],
            })
            setVisible(false)
        } catch (e) {

            console.log(e)
        } 
    }
}

export const registration = (user, setVisible) => {

    return async dispatch => {

        try {
            await registrationAsync(user)

            dispatch({
                type: REGISTRATION,
            })

            dispatch(alertOkOn())
            setVisible(false)
        } catch (e) {

            dispatch(alertBadOn())
            setVisible(true)
            console.log(e)
        } finally {

            window.setTimeout(() => {

                dispatch(alertBadOff())
                dispatch(alertOkOff())
            }, 2000)
        }
    }
}

export const logout = () => {

    return async dispatch => {

        try {

            await logoutAsync(window.localStorage.getItem("userId"))

            dispatch({
                type: LOGOUT,
            })
        } catch (e) {

            dispatch(alertBadOn())
            console.log(e)
        } finally {

            window.setTimeout(() => {

                dispatch(alertBadOff())
            }, 2000)
        }
    }
}

export const getUserRoles = (id = null, userId = null) => {

    return async dispatch => {

        dispatch(loaderOn())
        try {

            var data = []

            if (id !== null) {

                var response = await getUserRolesAsync(id, userId)
                data = response.roles
                dispatch(getCountCollectionItems(userId))
            }

            dispatch({
                type: GET_NEXT_ROUTES,
                data
            })
        } catch (e) {

            console.log(e)
        } finally {

           dispatch(loaderOff())
        }
    }
}

export const passwordChange = (userUp, setVisible) => {

    return async dispatch => {
        try {

            const data = await passwordChangeAsync(userUp)
            setVisible(false)
            dispatch(alertOkOn())
        } catch (e) {

            dispatch(alertBadOn())
            setVisible(true)
        } finally {

            window.setTimeout(() => {

                dispatch(alertBadOff())
                dispatch(alertOkOff())
            }, 2000)
        }
    }
}

//payment

export const updateOrderStatus = (status) => { return { type: SET_STATUS_IN_ORDER, status } }

export const updateOrderComment = (comment) => { return { type: SET_COMMENT_IN_ORDER, comment } }

export const orderError = (message) => { return { type: ORDER_ERROR, message } }

export const getOrders = (userName, status = "default") => {

    return async dispatch => {

        dispatch(visibleOff())
        dispatch(loaderOn())
        try {

            if (userName === null || typeof userName == 'undefined') {

                userName = ''
            }

            const statuses = await getStatusesAsync()
            const orders = await getOrdersAsync(status, userName)

            dispatch({
                type: GET_ORDERS,   
                orders,
                statuses,
            })
        } catch (e) {

            console.log(e)
        } finally {

            dispatch(loaderOff())
            dispatch(visibleOn())
        }
    }
}

export const getOrder = (id, setVisible) => {

    return async dispatch => {

        dispatch(loaderOn())
        try {

            const statuses = await getStatusesAsync()
            const order = await getOrderAsync(id)

            dispatch({
                type: GET_ORDER,
                order,
                statuses,
            })
            setVisible(true)
        } catch (e) {

            dispatch(alertBadOn())
            setVisible(false)
        } finally {

            dispatch(loaderOff())
            window.setTimeout(() => {

                dispatch(alertBadOff())
            }, 2000)
        }
    }
}

export const createOrder = (orderBuy) => {

    return async dispatch => {

        dispatch(loaderOn())
        try {

            await createOrderAsync(orderBuy)
            dispatch(alertOkOn())

        } catch (e) {

            dispatch(alertBadOn())
        } finally {

            dispatch(loaderOff())
            window.setTimeout(() => {

                dispatch(alertOkOff())
                dispatch(alertBadOff())
            }, 2000)
        }
    }
}

export const getPayment = (products) => {

    return async dispatch => {

        dispatch(loaderOn())
        try {
            const items = await getPaymentAsync(products)

            dispatch({
                type: GET_PAYMENT,
                items
            })

        } catch (e) {

            dispatch(alertBadOn())
        } finally {

            dispatch(loaderOff())
            window.setTimeout(() => {

                dispatch(alertBadOff())
            }, 2000)
        }
    }
}

export const updateOrder = (order, setVisible) => {

    return async dispatch => {

        try {
            const data = await updateOrderAsync(order)

            dispatch({
                type: SET_ORDER,
                order,
                updateStatus: data
            })
            setVisible(false)
            dispatch(alertOkOn())
        } catch (e) {

            setVisible(true)
            dispatch(alertBadOn())
        } finally {

            window.setTimeout(() => {

                dispatch(alertBadOff())
                dispatch(alertOkOff())
            }, 2000)
        } 
    }
}

//development

export const getStatuses = () => {

    return async dispatch => {

        try {
            const statuses = await getStatusesAsync()

            dispatch({
                type: GET_STATUSES,
                statuses
            })
        } catch (e) {

            console.log(e)
        }
    }
}

export const getUsers = () => {

    return async dispatch => {

        dispatch(loaderOn())
        try {
            const users = await getUsersAsync()

            dispatch({
                type: GET_USERS,
                users
            })
        } catch (e) {

            console.log(e)
        } finally {

            dispatch(loaderOff())
        }
    }
}

export const getAllRoles = () => {

    return async dispatch => {

        dispatch(loaderOn())
        try {
            const allRoles = await getAllRolesAsync()

            dispatch({
                type: GET_ALL_ROLES,
                allRoles
            })
        } catch (e) {

            console.log(e)
        } finally {

            dispatch(loaderOff())
        }
    }
}

export const getRoles = (currentUser) => {

    return async dispatch => {

        dispatch(loaderOn())
        try {
            const data = await getRolesAsync(window.localStorage.getItem("userId"), currentUser.id)

            dispatch({
                type: GET_ROLES,
                roles: data.roles,
                currentUser
            })
        } catch (e) {

            dispatch(alertBadOn())
            console.log(e)
        } finally {

            dispatch(loaderOff())
            window.setTimeout(() => {

                dispatch(alertBadOff())
            }, 2000)
        }
    }
}

export const createRole = (roleName) => {

    return async dispatch => {

        dispatch(loaderOn())
        try {
            await createRoleAsync(roleName)

            dispatch({
                type: CREATE_ROLE,
                roleName
            })
            dispatch(alertOkOn())
        } catch (e) {

            dispatch(alertBadOn())
            console.log(e)
        } finally {

            dispatch(loaderOff())
            window.setTimeout(() => {
                dispatch(alertOkOff())
                dispatch(alertBadOff())
            }, 2000)
        }
    }
}

export const addOrRemoveUserRole = (userId, roleName, addOrRemove) => {

    return async dispatch => {

        dispatch(loaderOn())
        try {

            const userUpdate = {
                userId,
                roleName,
                addOrRemove
            }

            await addOrRemoveUserRoleAsync(userUpdate)

            if (addOrRemove) {

                dispatch({
                    type: ADD_USER_ROLE,
                    roleName
                })
            } else {

                dispatch({
                    type: REMOVE_USER_ROLE,
                    roleName
                })
            }
            dispatch(alertOkOn())
        } catch (e) {

            dispatch(alertBadOn())
            console.log(e)
        } finally {

            dispatch(loaderOff())
            window.setTimeout(() => {
                dispatch(alertOkOff())
                dispatch(alertBadOff())
            }, 2000)
        }
    }
}

export const removeRole = (roleName) => {

    return async dispatch => {

        dispatch(loaderOn())
        try {
            await removeRoleAsync(roleName)

            dispatch({
                type: REMOVE_ROLE,
                roleName
            })
            dispatch(alertOkOn())
        } catch (e) {

            dispatch(alertBadOn())
        } finally {

            dispatch(loaderOff())
            window.setTimeout(() => {

                dispatch(alertOkOff())
                dispatch(alertBadOff())
            }, 2000)
        }
    }
}

//statistic

export const getStatPayment = (statisticPrises) => {

    return async dispatch => {

        try {

            const data = await getStatPaymentAsync(statisticPrises)

            dispatch({
                type: GET_STATISTIC_PAYMENT,
                statisticPayment: data
            })
        } catch (e) {

            console.log(e)
        }
    }
}

export const getStatUsers = (statisticPrises) => {

    return async dispatch => {

        try {

            const data = await getStatUsersAsync(statisticPrises)

            dispatch({
                type: GET_STATISTIC_USER,
                statisticUser: data
            })
        } catch (e) {

            console.log(e)
        }
    }
}

export const getStatProduct = (statisticPrises) => {

    return async dispatch => {

        try {

            const data = await getStatProductAsync(statisticPrises)

            dispatch({
                type: GET_STATISTIC_PRODUCT,
                statisticProduct: data
            })
        } catch (e) {

            console.log(e)
        }
    }
}

//search

export const searchSetArray = (array) => { return { type: SET_ARRAY, array } }

export const searchInArray = (param, searchQuery) => { return { type: SEARCH_IN_ARRAY, param, searchQuery } }