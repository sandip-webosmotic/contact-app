import React, { useState, useEffect } from 'react'
import { Localstorage } from '../service/Localstorage'
import uuid from 'react-uuid'
import { useNavigate } from 'react-router-dom'

function Registration() {
    let navigate = useNavigate()
    const [values, setValues] = useState({
        id: uuid(),
        email: '',
        password: '',
        contacts: []
    })
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false);

    const validate = (values) => {
        const errors = {};
        // eslint-disable-next-line no-useless-escape
        const emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        if (!values.email) {
            errors.email = "Email is required";
        } else if (!emailRegex.test(values.email)) {
            errors.email = "This is not a valid email format";
        }

        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 character";
        } else if (values.password.length > 10) {
            errors.password = "Password cannot exceed more than 10 character";
        }
        return errors;
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log("formValues", values);
        }
    }, [formErrors])

    const changeValue = (e) => {
        let key = e.target.id
        let value = e.target.value
        setValues({ ...values, [key]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(values));
        setIsSubmit(true);    
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            navigate('/login');
            e.target.reset();
            return Localstorage.addData(values) 
        }
    }
    return (
        <div className='container' style={{ marginTop: "9%" }}>
            <div className="d-flex justify-content-center">
                <form className='col-sm-6 p-5 border' onSubmit={handleSubmit}>
                    <div className="mb-3 row">
                        <div className="col-sm-12">
                            <label className="form-label">Email</label>
                            <input type="text" className="form-control" id="email" onChange={e => changeValue(e)} />
                            <div className="text-danger">
                                {formErrors.email}
                            </div>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <div className="col-sm-12">
                            <label className="form-label">Password</label>
                            <input type="text" className="form-control" id="password" onChange={e => changeValue(e)} />
                            <div className="text-danger">
                                {formErrors.password}
                            </div>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <div className="col-sm-5">
                            <button className="btn btn-primary" type="submit">Register</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Registration;