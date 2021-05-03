import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'
import { getProfileById } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'

const Profile= ({ match, profile: { profile, loading }, auth, getProfileById }) => {

    useEffect(() => {
        getProfileById(match.params.id)
    }, [getProfileById, match.params.id])

    return (
        <>
            {
                (profile === null) ? <Spinner /> : (
                    <>
                        <Link to='/profiles' className='btn btn-light'>Back to Profiles</Link>
                        {(auth.isAuthenticated && !auth.loading && auth.user._id === profile.user) && (
                            <Link to='/edit-profile' className='btn btn-dark'>Edit Profile</Link>
                        )}
                        <div className='profile-grid my-1'>
                            <ProfileTop profile={profile} />
                            <ProfileAbout profile={profile} />
                            <div className="profile-exp bg-white p-2">
                                <h2 className="text-primary">Experience</h2>
                                {
                                    profile.experience.length > 0 ? (
                                        profile.experience.map((exp, index) => {
                                            return <ProfileExperience key={index} experience={exp} />
                                        })
                                    ) : <h4>No experience credentials</h4>
                                }
                            </div>
                            <div className="profile-edu bg-white p-2">
                                <h2 className="text-primary">Education</h2>
                                {
                                    profile.education.length > 0 ? (
                                        profile.education.map((edu, index) => {
                                            return <ProfileEducation key={index} education={edu} />
                                        })
                                    ) : <h4>No education credentials</h4>
                                }
                            </div>
                            {profile.githubusername && <ProfileGithub username={profile.githubusername} />}
                        </div>
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

