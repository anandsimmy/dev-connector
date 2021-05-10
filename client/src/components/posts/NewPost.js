import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addPost } from '../../actions/post'

const NewPost= ({ addPost }) => {

    const [post, setPost]= useState('')

    const handleSubmit= (e) => {
        e.preventDefault()
        addPost(post)
        setPost('')
    }

    return (
        <div className="post-form">
            <div className="bg-primary p">
            <h3>Say Something...</h3>
            </div>
            <form className="form my-1">
            <textarea
                name="text"
                cols="30"
                rows="5"
                placeholder="Create a post"
                value={post}
                onChange={e => setPost(e.target.value)}
                required
            ></textarea>
            <input onClick={handleSubmit} type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
    )
}

NewPost.propTypes = {
    addPost: PropTypes.func.isRequired,
}

export default connect(null, { addPost })(NewPost)

