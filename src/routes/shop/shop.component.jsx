import { CategoriesContext } from '../../context/categories.context';
import { useContext, Fragment } from 'react';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import './shop.styles.scss';

const Shop = () => {
    const { categoriesMap } = useContext(CategoriesContext);
    console.log("categories map from shop component == ", categoriesMap);
    return(
        <div className='shop-container'>
            {Object.keys(categoriesMap).map(title => {
                const product = categoriesMap[title];
                return (
                    <CategoryPreview key={title} title={title} products={product}  />
                );
            })}
        </div>
    );
};

export default Shop;