import { useNavigate } from 'react-router';
import '../../styles/style.css'
import CustomButton from './../Buttons/CustomButton';
import Rating from './../Rating/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { addItemInCollection, deleteCatalogItem, removeItemFromCollection } from './../Redux/Actions';


const CustomItemProduct = ({ item }) => {

    const dispatch = useDispatch()
    const catalog = useSelector(state => state.CatalogReduser)
    const routes = useSelector(state => state.RoutesReduser)
    const navigate = useNavigate()

    var procent = 0;

    if (item.sale !== 0) {

        procent = Math.round(item.sale / item.price * 100);
    }

    return (
        <div className="col-lg-12 col-md-12 col-sm-12 col-12 catalog-item mob">
            <div className="row item">
            <div className="col-lg-4 col-md-5 col-sm-5 col-11">
                <div className="item-img" style={{ backgroundImage: `url(${(item.image.length > 50) && item.image })` }}>
                        <div className="image-rating">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                            </svg>
                            <span>{Math.round(item.rating)}</span>
                        </div>
                        {
                            procent !== 0 &&
                            <div className="percent-sale">
                                <span>-{procent}%</span>
                            </div>
                        }
                        {
                            item.count === 0 && <p className="not-available">Нет в наличии</p>
                        } 
                    </div>
                </div>

                <div className="col-lg-8 col-md-7 col-sm-7 col-12 description mob">
                    <div className="row">
                        <div className="col-lg-10 col-md-7 col-sm-7 col-12 mob">
                        <span className="product-name" onClick={() => navigate(`../product/${item.id}`, { state: { isUpdate: false } })}>
                                {item.name}
                            </span>
                        </div>

                        <div className="col-lg-2 col-md-5 col-sm-5 col-12 mob">
                            <div className="item-value">
                                <span className="new-price">
                                    {item.price - item.sale}pуб.
                                </span>

                                {
                                    item.sale !== 0 && 
                                    <span className="old-price">
                                        {item.price}pуб.
                                    </span>
                                }

                            </div>
                        </div>
                    </div>

                    <div className="row bottom-line">
                        <div className="col-lg-2 col-md-4 col-sm-4">
                            <Rating rating={item.rating} set={false}></Rating>
                        </div>

                        <div className="col-lg-10 col-md-8 col-sm-8 col-12 mob">
                            <div className="item-buttons">
                                {
                                    (item.count === 0)
                                    ? <CustomButton className="button-base" disabled>Купить</CustomButton>
                                        : <>
                                            {
                                                routes.userRoles.length !== 0
                                                    ? <CustomButton className="button-base" onClick={() => navigate('/payment', { state: { items: [item.id] } })}>Купить</CustomButton>
                                                    : <CustomButton className="button-base" title="Авторизуйтесь">Купить</CustomButton>
                                            }
                                        </>      
                                }
                                {
                                    (catalog.isEdit)
                                        ? <>
                                            {
                                                routes.userRoles.length !== 0 &&
                                                <>
                                                    <CustomButton className="button-base" onClick={() => dispatch(addItemInCollection(window.localStorage.getItem("userId"), "favourites", item.id))}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                                                            <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
                                                        </svg>
                                                    </CustomButton>
                                                    <CustomButton className="button-base" onClick={() => dispatch(addItemInCollection(window.localStorage.getItem("userId"), "basket", item.id))}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
                                                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                                        </svg>
                                                    </CustomButton>
                                                </>
                                            }
                                            {
                                                routes.userRoles.includes("Admin") && <CustomButton className="button-base" onClick={() => dispatch(deleteCatalogItem(item.id))}>Удалить</CustomButton>
                                            }
                                        </>
                                    : <>
                                        <CustomButton className="button-base" onClick={() => dispatch(removeItemFromCollection(window.localStorage.getItem("userId"), window.location.href.split("/").at(-1), item.id))}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                            </svg>
                                        </CustomButton>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomItemProduct;