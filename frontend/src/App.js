import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import CategoryScreen from './screens/CategoryScreen';
import SearchResultsPage from './screens/SearchResultsPage';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import CategoriesScreen from './screens/CategoriesScreen';
import SubcategoriesScreen from './screens/SubcategoriesScreen';
//import './components/app.css'
//const categories = ['all','electronics', 'clothing', 'books','Shirts',];


//const categories = ['all', 'electronics', 'clothing', 'books', 'Shirts'];

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [subcategories, setsubcategories] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/categories'); // Fetch products from your API
        setProducts(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchSubcategories= async () => {
      try {
        const response = await axios.get('/api/subcategories'); // Fetch products from your API
        setsubcategories(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchSubcategories();
  }, []);

  //const [selectedCategory, setSelectedCategory] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          signoutHandler={signoutHandler}
          userInfo={userInfo}
          cartItems={cartItems}
          products={products} 
          subcategories={subcategories}
        />
      
          <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route path="/search" component={SearchResultsPage} />
          <Route path="/AboutUs" component={AboutUs } />
          <Route path="/ContactUs" component={ContactUs} />
          
          
          
          {/* Define route for displaying products by category */}
          {/* Use CategoryScreen component */}
          <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <AdminRoute
            path="/productlist"
            component={ProductListScreen}

          ></AdminRoute>
         <AdminRoute path="/categories" component={CategoriesScreen}></AdminRoute>
         <AdminRoute path="/subcategories" component={SubcategoriesScreen}></AdminRoute>


          <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
          ></AdminRoute>
          
          <Route path="/subcategory/:subcategoryId" component={CategoryScreen} exact></Route> 
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}


export default App;
