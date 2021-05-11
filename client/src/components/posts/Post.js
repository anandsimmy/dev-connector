import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PostComments from './PostComments'
import NewPostComment from './NewPostComment'
import { getPostById } from '../../actions/post'
import PropTypes from 'prop-types'

const Post= ({ match: { params: { postId } }, getPostById, post: {
    _id,
    name,
    avatar,
    user, 
    text,
    date,
    comments,
    likes
} }) => {

    useEffect(() => {
        getPostById(postId)
    }, [])

    return (
        <>
            <Link to='/posts' className="btn">Back To Posts</Link>
            <div className="post bg-white p-1 my-1">
                <div>
                    <Link to={`/profile/${user}}`}>
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
                </div>
            </div>

            <NewPostComment />

            <PostComments comments={comments} />
        </>
    )
}

Post.propTypes = {
    match: PropTypes.object.isRequired,
    getPostById: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps= state => ({
    post: state.post.post
})

export default connect(mapStateToProps, { getPostById })(Post)

