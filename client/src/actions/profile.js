import axios from 'axios'
import { setAlert } from './alert'
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from './types'

//get profile data
export const getCurrentProfile=() => async (dispatch) => {
       try {
            const res= await axios.get('/api/profile/me')
            dispatch({
                type: GET_PROFILE, 
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
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        dispatch({
            type: PROFILE_ERROR, 
            payload: { msg: err.response.data.msg, status: err.response.status }
        })
    }
}

//add experience
export const addExperience= () => async dispatch => {
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
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        dispatch({
            type: PROFILE_ERROR, 
            payload: { msg: err.response.data.msg, status: err.response.status }
        })
    }
}

//add experience
export const addEducation= () => async dispatch => {
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
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        dispatch({
            type: PROFILE_ERROR, 
            payload: { msg: err.response.data.msg, status: err.response.status }
        })
    }
}