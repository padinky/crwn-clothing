import { CategoriesContext } from '../../context/categories.context';
import { useContext, Fragment } from 'react';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import './categories-preview.styles.scss';

const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext);
    console.log("categories map from shop component == ", categoriesMap);
    return(
        <Fragment>
            {Object.keys(categoriesMap).map(title => {
                const product = categoriesMap[title];
                return (
                    <CategoryPreview key={title} title={title} products={product}  />
                );
            })}
        </Fragment>
    );
};

export default CategoriesPreview;