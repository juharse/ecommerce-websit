import React, { useState,useRef,useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button,Row, Col,Dropdown,Container  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './navbar1.css';
import './newa.css';
const NUM_COLUMNS = 3;  // Adjust the number of columns as needed

const CustomNavbar = ({ sidebarOpen, setSidebarOpen, signoutHandler, userInfo, cartItems, products,subcategories }) => {
  const location = useLocation();
  const [showCategories, setShowCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory();

  // Extract unique categories from the list of products
  const categories = Array.from(new Set(products.map(product => product.category?.name)));

  const isHomePage = () => {
    return location.pathname === '/';
  };

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const handleSearch = () => {
    // Filter products based on searchQuery
    const filteredProducts = products.filter(product =>
      product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );
    // Do something with the filtered products, e.g., navigate to search results page
    history.push('/search', { searchResults: filteredProducts });
  };
  

  const [activeDropdown, setActiveDropdown] = useState(null);
  //const [activeDropdown, setActiveDropdown] = useState(null);

    // Function to handle mouse entering and leaving the dropdown
    const toggleDropdown = (categoryId) => {
        if (activeDropdown === categoryId) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(categoryId);
        }
    };

    // Function to create columns of subcategories
    
    // Split subcategories into two groups for two columns
    const getTwoColumnSubcategories = (subcats) => {
        const midpoint = Math.ceil(subcats.length / 3);
        return [subcats.slice(0, midpoint), subcats.slice(midpoint)];
    };

    const getColumnarSubcategories = (subcats) => {
      const itemsPerColumn = 3;
      const columns = [];
      for (let i = 0; i < subcats.length; i += itemsPerColumn) {
          columns.push(subcats.slice(i, i + itemsPerColumn));
      }
      return columns;
  };
 /* const toggleDropdown = (categoryId) => {
    setActiveDropdown(prev => prev === categoryId ? null : categoryId);
  };*/
 /* useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);*/
  
  return (
    <Navbar bg="red" expand="lg"style={{backgroundColor:'blue'
    }}>
      <Navbar.Brand as={Link} to="/" className="navbar-logo">
        <img src="/logo2.png" alt="Logo" style={{ width: 200, height: 100, marginTop: 20 }} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
        {!userInfo?.isAdmin &&  (
          <div className="dropdown-container">
    {products.map(category => (
        <div key={category._id} className="dropdown"
            onMouseEnter={() => setActiveDropdown(category._id)}
            onMouseLeave={() => setActiveDropdown(null)}>
            <button className="dropdown-toggle" id={`dropdown-${category._id}`}>
                {category.name}
            </button>
            <div className={`dropdown-menu ${activeDropdown === category._id ? 'show' : ''}`}>
                <div className="dropdown-menu-content">
                    {getColumnarSubcategories(subcategories.filter(sub => sub.category._id === category._id)).map((column, idx) => (
                        <div key={idx} className="dropdown-column">
                            {column.map(subcat => (
                                <Link key={subcat._id} to={`/subcategory/${subcat._id}`} className="dropdown-item">
                                    {subcat.name}
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ))}
</div>
                    )}
          
          <Nav.Link href="https://www.papyrusonline.com/cards/cards-stationery/christmas">Cards & Gifts</Nav.Link>
          <Nav.Link href="https://store.canadapost-postescanada.ca/store-boutique/en/c/53">canadapost</Nav.Link>
          <Nav.Link href="https://sksnovelty.ca/catalogue">Partiy items</Nav.Link>
          <Nav.Link as={Link} to="/AboutUS">AboutUs</Nav.Link>
          <Nav.Link as={Link} to="/ContactUS">ContactUS</Nav.Link>
          <Nav.Link as={Link} to="/countact us">more</Nav.Link>

          
        </Nav>
        <Form className="d-flex mx-auto">
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-2 col-sm-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="outline-success" onClick={handleSearch}>Search</Button>
        </Form>
        <Nav>
          
          <Nav.Link as={Link} to="/cart">
            <i className="fa fa-shopping-cart"></i> Cart
            {cartItems.length > 0 && <span className="badge">{cartItems.length}</span>}
          </Nav.Link>

          {userInfo ? (
            <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/orderhistory">Order History</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={signoutHandler}>Sign Out</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav.Link as={Link} to="/signin">Sign In</Nav.Link>
          )}
          {userInfo && userInfo.isAdmin && (
            <NavDropdown title="Admin" id="basic-nav-dropdown" style={{width:100}}>
              <NavDropdown.Item as={Link} to="/dashboard">Dashboard</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/productlist">Products</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/orderlist">Orders</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/userlist">Users</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/categories">catagory</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/subcategories">subcatagory</NavDropdown.Item>


              

            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
