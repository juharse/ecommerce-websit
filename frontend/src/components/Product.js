// Product.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './product.css'; // Import the CSS file for styling

const Product = ({ product }) => {
  const [qty, setQty] = useState(1);

  const addToCartHandler = () => {
    // Implement addToCart functionality here
    // You can dispatch an action to add the product to the cart
  };
    /*const [imageUrl, setImageUrl] = useState('');
  
    useEffect(() => {
      // Replace 'imageName.jpg' with the actual filename of the image you want to fetch
      const imageName = 'example.jpg';
  
      // Make a request to the backend API to fetch the image URL by its name
      axios.get(`https://ecommerce-websit-3.onrender.com/api${product.image}`)
        .then(response => {
          setImageUrl(response.data.imageUrl);
        })
        .catch(error => {
          console.error('Error fetching image:', error);
        });
    }, []);*/
    const [imageData, setImageData] = useState(null);
    const imageName = 'example.jpg'; // Replace 'example.jpg' with the name of the image you want to fetch
  
    useEffect(() => {
      const fetchImage = async () => {
        try {
          // Make a GET request to fetch the image data from the backend
          const response = await axios.get(`api${product.image}`, {
            responseType: 'arraybuffer' // Set response type to 'arraybuffer' to receive binary data
          });
  
          // Create a blob from the received image data
          const blob = new Blob([response.data], { type: 'image/jpeg' }); // Adjust the type based on your image format
  
          // Create a URL for the blob
          const imageUrl = URL.createObjectURL(blob);
  
          // Set the image URL in state
          setImageData(imageUrl);
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      };
  
      fetchImage();
    }, [imageName]);
  return (
    <div className="product-container"> {/* Add the product-container class here */}
      <div key={product._id} className="product">
        <Link to={`/product/${product._id}`}>
          <img className="product-image" src={imageData} alt={product.name} />
        </Link>
        <div className="product-details">
          <Link to={`/product/${product._id}`} className="product-name">
            {product.name}
          </Link>
          <div className="product-price">$ {product.price}</div>
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
    </div>
  );
};

export default Product;