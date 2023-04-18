import { $authHost, $host } from './Host';


//collection

export const getCountCollectionItemsAsync = async (userId, collectionName) => await (await $authHost.get(`api/collection/getCount/${userId}/${collectionName}`)).data

export const getCollectionItemsAsync = async (collectionName, start, limit, userId) => await (await $authHost.get(`api/collection/${collectionName}/${start}/${limit}/${userId}`)).data

export const addItemInCollectionAsync = async (userId, collectionName, productId) => await (await $authHost.post(`api/collection/${userId}/${collectionName}/${productId}`)).data

export const removeItemFromCollectionAsync = async (userId, collectionName, productId) => await (await $authHost.delete(`api/collection/${userId}/${collectionName}/${productId}`)).data

//payment

export const getOrdersAsync = async (statusName, userName) => await (await $authHost.get(`api/payment/${statusName}/${userName}`)).data

export const getStatusesAsync = async () => await (await $authHost.get(`api/payment/statuses`)).data

export const getOrderAsync = async (id) => await (await $authHost.get(`api/payment/${id}`)).data

export const createOrderAsync = async (orderBuy) => await (await $authHost.post(`api/payment`, orderBuy)).data

export const getPaymentAsync = async (products) => await (await $authHost.post(`api/payment/view`, products)).data

export const updateOrderAsync = async (order) => await (await $authHost.put(`api/payment/${order.id}`, order)).data

//login

export const loginAsync = async (user) => await (await $host.post(`api/account/login`, user)).data

export const logoutAsync = async (id) => await $host.get(`/api/account/logout/${id}`)

export const registrationAsync = async (user) => await $host.post(`api/account/registration`, user)

export const getUserRolesAsync = async (id, userId) => await (await $host.get(`api/roles/${id}/${userId}`)).data

export const passwordChangeAsync = async (userUp) => await (await $authHost.post(`api/account/passwordChange`, userUp)).data

//catalog

export const getCountCatalogItemsAsync = async (category) => await (await $host.get(`api/catalog/count/${(typeof category !== 'undefined') ? category : ''}`)).data

export const getCategoriesCatalogItemsAsync = async () => await (await $host.get(`api/catalog/Categories`)).data

export const getCatalogItemsAsync = async (category, start, limit) => await (await $host.get(`api/catalog/${category}/${start}/${limit}`)).data

export const getCatalogItemByIdAsync = async (id) => await (await $host.get(`api/catalog/${id}`)).data

export const createCatalogItem = async () => await (await $authHost.get('api/catalog')).data

export const updateProductAsunc = async (id, product) => await (await $authHost.put(`api/catalog/${id}`, product)).data

export const deleteCatalogItemAsync = async (id) => await $authHost.delete(`api/catalog/${id}`)

//comment

export const getCommentsAsync = async (productId) => await (await $host.get(`api/comment/${productId}`)).data

export const createCommentsAsync = async (productId, comment) => await (await $authHost.post(`api/comment/${productId}`, comment))

//development

export const getUsersAsync = async () => await (await $authHost.get(`api/development`)).data

export const getAllRolesAsync = async () => await (await $authHost.get(`api/roles`)).data

export const getRolesAsync = async (id, userId) => await (await $authHost.get(`api/roles/${id}/${userId}`)).data

export const createRoleAsync = async (roleName) => await (await $authHost.post(`api/roles/${roleName}`)).data

export const addOrRemoveUserRoleAsync = async (userUpdate) => await (await $authHost.put(`api/development`, userUpdate)).data

export const removeRoleAsync = async (roleName) => await (await $authHost.delete(`api/roles/${roleName}`)).data

//statistic

export const getStatPaymentAsync = async statisticPrises => await (await $authHost.post(`api/statistic/payment`, statisticPrises)).data

export const getStatUsersAsync = async (statisticPrises) => await (await $authHost.post(`api/statistic/users`, statisticPrises)).data

export const getStatProductAsync = async (statisticPrises) => await (await $authHost.post(`api/statistic/product`, statisticPrises)).data
