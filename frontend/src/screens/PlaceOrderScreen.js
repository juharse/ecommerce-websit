import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push('/payment');
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);
  return (
    <div className="container">
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="row">
        <div className="col-lg-8">
          <div className="card mb-3">
            <div className="card-body">
              <h2 className="card-title">Shipping</h2>
              <p className="card-text">
                <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                <strong>Address: </strong> {cart.shippingAddress.address},
                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                ,{cart.shippingAddress.country}
              </p>
            </div>
          </div>
          <div className="card mb-3">
            <div className="card-body">
              <h2 className="card-title">Payment</h2>
              <p className="card-text">
                <strong>Method:</strong> {cart.paymentMethod}
              </p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Order Items</h2>
              <ul className="list-group list-group-flush">
                {cart.cartItems.map((item) => (
                  <li key={item.product} className="list-group-item">
                    <div className="row align-items-center">
                      <div className="col-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid"
                        />
                      </div>
                      <div className="col">
                        <Link to={`/product/${item.product}`}>
                          {item.name}
                        </Link>
                      </div>
                      <div className="col">
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Order Summary</h2>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Items
                  <span>${cart.itemsPrice.toFixed(2)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Shipping
                  <span>${cart.shippingPrice.toFixed(2)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Tax
                  <span>${cart.taxPrice.toFixed(2)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <strong>Total</strong>
                  <strong>${cart.totalPrice.toFixed(2)}</strong>
                </li>
                <li className="list-group-item">
                  <button
                    type="button"
                    onClick={placeOrderHandler}
                    className="btn btn-primary btn-lg btn-block"
                    disabled={cart.cartItems.length === 0}
                  >
                    Place Order
                  </button>
                </li>
              </ul>
              {loading && <LoadingBox />}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
