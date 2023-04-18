import { useEffect } from 'react'
import CustomItemProduct from '../components/Catalog/CustomItemProduct';
import '../../node_modules/bootstrap/dist/css/bootstrap-grid.min.css';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../components/Pagination/Pagination';
import Category from '../components/Catalog/Category';
import { useNavigate } from 'react-router-dom';
import '../../src/styles/catalog.css'
import CustomButton from '../components/Buttons/CustomButton';


const List = ({ getArray, params }) => {

    const dispatch = useDispatch();
    const reduser = useSelector(state => state.CatalogReduser)
    const visibleData = useSelector(state => state.LoaderReduser.visibleData)
    const navigate = useNavigate()

    useEffect(() => {

        params[0] = window.sessionStorage.getItem("category")
        dispatch(getArray(...params, (Number(window.sessionStorage.getItem("currentPage")) * reduser.limit) - reduser.limit, reduser.limit, window.localStorage.getItem("userId")))
        window.sessionStorage.setItem("currentPage", 1)
    }, [navigate])

    const nextItems = (page) => {

        var next = Object.assign([], params)
        next[0] = window.sessionStorage.getItem("category")
        window.sessionStorage.setItem("currentPage", page)
        dispatch(getArray(...next, (Number(window.sessionStorage.getItem("currentPage")) * reduser.limit) - reduser.limit, reduser.limit, window.localStorage.getItem("userId")))
    }

    const nextCategory = (category) => {

        var next = Object.assign([], params)
        window.sessionStorage.setItem("category", category)
        next[0] = category
        dispatch(getArray(...next, 0, reduser.limit, window.localStorage.getItem("userId")))
    }


    return (
        <section>
            {
                reduser.isEdit && <Category categories={reduser.categories} setCategory={nextCategory} current={reduser.categories.indexOf(window.sessionStorage.getItem("category")) + 1} />
            }
            <div className={(visibleData) ? "container" : "container container-not-visible"}>
                <h1 className="catalog-header">{reduser.header}</h1>
                <div className="sorted">
                    {
                        !reduser.isEdit && reduser.catalogItems.length > 1 && <CustomButton onClick={() => navigate('/payment', { state: { items: reduser.catalogItems.map(a => a.id) } })}>Купить все</CustomButton>
                    }
                </div>
                {
                    reduser.catalogItems.length !== 0
                        ? <>
                            {
                                reduser.catalogItems.map((item, index) =>
                                    <div className="row" key={index}>
                                        <CustomItemProduct item={item}></CustomItemProduct>
                                    </div>
                                )
                            }
                            {
                                reduser.count > reduser.limit &&
                                <Pagination itemsCount={reduser.count} currentPage={reduser.currentPage} limitCount={reduser.limit} click={nextItems} />
                            }   
                        </>
                        : <>
                            <p className="empty-list">Список пуст</p>
                        </>
                }
            </div>
        </section> 
    );
}

export default List;