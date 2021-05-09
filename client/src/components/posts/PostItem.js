import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import PropTypes from 'prop-types'
import { likePost, unlikePost, deletePost } from '../../actions/post'

const PostItem= ({ auth,
    post: { _id, user, name, avatar, text, date, likes, comments },
    likePost,
    unlikePost,
    deletePost 
}) => {
    return (
        <div className="post bg-white p-1 my-1">
                    <div>
                        <a href="profile.html">
                        <img
                            className="round-img"
                            src={avatar}
                            alt="profile-image"
                        />
                        <h4>{name}</h4>
                        </a>
                    </div>
                    <div>
                        <p className="my-1">
                            {text}
                        </p>
                        <p className="post-date">
                            Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
                        </p>

                        {/* like comment */}
                        <button type="button" className="btn btn-light" onClick={() => likePost(_id)}>
                            <i className="fas fa-thumbs-up"></i>{' '}
                            { likes.length > 0 && <span>{likes.length}</span> }
                            
                        </button>

                        {/* unlike comment */}
                        <button type="button" className="btn btn-light" onClick={() => unlikePost(_id)}>
                            <i className="fas fa-thumbs-down"></i>
                        </button>
                        <Link to={`/post/${_id}`} className="btn btn-primary">
                            Discussion { comments.length > 0 && <span className='comment-count'>{comments.length}</span> }
                        </Link>
                        {
                            !auth.loading && user === auth.user?._id && (
                                <button type="button" className="btn btn-danger" onClick={() => deletePost(_id)}>
                                    <i className="fas fa-times"></i>
                                </button>
                            )
                        }
                    </div>
                    </div>
    )
}

PostItem.propTypes = {
   post: PropTypes.object.isRequired,
   auth: PropTypes.object.isRequired,
   likePost: PropTypes.func.isRequired,
   unlikePost: PropTypes.func.isRequired,
   deletePost: PropTypes.func.isRequired,
}

const mapStateToProps= state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { likePost, unlikePost, deletePost })(PostItem)
