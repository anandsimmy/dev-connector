import React from 'react'
import PropTypes from 'prop-types'

const NewPostComment= () => {
    return (
        <div className="post-form">
            <div className="bg-primary p">
            <h3>Leave A Comment</h3>
            </div>
            <form className="form my-1">
            <textarea
                name="text"
                cols="30"
                rows="5"
                placeholder="Comment on this post"
                required
            ></textarea>
            <input type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
    )
}

NewPostComment.propTypes = {

}

export default NewPostComment

