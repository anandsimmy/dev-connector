import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import PostComments from './PostComments'
import NewPostComment from './NewPostComment'
import { getPostById, deleteComment } from '../../actions/post'
import PropTypes from 'prop-types'

const Post= ({ match: { params: { postId } }, auth, getPostById, deleteComment, post: {
    _id,
    name,
    avatar,
    user, 
    text,
    date,
    comments
} }) => {

    useEffect(() => {
        getPostById(postId)
    }, [])

    return (
        <>
            <Link to='/posts' className="btn">Back To Posts</Link>
            <div className="post bg-white p-1 my-1">
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
                    <p className="my-1">{text}</p>
                    <p className="post-date">
                            Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
                        </p>
                </div>
            </div>

            

            <PostComments
                postId={_id}
                comments={comments}
                deleteComment={deleteComment}
                auth={auth} 
            />
        </>
    )
}

Post.propTypes = {
    match: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getPostById: PropTypes.func.isRequired,
}

const mapStateToProps= state => ({
    post: state.post.post,
    auth: state.auth
})

export default connect(mapStateToProps, { getPostById, deleteComment })(Post)

