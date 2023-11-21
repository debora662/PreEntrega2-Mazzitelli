import PropTypes from 'prop-types';
import ItemList from '../ItemList/ItemList';
import { getAllProducts, getCategoryById } from "../../async-mock";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';

const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {
    const asynFunc = categoryId ? getCategoryById : getAllProducts;
    asynFunc(categoryId)
      .then(response => {
        setProducts(response);
      })
      .catch(error => {
        console.log("Hubo un error", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [categoryId])

  return (
    <div>
      <h1 className="text-4xl text-black font-bold mt-10 text-center">{greeting}</h1>
      {isLoading ? <Loading /> : <ItemList products={products} />}
    </div>
  )
}

ItemListContainer.propTypes = {
  greeting: PropTypes.string
};

export default ItemListContainer;