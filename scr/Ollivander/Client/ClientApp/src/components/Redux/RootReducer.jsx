import { combineReducers } from "redux";
import { RoutesReduser } from "./RoutesReduser";
import { UserReduser } from "./UserReduser";
import { ProductReduser } from "./ProductReduser";
import { CatalogReduser } from "./CatalogReduser";
import { CommentsReduser } from "./CommentsReduser";
import { LoaderReduser } from "./LoaderReduser";
import { AlertReduser } from "./AlertReduser";
import { ApplicationReduser } from "./ApplicationReduser";
import { OrdersReduser } from "./OrdersReduser";
import { PaymentReduser } from "./PaymentReduser";
import { DevelopmentReduser } from "./DevelopmentReduser";
import { StatisticReduser } from "./StatisticReduser";
import { SearchReduser } from "./SearchReduser";


export const RootReducer = combineReducers({

    RoutesReduser,
    UserReduser,
    ProductReduser,
    CatalogReduser,
    CommentsReduser,
    LoaderReduser,
    AlertReduser,
    ApplicationReduser,
    OrdersReduser,
    PaymentReduser,
    DevelopmentReduser,
    StatisticReduser,
    SearchReduser,
});