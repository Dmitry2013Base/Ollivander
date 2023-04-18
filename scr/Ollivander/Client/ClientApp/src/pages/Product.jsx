import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Comments from '../components/Comments/Comments';
import Modal from '../components/Form/Modal';
import Comment from '../components/Comments/Comment';
import { useDispatch, useSelector } from 'react-redux';
import { commentError, getComments, getProduct, getProductCategories } from '../components/Redux/Actions';
import '../../src/styles/product.css'
import ProductHeader from '../components/Product/ProductHeader';
import Description from '../components/Product/Description';
import Characteristics from '../components/Characteristics/Characteristics';

const Product = () => {

    const dispatch = useDispatch()
    const reduser = useSelector(state => state.ProductReduser)
    const comments = useSelector(state => state.CommentsReduser.comments)
    const categories = useSelector(state => state.CatalogReduser.categories)
    const visibleData = useSelector(state => state.LoaderReduser.visibleData)
    const [visible, setVisible] = useState(false);
    const { id } = useParams()

    useEffect(() => {

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

        dispatch(getProduct(id))
        dispatch(getComments(id))
        dispatch(getProductCategories())
    }, [])

    useEffect(() => {

        dispatch(commentError(''))
    }, [visible])

    return (
        <>
            <Modal visible={visible} setVisible={setVisible}>
                <Comment productId={id} setVisible={setVisible} />
            </Modal>

            <div className={(visibleData) ? "container" : "container container-not-visible"}>
                <ProductHeader product={reduser.product} isUpdate={reduser.isUpdate} setVisible={setVisible} categories={categories} />
                <Description product={reduser.product} isUpdate={reduser.isUpdate} />
                <Characteristics product={reduser.product} isUpdate={reduser.isUpdate} />
                <Comments comments={comments} isUpdate={reduser.isUpdate} />
            </div>
        </>
    )
}

export default Product;