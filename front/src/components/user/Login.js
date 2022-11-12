import React, { Fragment } from 'react'
import MetaData from '../layout/MetaData'
import { Link } from "react-router-dom"

export const Login = () => {
    return (
        <Fragment>
            <MetaData title={"Sign In"} />
            <div className='row wrapper'>
                <div className='col-10 col-lg-5'>
                    <form className='shadow-lg'>
                        <h3 className='mb-3 text-center'>Sign in to HotWheels</h3>
                        {/*Field email*/}
                        <div className='form-group'>
                            <label htmlFor='email_field'>Email</label>
                            <input type="email" id="email_field" className='form-control'></input>
                        </div>
                        {/*Field password*/}
                        <div className='form-group'>
                            <label htmlFor='password_field'>Password</label>
                            <input type="password" id="password_field" className='form-control'></input>
                        </div>
                        <Link to="/password/forgot" className='float-right mb-3 text-center'>Forgot password?</Link>
                        {/*Button Sign Up*/}
                        <button id="login_button" type="submit" className='btn btn-block py-2'>Sign in</button>
                        <Link to="/register" className='float-right mt-3 text-center'>New to HotWheels? Create an account.</Link>
                    </form>
                </div>

                
                {/* <div className='zeroclipboard-container position-absolute right-5 top-5'>
                    <form className='shadow-lg'>
                        <Link to="/register" className='float-right mt-3 text-center'>New to HotWheels? Create an account.</Link>
                    </form>
                </div> */}

                {/* <div className='container position-absolute right-0 top-0'>
                    <div className='col-8 col-lg-4'>
                        <form className='shadow-lg'>
                        <Link to="/register" className='float-right mt-3 text-center'>New to HotWheels? Create an account.</Link>
                        </form>
                    </div>                  
                </div> */}

            </div>
        </Fragment>
    )
}
