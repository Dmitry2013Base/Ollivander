import { useDispatch } from "react-redux";
import { productUpdateDescription } from "../Redux/Actions";

const Description = ({ product, isUpdate }) => {

    const dispatch = useDispatch()

    return (
        <div className="row product-row">
            <h3 className="header-section">О товаре</h3>
            {
                (isUpdate)
                    ? <div className="product-description">
                        <textarea className="textarea-base" value={product.description} onChange={e => dispatch(productUpdateDescription(e.target.value))}></textarea>
                    </div>
                    : <div className="product-description">{product.description}</div>
            }
        </div>
    );
}

export default Description;