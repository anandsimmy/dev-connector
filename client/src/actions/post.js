import axios from 'axios'
import { setAlert } from './alert'
import {
    GET_POSTS,
    POST_ERROR,
    ADD_POST,
    ADD_POST_ERROR,
    DELETE_POST,
    DELETE_POST_ERROR,
    LIKE_POST,
    LIKE_ERROR,
    UNLIKE_POST,
    UNLIKE_ERROR,
    GET_POST_BY_ID,
    GET_POST_BY_ID_ERROR,
    ADD_COMMENT,
    ADD_COMMENT_ERROR,
    DELETE_COMMENT,
    DELETE_COMMENT_ERROR,
} from './types'

export const getPosts= () => async dispatch => {
    try {
        const res= await axios.get('/api/posts')
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR, 
            payload: { msg: err.response?.statusText, status: err.response?.status }
        })
    }
}

export const getPostById= (postId) => async dispatch => {
    try {
        const res= await axios.get(`/api/posts/${postId}`)

        dispatch({
            type: GET_POST_BY_ID,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_POST_BY_ID_ERROR, 
            payload: { msg: err.response?.statusText, status: err.response?.status }
        })
        dispatch(setAlert(err?.response?.data?.msg, 'danger', 2000))
    }
}

export const addPost= (text) => async dispatch => {
    try {
        const res= await axios.post('/api/posts/', { text }, {
            headers: {
                'Content-Type':  'application/json'
            }
        })

        dispatch({
            type: ADD_POST,
            payload: { post: res.data }
        })

        dispatch(setAlert('Post added successfully', 'success', 2000))
    } catch (err) {
        dispatch({
            type: ADD_POST_ERROR, 
            payload: { msg: err.response?.statusText, status: err.response?.status }
        })
        dispatch(setAlert(err?.response?.data?.msg, 'danger', 2000))
    }
}

export const deletePost= (postId) => async dispatch => {
    try {
        const res= await axios.delete(`/api/posts/${postId}`)

        dispatch({
            type: DELETE_POST,
            payload: { postId }
        })

        dispatch(setAlert(res.data.msg, 'success', 2000))
    } catch (err) {
        dispatch({
            type: DELETE_POST_ERROR, 
            payload: { msg: err.response?.statusText, status: err.response?.status }
        })
        dispatch(setAlert(err.response?.data?.msg, 'danger', 2000))
    }
}

export const likePost= (postId) => async dispatch => {
    try {
        const res= await axios.put(`/api/posts/like/${postId}`)
        dispatch({
            type: LIKE_POST,
            payload: {
                postId, 
                likes: res.data
            }
        })
    } catch (err) {
        dispatch({
            type: LIKE_ERROR, 
            payload: { msg: err.response?.statusText, status: err.response?.status }
        })
        dispatch(setAlert(err?.response?.data?.msg, 'danger', 2000))
    }
}

export const unlikePost= (postId) => async dispatch => {
    try {
        const res= await axios.put(`/api/posts/unlike/${postId}`)
        dispatch({
            type: UNLIKE_POST,
            payload: {
                postId,
                likes: res.data
            }
        })
    } catch (err) {
        dispatch({
            type: UNLIKE_ERROR, 
            payload: { msg: err.response?.statusText, status: err.response?.status }
        })
        dispatch(setAlert(err?.response?.data?.msg, 'danger', 2000))
    }
}

export const addComment= ({ text, postId }) => async dispatch => {
    try {
        const config= {
            'headers': {
                'Content-Type': 'application/json'
            }
        }

        const res= await axios.post(`/api/posts/comment/${postId}`, { text }, config)

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })

        dispatch(setAlert('Comment added successfully', 'success', 2000))
    } catch (err) {
        dispatch({
            type: ADD_COMMENT_ERROR, 
            payload: { msg: err.response?.statusText, status: err.response?.status }
        })
    }
}

export const deleteComment= ({ postId, commentId }) => async dispatch => {
    try {
        axios.delete(`/api/posts/comment/${postId}/${commentId}`)

        dispatch({
            type: DELETE_COMMENT,
            payload: commentId
        })

        dispatch(setAlert('Comment removed successfully', 'success', 2000))
    } catch (err) {
        dispatch({
            type: DELETE_COMMENT_ERROR, 
            payload: { msg: err.response?.statusText, status: err.response?.status }
        })   
    }
}