import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import '../components/product-screen.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };

  return (
    <div className="container">
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Link to="/" className="btn btn-light mb-3">Back to Results</Link>
          <div className="row" style={{marginTop:5}}>
            <div className="col-lg-6">
              <img
                className="img-fluid rounded mb-3"
                src={ `https://ecommerce-websit-3.onrender.com${product.image}`}
                alt={product.name}
              />
            </div>
            <div className="col-lg-6" style={{marginTop:0}}>
              <h1 className="fw-bold">{product.name}</h1>
              <Rating rating={product.rating} numReviews={product.numReviews} />
              <h2 className="price fw-bold">${product.price}</h2>
              <p className="description">{product.description}</p>
              <div className="card mb-3">
                <div className="card-body">
                  <h3 className="fw-bold">Price: ${product.price}</h3>
                  <h3 className="fw-bold">Status: {product.countInStock > 0 ? <span className="text-success">In Stock</span> : <span className="text-danger">Unavailable</span>}</h3>
                  {product.countInStock > 0 && (
                    <>
                      <h3 className="fw-bold">Qty:</h3>
                      <select
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        className="form-select mb-3"
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>{x + 1}</option>
                        ))}
                      </select>
                    </>
                  )}
                </div>
              </div>
              <div className="text-lg-end">
                {product.countInStock > 0 && (
                  <button
                    onClick={addToCartHandler}
                    className="btn btn-primary btn-lg"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
