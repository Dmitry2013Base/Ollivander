import { useEffect, useState } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap-grid.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles/order.css'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Application from '../components/Application/Application';
import ApplicationView from '../components/Application/ApplicationView';
import Modal from '../components/Form/Modal';
import { getOrder, getOrders, searchSetArray } from '../components/Redux/Actions';
import Category from '../components/Catalog/Category';
import Search from '../components/Search/Search';


const Orders = () => {

    const dispatch = useDispatch();
    const reduser = useSelector(state => state.OrdersReduser)
    const application = useSelector(state => state.ApplicationReduser)
    const visibleData = useSelector(state => state.LoaderReduser.visibleData)
    const search = useSelector(state => state.SearchReduser.arrayCopy)
    const { state } = useLocation()
    const [visibleModal, setVisibleModal] = useState(false)
    const [edit, setEdit] = useState(false)
    const [scheme, setScheme] = useState(false)

    useEffect(() => {

        if (state !== null) {

            dispatch(getOrders(state.userName))
            setEdit(false)

        } else {

            dispatch(getOrders())
            setEdit(true)
        }
    }, [state])

    useEffect(() => {

        dispatch(searchSetArray(reduser.orders))
    }, [reduser.orders])

    const getApplicatin = (id) => {

        dispatch(getOrder(id, setVisibleModal))
    }

    useEffect(() => {

        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {

            setScheme(false)
        } else {

            setScheme(true)
        }
    }, [])

    return (
        <>
            <Modal visible={visibleModal} setVisible={setVisibleModal}>
                <ApplicationView application={application} isEdit={edit} statuses={reduser.statuses} setVisible={setVisibleModal} />
            </Modal>

            <Category categories={reduser.statuses} setCategory={(e) => { (state !== null) ? dispatch(getOrders(state.userName, e)) : dispatch(getOrders(state, e)) }} />

            <section className={(visibleData) ? "container" : "container container-not-visible"}>
                {
                    (state === null) && <Search param={'userName'} />
                }
                <div className="row">
                    <table className={(scheme) ? "table table-hover table-sm text-center caption-top table-striped table-bordered border-dark" : "table table-hover table-sm text-center caption-top table-striped table-bordered table-dark"}>
                        <caption className={(scheme) ? "fs-2 text-center" : "fs-2 text-center text-light"} >Заказы</caption>
                        <thead>
                            <tr>
                                <th scope="col">№</th>
                                <th className="colomn-not-visible" scope="col">Создана</th>
                                <th scope="col">User</th>
                                <th scope="col">Product</th>
                                <th className="colomn-not-visible" scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                search.map(item =>

                                    <Application key={item.id} application={item} getApplicatin={getApplicatin} />
                                )
                            }
                        </tbody>
                    </table>
                    {
                        search.length === 0 && <p className="empty-list">Список пуст</p>
                    }      
                </div>
            </section> 
        </>
    );
}

export default Orders;