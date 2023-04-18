import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../Buttons/CustomButton";
import InputVar1 from "../Inputs/InputVar1";
import Rating from "../Rating/Rating";
import { useNavigate } from 'react-router';
import { productUpdateName, productUpdatePrice, productUpdateSale, productUpdateCount, updateProduct, productUpdateImage, setIsUpdateProduct, addItemInCollection, productUpdateCategory } from "../Redux/Actions";
import Select from "../Select/Select";

const ProductHeader = ({ product, isUpdate, setVisible, categories }) => {

    const dispatch = useDispatch()
    
    const routes = useSelector(state => state.RoutesReduser)
    const [fileName, setFileName] = useState('Файл не выбран')
    const navigate = useNavigate()

    const getImage = async (e) => {

        if (e.target.files.length !== 0) {

            const file = e.target.files;
            const base64 = await convertBase64(file[0]);
            setFileName(file[0].name);
            dispatch(productUpdateImage(base64));
        }
    }

    const convertBase64 = (file) => {

        return new Promise((resolve, reject) => {

            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {

                resolve(fileReader.result);
            }

            fileReader.onerror = (error) => {

                reject(error);
            }
        });
    }

    const updateCategory = (category) => dispatch(productUpdateCategory(category))

    const goHome = () => navigate(-1)

    const save = () => {

        dispatch(setIsUpdateProduct())

        if (isUpdate) {

            dispatch(updateProduct(product.id, product, goHome))
        }
    }

    return (
        <div className="row product-row">
            {
                (isUpdate)
                    ? <div className="product-name">
                        <InputVar1 type={"text"} placeholder={"Наименование"} val={product.name} getValue={(val) => dispatch(productUpdateName(val))} />
                    </div>
                    : <h3 className="header-section">{product.name}</h3>
            }
            <div className="col-lg-4 col-md-5 col-sm-5 col-12 product-img">
                <div className="product-image" style={{ backgroundImage: `url(${product.image})` }}>
                    {
                        product.count === 0 && <p className="not-available">Нет в наличии</p>
                    }
                </div>
                {
                    isUpdate && routes.userRoles.includes("Admin") &&
                    <div>
                        <label className="input-file">
                            <input type="file" name="file" accept="image/*" onChange={(e) => getImage(e)} />
                            <span>Выберите файл</span>
                            <span className="file-name">{fileName}</span>
                        </label>
                    </div>
                }
            </div>

            <div className="col-lg-8 col-md-7 col-sm-7 col-12 product-definition">

                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        {
                            !isUpdate && <Rating rating={product.rate} set={false} />
                        }
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-6 col-12 product-count">
                        {
                            (isUpdate && routes.userRoles.includes("Admin"))
                                ? <div className="definition-inputs">
                                    <InputVar1 type={"number"} placeholder={"Цена"} val={product.price} getValue={(val) => dispatch(productUpdatePrice(val))} />
                                    <InputVar1 type={"number"} placeholder={"Скидка"} val={product.sale} getValue={(val) => dispatch(productUpdateSale(val))} />
                                    <InputVar1 type={"number"} placeholder={"Количество"} val={product.count} getValue={(val) => dispatch(productUpdateCount(val))} />
                                    <Select array={categories} current={product.categoryName} getValue={updateCategory} />
                                </div>
                                : <>
                                    <p className="count product-new-price">{product.price - product.sale}руб.</p>
                                    {
                                        product.sale !== 0 &&
                                        <p className="count product-old-price">{product.price}руб.</p>
                                    }
                                    {
                                        routes.userRoles.includes("Admin") || routes.userRoles.includes("Manager") &&
                                        <>
                                            <p className="count">{product.count}шт.</p>
                                            <p className="count">{product.categoryName}</p>
                                        </>
                                    }
                                </>
                        }
                    </div>
                </div>

                <div className="row">
                    <div className="product-buttons">
                        {
                            !isUpdate &&
                            <>
                                {
                                    (product.count === 0)
                                        ? <CustomButton disabled>Купить</CustomButton>
                                        : <>
                                            {
                                                routes.userRoles.length !== 0
                                                    ? <CustomButton onClick={() => navigate('/payment', { state: { items: [product.id] } })}>Купить</CustomButton>
                                                    : <CustomButton className="button-base" title="Авторизуйтесь">Купить</CustomButton>
                                            }
                                        </>
                                }
                                {
                                    routes.userRoles.length !== 0 &&
                                    <>
                                        <CustomButton onClick={() => dispatch(addItemInCollection(window.localStorage.getItem("userId"), "favourites", product.id))}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                                                <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
                                            </svg>
                                        </CustomButton>
                                        <CustomButton onClick={() => dispatch(addItemInCollection(window.localStorage.getItem("userId"), "basket", product.id)) }>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
                                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                            </svg>
                                        </CustomButton>
                                    </>
                                }
                            </>
                        }
                        {
                            routes.userRoles.includes("Admin") && <CustomButton onClick={save}>{(isUpdate) ? <>Сохранить</> : <>Изменить</>}</CustomButton>
                        }
                        {
                            !isUpdate && routes.userRoles.length !== 0 &&
                            <CustomButton onClick={() => setVisible(true)}>Добавить отзыв</CustomButton>
                        }
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ProductHeader;