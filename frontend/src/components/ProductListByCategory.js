import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProductsByCategory } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import { useHistory } from 'react-router-dom';
import './ProductListByCategoryScreen.css'; // Adjust if needed for custom styles

const ProductListBySubcategoryScreen = ({ match }) => {
  const subcategoryId = match.params.subcategoryId;
  const dispatch = useDispatch();
  const history = useHistory();
  const [pageSize, setPageSize] = useState(10); // Initially showing 10 items per page
  const productListByCategory = useSelector((state) => state.productListByCategory);
  const { loading, error, products } = productListByCategory;

  useEffect(() => {
    dispatch(listProductsByCategory(subcategoryId, pageSize));
  }, [dispatch, subcategoryId, pageSize]);

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
  };

  return (
    <div className="container">
      <div className="pagination py-3">
        <select className="form-control w-auto" value={pageSize} onChange={handlePageSizeChange}>
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
        </select>
      </div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3" key={product._id}>
              <Product product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductListBySubcategoryScreen;
