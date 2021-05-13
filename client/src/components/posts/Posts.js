import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import NewPost from './NewPost'
import PostItem from './PostItem'
import Spinner from '../layout/Spinner'
import { getPosts } from '../../actions/post'

const Posts= ({ post: { posts, loading }, getPosts }) => {

    useEffect(() => {
        getPosts()
    }, [getPosts])

    return (
        <>
           {!loading && posts?.length > 0 ?  (
               <>
                    <h1 className="large text-primary">
                        Posts
                    </h1>
                    <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>
                    <NewPost />
                    <div className="posts">
                        {
                            posts.map((post) => {
                                return (
                                    <PostItem key={post._id} post={post} />
                                )
                            })
                        }       
                    </div>
               </>
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

