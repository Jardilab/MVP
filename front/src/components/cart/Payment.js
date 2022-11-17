import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import uuid from "react-native-uuid"
import { clearErrors, createOrder } from '../../actions/orderActions';
import MetaData from '../layout/MetaData';
import { useAlert } from 'react-alert';
import CheckoutSteps from './CheckOutSteps';

export const Payment = () => {
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
    const id = uuid.v4()
    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const { error } = useSelector(state => state.newOrder)

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors)
        }
    }, [dispatch, alert, error])

    let items = [];

    cartItems.forEach(elem => {
        items.push({
            name: elem.name,
            quantity: elem.quantity,
            imagen: elem.imagen,
            price: elem.price,
            product: elem.product
        })
    })

    const order = {
        items,
        shippingInfo: shippingInfo
    }

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
        order.paymentInfo = {
            id: id,
            status: "Accepted"
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(createOrder(order))
            localStorage.removeItem("cartItems")
            window.alert("Order registered successfully")
            navigate("/success")
            window.location.reload(false)
        } catch (error) {
            window.alert("Failed to register purchase")
        }
    }
    return (
        <Fragment>
            <MetaData title={'Payment'} />
            <CheckoutSteps shipping confirmOrder payment />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler} >
                        <h3 className="mb-4">Card data</h3>
                        <div className="form-group">
                            <label htmlFor="card_num_field">Card data</label>
                            <input
                                type="number"
                                id="card_num_field"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="card_exp_field">Expiration date</label>
                            <input
                                type="text"
                                id="card_exp_field"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="card_cvc_field">CVC</label>
                            <input
                                type="number"
                                id="card_cvc_field"
                                className="form-control"
                            />
                        </div>
                        <button
                            id="pay_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            Pay ${` - ${orderInfo && orderInfo.totalPrice}`}
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}