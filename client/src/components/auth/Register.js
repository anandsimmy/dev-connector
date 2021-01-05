import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setAlert } from '../../actions/alert'
import { registerUser } from '../../actions/auth'

const Register= ({ setAlert, registerUser }) => {

    const [formData, setFormData]= useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 }= formData

    const onChangeHandler= e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmitHandler= (e) => {
        e.preventDefault()
        if(password !== password2){
            setAlert('Passwords do not match', 'danger', 3000)
        }else {
            registerUser({ name, email, password })
            setFormData({ name: '', email: '', password: '', password2: '' })
        }
    }

    return (
        <>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={e => onSubmitHandler(e)}>
                <div className="form-group">
                <input 
                    type="text" 
                    placeholder="Name" 
                    name="name" 
                    value={name}
                    onChange={e => onChangeHandler(e)}
                    
                />
                </div>
                <div className="form-group">
                <input 
                    type="email" 
                    placeholder="Email Address" 
                    name="email"
                    value={email}
                    onChange={e => onChangeHandler(e)}
                    
                />
                <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
                    Gravatar email</small
                >
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    minLength="6"
                    value={password}
                    onChange={e => onChangeHandler(e)}
                    
                />
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    minLength="6"
                    value={password2}
                    onChange={e => onChangeHandler(e)}
                    
                />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to='/login'>Sign In</Link>
            </p>
        </>
    )
}

Register.propTypes= {
    setAlert: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired,
}

{/* using objects for mapDispatchToProps */}
const mapDispatchToProps= { setAlert, registerUser }

export default connect(null, mapDispatchToProps)(Register)

