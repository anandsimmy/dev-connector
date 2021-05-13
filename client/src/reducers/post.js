import {
    GET_POSTS,
    POST_ERROR,
    ADD_POST,
    LIKE_POST,
    UNLIKE_POST,
    DELETE_POST,
    ADD_POST_ERROR,
    LIKE_ERROR,
    UNLIKE_ERROR,
    DELETE_POST_ERROR,
    GET_POST_BY_ID,
    GET_POST_BY_ID_ERROR
} from '../actions/types'

const initialState= {
    posts: [],
    post: {},
    loading: true,
    error: null
}

const postReducer= (state= initialState, action) => {

    const { type, payload }= action
    
    switch(type){
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            }
        case ADD_POST:
        return {
            ...state,
            posts: [ payload.post, ...state.posts]
        }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload.postId)
            }
        case LIKE_POST:
        case UNLIKE_POST:
            return {
                ...state,
                posts: state.posts.map(post => post._id === payload.postId ? {...post, likes: payload.likes} : post)
            }
        case GET_POST_BY_ID:
            return {
                ...state,
                post: payload
            }
        case POST_ERROR:
        case ADD_POST_ERROR:
        case DELETE_POST_ERROR:
        case LIKE_ERROR:
        case UNLIKE_ERROR:
        case GET_POST_BY_ID_ERROR:    
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state
    }
}

export default postReducer