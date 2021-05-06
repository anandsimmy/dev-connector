import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import { getPosts } from '../../actions/post'

const Posts= ({ post: { posts, loading }, getPosts }) => {

    useEffect(() => {
        getPosts()
    }, [getPosts])

    return (
        <>
           {!loading ?  (
               <>Posts fetched</>
               ) : (<Spinner />)
           }
        </>
    )
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps= state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPosts })(Posts)

