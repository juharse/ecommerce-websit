// Product.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './product.css'; // Import the CSS file for styling

const Product = ({ product }) => {
  const [qty, setQty] = useState(1);

  const addToCartHandler = () => {
    // Implement addToCart functionality here
    // You can dispatch an action to add the product to the cart
  };

  return (
    <div key={product._id} className="product">
      <Link to={`/product/${product._id}`}>
        <img className="product-image" src={ `https://ecommerce-websit-3.onrender.com${product.image}`} alt={product.name} />
      </Link>
      <div className="product-details">
        <Link to={`/product/${product._id}`} className="product-name">
          {product.name}
        </Link>
        <div className="product-price" style={{fontStyle:'bold'}}>$ {product.price}</div>
        <div className="product-rating">
          {[...Array(5)].map((_, i) => (
            <span key={i}>
              <i
                className={
                  product.rating >= i + 1
                    ? 'fa fa-star'
                    : product.rating >= i + 0.5
                    ? 'fa fa-star-half-o'
                    : 'fa fa-star-o'
                }
              ></i>
            </span>
          ))}
        </div>
        <div className="product-actions">
          <Link to={`/product/${product._id}`} className="button primary">
            Details
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default Product;
