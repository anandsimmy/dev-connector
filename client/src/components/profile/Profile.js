import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProfileById } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'

const Profile= ({ match, profile: { profile, loading }, auth, getProfileById }) => {

    useEffect(() => {
        getProfileById(match.params.id)
    }, [getProfileById])

    return (
        <>
            {
                (profile === null) ? <Spinner /> : (
                    <>
                        <Link to='/profiles' className='btn btn-light'>Back to Profiles</Link>
                        {(auth.isAuthenticated && !auth.loading && auth.user._id === profile.user) && (
                            <Link to='/edit-profile' className='btn btn-dark'>Edit Profile</Link>
                        ) }
                    </>
                )
            }
        </>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps= state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { getProfileById })(Profile)

