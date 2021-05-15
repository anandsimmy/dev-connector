import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addComment } from '../../actions/post'

const NewPostComment= ({ addComment, postId }) => {

    const [comment, setComment]= useState('')

    const onSubmit= (e) => {
        e.preventDefault()
        addComment({
            text: comment,
            postId
        })
        setComment('')
    }

    return (
        <div className="post-form">
            <div className="bg-primary p">
            <h3>Leave A Comment</h3>
            </div>
            <form className="form my-1" onSubmit={onSubmit}>
            <textarea
                name="text"
                cols="30"
                rows="5"
                placeholder="Comment on this post"
                value={comment}
                onChange={e => setComment(e.target.value)}
                required
            ></textarea>
            <input type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
    )
}

NewPostComment.defaultProps = {
    postId: '',
    addComment: () => {},
}

NewPostComment.propTypes = {
    postId: PropTypes.string.isRequired,
    addComment: PropTypes.func.isRequired,
}

export default connect(null, { addComment })(NewPostComment)
