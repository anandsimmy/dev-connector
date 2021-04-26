import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Spinnner from '../layout/Spinner'
import ProfileItem from './ProfileItem'
import { getAllProfiles } from '../../actions/profile'

const Profiles= ({ getAllProfiles, profile: { profiles, loading } }) => {

    useEffect(() => {
        getAllProfiles()
    }, [])

    return (
        <Fragment>
            {
                loading ? <Spinnner /> : 
                <Fragment>
                    <h1 className="large text-primary">Developers</h1>
                    <p className="lead">
                        <i className="fab fa-connectdevelop"></i> Browse and connect with developers
                    </p>
                    <div className="profiles">
                        {
                            profiles.length > 0 ? (
                                profiles.map((profile) => (
                                    <ProfileItem key={profile._id} profile={profile} />
                                ))
                            ) : 
                            <h1>Sorry, no profiles found!</h1>
                        }
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}

Profiles.propTypes = {
    getAllProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps= (state) => ({
    profile: state.profile
})
export default connect(mapStateToProps, { getAllProfiles })(Profiles)

