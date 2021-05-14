import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import PropTypes from 'prop-types'

const PostComments= ({ comments, auth }) => {
    return (
        <div className="comments">
        {
            comments?.length > 0 &&
                comments.map(({ _id, name, avatar, user, text, date }) => (
                    <div key={_id} className="post bg-white p-1 my-1">
                    <div>
                        <Link to={`/profile/${user}`}>
                        <img
                            className="round-img"
                            src={avatar}
                            alt="profile-image"
                        />
                        <h4>{name}</h4>
                        </Link>
                    </div>
                    <div>
                        <p className="my-1">
                            {text}
                        </p>
                        <p className="post-date">
                            Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
                        </p>
                        {
                            auth.user?._id === user && (
                                <button type="button" className="btn btn-danger">
                                    <i className="fas fa-times"></i>
                                </button>
                            )
                        }
                    </div>
                </div>
                ))
                
        }
        </div>        
    )
}

PostComments.defaultProps= {
    comments: [],
    auth: {}
}

PostComments.propTypes = {
    comments: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired,
}

export default PostComments

