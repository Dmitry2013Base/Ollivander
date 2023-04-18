import Dev from "../../pages/Dev"
import List from "../../pages/List"
import Orders from "../../pages/Orders"
import Payment from "../../pages/Payment"
import Product from "../../pages/Product"
import { getCatalogItems, getCollectionItems } from "../Redux/Actions"
import { Basket_Route, Development_Route, Favourites_Route, Orders_Route, Payment_Route, Product_Route } from "./Consts"


export const publicRoutes = [
    {
        path: '/',
        roles: [],
        element: <List getArray={getCatalogItems} params={["default"]} />
    },
    {
        path: Product_Route + '/:id',
        roles: [],
        element: <Product />
    },
    {
        path: Basket_Route,
        roles: ["Guest", "Admin", "Manager", "Analyst"],
        element: <List getArray={getCollectionItems} params={["basket"]} />
    },
    {
        path: Favourites_Route,
        roles: ["Guest", "Admin", "Manager", "Analyst"],
        element: <List getArray={getCollectionItems} params={["favourites"]} />
    },
    {
        path: Payment_Route,
        roles: ["Guest", "Admin", "Manager", "Analyst"],
        element: <Payment />
    },
    {
        path: Orders_Route,
        roles: ["Guest", "Admin", "Manager", "Analyst"],
        element: <Orders />
    },
    {
        path: Development_Route,
        roles: ["Admin", "Analyst"],
        element: <Dev />
    },
    {
        path: "*",
        roles: [],
        element: <List getArray={getCatalogItems} params={["default"]} />
    },
]
