import { GET_PROFILE, GET_ALL_PROFILES, GET_REPOS, PROFILE_ERROR, CLEAR_PROFILE, UPDATE_PROFILE } from '../actions/types'

const initialState= {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}

const profileReducer= (state= initialState, action) => {

    const { type, payload }= action

    switch(type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false,
                error: {}
            }
        case GET_ALL_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false,
                error: {}
            }
        case GET_REPOS:
            return {
                ...state,
                repos: payload,
                loading: false,
                error: {}
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state
    }

}

export default profileReducer