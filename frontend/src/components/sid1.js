// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
//import './sidbar.css'

const Sid1= ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h3>Categories</h3>
      </div>
      <ul className="categories">
        {categories.map(category => (
          <li key={category} className={selectedCategory === category ? 'active' : ''}>
            <Link to={`/category/${category}`} onClick={() => setSelectedCategory(category)}>
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sid1;
