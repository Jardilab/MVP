import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckOutSteps';

export const ConfirmOrder = () => {
    const navigate = useNavigate();
    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)

    const itemsPrice = cartItems.reduce((acc, item) => acc + item.precio * item.quantity, 0)
    const shippingPrice = itemsPrice > 125000 ? 0 : 12000
    const taxPrice = Number((0.19 * itemsPrice).toFixed(2))
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2)

    const processToPayment = () => {
        const data = {
            precioItems: itemsPrice.toFixed(2),
            shippingPrice,
            taxPrice ,
            totalPrice
        }
        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        navigate("/payment")
    }
    return (
        <Fragment>
            <MetaData title={'Confirmar Orden'} />
            <CheckoutSteps shipping confirmOrder />
            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-confirm">
                    <h3 className="mb-3">Shipment information</h3>
                    <p><b>Name:</b> {user && user.name}</p>
                    <p><b>Phone:</b> {shippingInfo.phone}</p>
                    <p className="mb-4"><b>Address:</b> {`${shippingInfo.address}, ${shippingInfo.city} ${shippingInfo.departament}`}</p>
                    <hr />
                    <h3 className="mt-4">Products added the shopping cart:</h3>
                    {cartItems.map(item => (
                        <Fragment>
                            <hr />
                            <div className="cart-item my-1" key={item.product}>
                                <div className="row">
                                    <div className="col-4 col-lg-2">
                                        <img src={item.imagen} alt={item.nombre} height="45" width="65" />
                                    </div>
                                    <div className="col-5 col-lg-6">
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </div>
                                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                        <p>{item.quantity} x ${item.price} = <b>${(item.quantity * item.price).toFixed(2)}</b></p>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </Fragment>
                    ))}
                </div>
                <div className="col-12 col-lg-3 my-4 text-justify">
                    <div id="order_summary">
                        <h4>Purchase Summary</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">${itemsPrice}</span></p>
                        <p>Shipping Cost: <span className="order-summary-values">${shippingPrice}</span></p>
                        <p>Taxes:  <span className="order-summary-values">${taxPrice}</span></p>
                        <hr />
                        <p>Total: <span className="order-summary-values">${totalPrice}</span></p>
                        <hr />
                        <button id="checkout_btn" className="btn btn-primary btn-block" onClick={processToPayment}>Proceed with payment</button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
