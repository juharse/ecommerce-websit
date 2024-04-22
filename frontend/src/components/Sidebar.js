// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './sidbar.css'; // Import the CSS file

const Sidebar = ({ sidebarOpen, setSidebarOpen, categories, selectedCategory, setSelectedCategory }) => {
  return (
    
    <nav className={sidebarOpen ? 'sidebar open' : 'sidebar'}>
      <div className="sidebar-header">
        <h3>Categories</h3>
        <button className="close-btn" onClick={() => setSidebarOpen(false)}>×</button>
      </div>
      <ul className="categories">
        {categories.map(category => (
          <li key={category} className={selectedCategory === category ? 'active' : ''}>
            <Link to={`/category/${category}`} onClick={() => setSelectedCategory(category)}>{category}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;
