import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/Provider'
import { useNavigate, Link } from 'react-router-dom'

function Login() {
    let navigate = useNavigate()
    let auth = useAuth()
    let loginDetails = JSON.parse(localStorage.getItem('users'));
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false);

    const [values, setValues] = useState({
        email: '',
        password: '',
    })

    const changeValue = (e) => {
        let key = e.target.id
        let value = e.target.value
        setValues({ ...values, [key]: value })
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log("formValues", values);
        }
    }, [formErrors])

    const validate = (values) => {
        const errors = {};
        // eslint-disable-next-line no-useless-escape
        const emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        let getItem = ""
        if (loginDetails) {
            getItem = loginDetails.find((obj) => obj);
        }
        if (!values.email) {
            errors.email = "Email is required";
        } else if (!emailRegex.test(values.email)) {
            errors.email = "This is not a valid email format";
        } else if (values.email !== getItem.email) {
            errors.email = "Email Address is not Match";
        }

        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 character";
        } else if (values.password.length > 10) {
            errors.password = "Password cannot exceed more than 10 character";
        } else if (values.cpassword !== getItem.password) {
            errors.password = "Password is not Match";
        }
        return errors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(values))
        setIsSubmit(true);
        var user
          loginDetails.forEach(element => {
            if (element.email !== values.email && element.password !== values.password) {
              user = ''
            } else {
              user = element.email.concat('_token')
              let loginDetails = {id:element.id}
              localStorage.setItem('loginDetails', JSON.stringify(loginDetails));
              auth.signin(user, (e) => {
                navigate('/home', { replace: true })
              })
            }})
    }

    return (
        <div className='container' style={{ marginTop: "9%" }}>
            <div className="d-flex justify-content-center">
                <form className='col-sm-6 p-5 border' onSubmit={handleSubmit} style={{boxShadow: "rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px, rgba(240, 46, 170, 0.05) 25px 25px"}}>
                    <div className="mb-3 row">
                        <div className="col-sm-12">
                            <label className="form-label">Email</label>
                            <input type="text" className="form-control" placeholder='Enter Your Email' name='email' id="email" onChange={e => changeValue(e)} />
                            <div className="text-danger">
                                {formErrors.email}
                            </div>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <div className="col-sm-12">
                            <label className="form-label">Password</label>
                            <input type="text" className="form-control" id="password" name='password' placeholder='Enter Your Password' onChange={e => changeValue(e)} />
                            <div className="text-danger">
                                {formErrors.password}
                            </div>
                        </div>
                    </div>
                    {/* <div className="mb-3 row">
                        <div className="col-sm-12">
                            <label className="form-label">Confirm Password</label>
                            <input type="text" className="form-control" id="cpassword" name='cpassword' onChange={e => changeValue(e)}/>
                            <div className="text-danger">
                            {formErrors.cpassword}
                            </div>
                        </div>
                    </div> */}

                    <div className="mb-3 row">
                        <div className="col-sm-2">
                            <button className="btn btn-primary" type="submit">Login</button>
                        </div>
                        <div className="col-sm-5 mt-2">
                            <Link to="/registration" >Create an account</Link>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;