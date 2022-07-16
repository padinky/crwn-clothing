import './category.styles.scss';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { CategoriesContext } from '../../context/categories.context';
import ProductCard from '../../components/product-card/product-card.component';


const Category = () => {
    const {category} = useParams();
    const {categoriesMap} = useContext(CategoriesContext);
    const [products,setProducts] = useState([]);
    useEffect(()=>{
        setProducts(categoriesMap[category]);
    },[category,categoriesMap])
    return(
        <div className='category-container'>
            {
                products && products.map((p) => <ProductCard key={p.id} product={p} />)
            }
        </div>
        );

};

export default Category;