
const ProductBuy = ({ items }) => {

    return (
        <>
            {
                items.map(item =>
                    <div key={item.id} className="buy-product">
                        <div className="buy-product-image" style={{ backgroundImage: `url(${item.image})` }}></div>
                        <div className="buy-product-name">{item.name}</div>
                        <div className="buy-product-price">{item.price} руб.</div>
                    </div>  
                )
            }
        </>
    );
}

export default ProductBuy;