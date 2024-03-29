import axios from 'axios'
import { setAlert } from './alert'
import { CLEAR_PROFILE, GET_PROFILE, GET_ALL_PROFILES, GET_REPOS, PROFILE_ERROR, UPDATE_PROFILE, ACCOUNT_DELETED } from './types'

//get profile data
export const getCurrentProfile=() => async (dispatch) => {
       try {
            const res= await axios.get('/api/profile/me')
            dispatch({
                type: GET_PROFILE, 
                payload: res.data
            })
       } catch (err) {

            dispatch({ type: CLEAR_PROFILE })

            dispatch({
                type: PROFILE_ERROR, 
                payload: { msg: err.response.data.msg, status: err.response.status }
            })
       } 
}

//get all profiles
export const getAllProfiles=() => async (dispatch) => {
    dispatch({ type: CLEAR_PROFILE })

    try {
         const res= await axios.get('/api/profile')
         dispatch({
             type: GET_ALL_PROFILES, 
             payload: res.data
         })
    } catch (err) {
         dispatch({
             type: PROFILE_ERROR, 
             payload: { msg: err.response.data.msg, status: err.response.status }
         })
    } 
}

//get profile by id
export const getProfileById= userId => async (dispatch) => {

    try {
         const res= await axios.get(`/api/profile/user/${userId}`)
         dispatch({
             type: GET_PROFILE, 
             payload: res.data
         })
    } catch (err) {
         dispatch({
             type: PROFILE_ERROR, 
             payload: { msg: err?.response?.data?.msg, status: err?.response?.status }
         })
    } 
}

//get github repos
export const getGithubRepos= username => async (dispatch) => {

    try {
         const res= await axios.get(`/api/profile/github/${username}`)
         dispatch({
             type: GET_REPOS, 
             payload: res.data
         })
    } catch (err) {
         dispatch({
             type: PROFILE_ERROR, 
             payload: { msg: err.response.data.msg, status: err.response.status }
         })
    } 
}

//create profile
export const createProfile= (formData, history, edit=false) => async dispatch => {
    try {
        const config= {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res= await axios.post('/api/profile/', formData, config)

        dispatch({
            type: GET_PROFILE, 
            payload: res.data
        })

        dispatch(setAlert(edit ? 'Profile Updated Successfully': 'Profile Created Successfully', 'success'))

        if(!edit){
            history.push('/dashboard')
        }
    } catch (err) {
        const errors= err.response?.data?.errors
        errors?.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        dispatch({
            type: PROFILE_ERROR, 
            payload: { msg: err.response.data.msg, status: err.response.status }
        })
    }
}

//add experience
export const addExperience= (formData, history) => async dispatch => {
    try {
        const config= {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res= await axios.put('/api/profile/experience', formData, config)

        dispatch({
            type: UPDATE_PROFILE, 
            payload: res.data
        })

        dispatch(setAlert('Experience added successfully', 'success'))

        history.push('/dashboard')
    } catch (err) {
        const errors= err.response?.data?.errors
        errors?.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        dispatch({
            type: PROFILE_ERROR, 
            payload: { msg: err.response.data.msg, status: err.response.status }
        })
    }
}

//add education
export const addEducation= (formData, history) => async dispatch => {
    try {
        const config= {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res= await axios.put('/api/profile/education', formData, config)

        dispatch({
            type: UPDATE_PROFILE, 
            payload: res.data
        })

        dispatch(setAlert('Education added successfully', 'success'))

        history.push('/dashboard')
    } catch (err) {
        const errors= err.response?.data?.errors
        errors?.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        dispatch({
            type: PROFILE_ERROR, 
            payload: { msg: err.response.data.msg, status: err.response.status }
        })
    }
}

//delete experience
export const deleteExperience= (id) => async dispatch => {
    try {
        const res= await axios.delete(`/api/profile/experience/${id}`)

        dispatch({
            type: UPDATE_PROFILE, 
            payload: res.data
        })

        dispatch(setAlert('Experience deleted', 'success'))

    } catch (err) {
        const errors= err.response?.data?.errors
        errors?.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        dispatch({
            type: PROFILE_ERROR, 
            payload: { msg: err.response.data.msg, status: err.response.status }
        })
    }
}

//delete education
export const deleteEducation= (id) => async dispatch => {
    try {
        const res= await axios.delete(`/api/profile/education/${id}`)

        dispatch({
            type: UPDATE_PROFILE, 
            payload: res.data
        })

        dispatch(setAlert('Education deleted', 'success'))

    } catch (err) {
        const errors= err.response?.data?.errors
        errors?.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        dispatch({
            type: PROFILE_ERROR, 
            payload: { msg: err.response.data.msg, status: err.response.status }
        })
    }
}

//delete account
export const deleteAccount= (id) => async dispatch => {
    if(window.confirm('Are you sure? This action can NOT be undone')){
        try {
            const res= await axios.delete('/api/profile')
    
            dispatch({ type: CLEAR_PROFILE })
            dispatch({ type: ACCOUNT_DELETED })
    
            dispatch(setAlert('Your account has been permanently deleted'))
    
        } catch (err) {
            const errors= err.response?.data?.errors
            errors?.forEach(error => dispatch(setAlert(error.msg, 'danger')))
            dispatch({
                type: PROFILE_ERROR, 
                payload: { msg: err.response.data.msg, status: err.response.status }
            })
        }
    }
}