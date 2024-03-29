import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logoutUser } from '../../actions/auth'

const Navbar= ({ auth: { isAuthenticated, loading }, logoutUser }) => {

    const authLinks= (
    <ul>
        <li>
            <Link to='/profiles'>
                Developers
            </Link>
        </li>
        <li>
            <Link to='/posts'>
                <i className="fa fa-file-text"></i>{' '}
                <span className='hide-sm'>Posts</span>
            </Link>
        </li>
        <li>
            <Link to='/dashboard'>
                <i className="fas fa-user"></i>{' '}
                <span className='hide-sm'>Dashboard</span>
            </Link>
        </li>
        <li>
            <Link onClick={logoutUser} to='/'>
                <i className="fas fa-sign-out-alt"></i>{' '}
                <span className='hide-sm'>Logout</span>
            </Link>
        </li>
        
    </ul>)

    const guestLinks= (
        <ul>
            <li>
                <Link to='/profiles'>Developers</Link>
            </li>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </ul>)

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to='/'>
                    <i className="fas fa-code"></i> DevConnector
                </Link>
            </h1>
           {
               !loading && <Fragment>
                   {
                       isAuthenticated ? authLinks : guestLinks
                   }
               </Fragment>
           } 
        </nav>
    )
}

Navbar.propTypes= {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps= state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(Navbar)