import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../components/hom.css'; // Import custom CSS for HomeScreen

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(12); // Number of products per page
  const [selectedValue, setSelectedValue] = useState(productsPerPage);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1); // Reset current page when products per page changes
  }, [productsPerPage]);

  if (loading) {
    return <LoadingBox />;
  }

  if (error) {
    return <MessageBox variant="danger">{error}</MessageBox>;
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    setProductsPerPage(value);
    setSelectedValue(value);
  };

  return (
    <div className="container-fluid" style={{marginTop:20,marginLeft:200}}>
      <div className="row">
        <div className="col-md-10 main-content">
          <div className="row row-cols-1 row-cols-md-4 g-4"style={{border:'none',gap:0}}>
            {currentProducts.map((product) => (
              <div key={product._id} className="col">
                <Product product={product} />
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-2">
          <div className="mb-3 products-per-page-dropdown">
            <label htmlFor="productsPerPage" className="form-label">Show p</label>
            <select id="productsPerPage" value={selectedValue} onChange={handleChange} className="form-select">
              <option value={12}>12</option>
              <option value={18}>18</option>
              <option value={24}>24</option>
              <option value={32}>32</option>
              <option value={48}>48</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
