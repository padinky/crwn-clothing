import Button from '../button/button.component';
import './product-card.styles.scss'

const ProductCard = ({product}) => {
    const {imageUrl, name, price, id} = product;
    return(
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`} />
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
                <Button buttonType='inverted'>Add to Cart</Button>
            </div>
        </div>
    )
}

export default ProductCard;