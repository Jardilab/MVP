import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingInfo } from '../../actions/cartActions';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from './CheckOutSteps';

export const Shipping = () => {
    let Country = require('./colombia.json');
    const navigate = useNavigate()
    const { shippingInfo } = useSelector(state => state.cart)
    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [phone, setPhone] = useState(shippingInfo.phone)
    const [departament, setDepartament] = useState(shippingInfo.departament)
    const [cities, setCities] = useState([])

    useEffect(() => {
        Country.forEach((depar) => {
            if (depar.departament === departament) {
                setCities(depar.cities)
            }
        })
    })
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingInfo({ address, city, phone, departament }))
        navigate("/order/confirm")
    }
    return (
        <Fragment>
            <MetaData title={'shippingInfo'} />
            <CheckoutSteps shipping />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onClick={submitHandler}>
                        <h3 className="mb-4 text-center">Shipping information</h3>
                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone_field">Phone</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="country_field">Departament</label>
                            <select
                                id="country_field"
                                className="form-control"
                                value={departament}
                                onChange={(e) => setDepartament(e.target.value)}
                                required
                            >
                                {Country.map(dep => (
                                    <option key={dep.departament} value={dep.departament}>
                                        {dep.departament}
                                    </option>
                                ))}
                            </select>
                            <div className="form-group">
                                <label htmlFor="city_field">City</label>
                                <select
                                    id="city_field"
                                    className="form-control"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                >
                                    {cities.map(city => (
                                        <option key={city} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-2"
                        >
                            Continue
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Shipping