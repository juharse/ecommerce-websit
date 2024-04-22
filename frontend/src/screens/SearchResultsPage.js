import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../components/search.css';

const SearchResultsPage = () => {
  const history = useHistory();
  const location = useLocation();
  const searchResults = location.state?.searchResults || [];

  const handleAddToCart = (productId) => {
    // Implement your logic to add the product to the cart
    // For example, you can dispatch an action to update the cart state

    // After adding the product to the cart, navigate to the cart page
    history.push('/cart');
  };

  return (
    <div className="search-results-container">
      <h1 className="search-results-heading">Search Results</h1>
      <div className="product-list">
        {searchResults.map(product => (
          <div className="product-card" key={product.id}>
            <img className="product-image" src={product.image} alt={product.name} />
            <div className="product-details">
              <h2 className="product-name">{product.name}</h2>
              <p className="product-description">{product.description}</p>
              <div className="product-info">
                <p className="product-price">Price: ${product.price}</p>
                <p className="product-rating">Rating: {product.rating}/5</p>
              </div>
              <button className="add-to-cart-btn" onClick={() => handleAddToCart(product.id)}>
                ADD To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResultsPage;
