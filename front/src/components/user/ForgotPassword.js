import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, clearErrors } from '../../actions/userActions'

export const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const alert = useAlert();
    const dispatch = useDispatch();
    const { error, loading, message } = useSelector(state => state.forgotPassword)

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (message) {
            alert.success(message)
        }
    }, [dispatch, alert, error, message])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('email', email);

        dispatch(forgotPassword(formData))
    }
    return (
        <Fragment>
            <MetaData title={'Forget Password'} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h3 className="mb-3 text-center">Forgot my password</h3>
                        <div classNameName="form-group">
                            <label htmlFor="email_field">Registered email</label>
                            <input type="email" id="email_field" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button
                            id="forgot_password_button" type="submit" className="btn btn-block py-2" disabled={loading ? true : false} >
                            Recover password
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default ForgotPassword