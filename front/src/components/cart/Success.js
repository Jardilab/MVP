import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'

export const Success = () => {
    return (
        <Fragment>
            <MetaData title={'Order Successful'} />
            <div className="row justify-content-center">
                <div className="col-6 mt-5 text-center">
                    <img className="my-5 img-fluid d-block mx-auto" src="/images/orderOk.jpeg" alt="Order successful" width="200" height="200" />
                    <h3>Order successfully registered</h3>
                    <Link to="/">Return E-Commerce</Link>
                </div>
            </div>
        </Fragment>
    )
}