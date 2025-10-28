import {
    UPDATE_NETWORK_ERROR_STATE,
    DEFAULT_NETWORK_ERROR_STATE,
    DEFAULT_HOST_ERROR_STATE
} from '@Constants'

import axios from 'axios'

import type { Current_Redux_State } from '@Redux_Thunk/Combined_Reducers'
import type { AppDispatch } from '@Redux_Thunk/Provider'


export const Notify_Email_Owner_About_Unregistered_Login_Attempt = (email_address_owner: string) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {
    let state = getState()
    let language_state = state.Application_Language_State_Reducer
    let account_state = state.End_User_Account_State_Reducer

    let response: any = await axios.post(`/api/node_mailer/notification/unregistered/login/email_address`, {
        email_address: email_address_owner,
        language: language_state.current_language.split(`-`)[0],
        region: language_state.current_language.split(`-`)[1],
        local_time: new Date().getTime() + (new Date().getTimezoneOffset() * 60000),
        location: Intl.DateTimeFormat().resolvedOptions().timeZone,
        date: new Date().toLocaleDateString(),
        user_agent: account_state.user_agent
    }).catch(async (error) => {
        return await new Promise((reject) => {

            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })

            setTimeout(() => {
                dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 8000)

            reject(error)

        })
    })

    if (response) {
        dispatch({
            type: UPDATE_NETWORK_ERROR_STATE, payload: {
                id: `Email-Account-Not-Registered`
            }
        })
    } else {
        dispatch({
            type: UPDATE_NETWORK_ERROR_STATE, payload: {
                id: `Email-Account-Not-Registered-Failed`
            }
        })
    }
}

export const Notify_Webmaster_via_Email_Message_About_Conflict_Client = (suspicious_email_address: string) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {
    let state = getState()
    let language_state = state.Application_Language_State_Reducer
    let account_state = state.End_User_Account_State_Reducer

    let response: any = await axios.post(`/api/node_mailer/notification/invalid/client/conflict`, {
        email_address: suspicious_email_address,
        language: language_state.current_language.split(`-`)[0],
        region: language_state.current_language.split(`-`)[1],
        local_time: new Date().getTime() + (new Date().getTimezoneOffset() * 60000),
        location: Intl.DateTimeFormat().resolvedOptions().timeZone,
        date: new Date().toLocaleDateString(),
        user_agent: account_state.user_agent
    }).catch(async (error) => {
        return await new Promise((reject) => {

            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })

            setTimeout(() => {
                dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 8000)

            reject(error)

        })
    })

    if (response) {
        dispatch({
            type: UPDATE_NETWORK_ERROR_STATE, payload: {
                id: `Email-Account-Not-Registered`
            }
        })
    } else {
        dispatch({
            type: UPDATE_NETWORK_ERROR_STATE, payload: {
                id: `Email-Account-Not-Registered-Failed`
            }
        })
    }
}

export const Notify_Webmaster_via_Email_Message_About_Bad_Request_Client = (suspicious_email_address: string) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {
    let state = getState()
    let language_state = state.Application_Language_State_Reducer
    let account_state = state.End_User_Account_State_Reducer

    let response: any = await axios.post(`/api/node_mailer/notification/invalid/client/bad_request`, {
        email_address: suspicious_email_address,
        language: language_state.current_language.split(`-`)[0],
        region: language_state.current_language.split(`-`)[1],
        local_time: new Date().getTime() + (new Date().getTimezoneOffset() * 60000),
        location: Intl.DateTimeFormat().resolvedOptions().timeZone,
        date: new Date().toLocaleDateString(),
        user_agent: account_state.user_agent
    }).catch(async (error) => {
        return await new Promise((reject) => {

            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })

            setTimeout(() => {
                dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 8000)

            reject(error)

        })
    })

    if (response) {
        dispatch({
            type: UPDATE_NETWORK_ERROR_STATE, payload: {
                id: `Email-Account-Not-Registered`
            }
        })
    } else {
        dispatch({
            type: UPDATE_NETWORK_ERROR_STATE, payload: {
                id: `Email-Account-Not-Registered-Failed`
            }
        })
    }
}

export const Notify_Email_Owner_About_Post_Registration = (email_address: string) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {
    let state = getState()
    let language_state = state.Application_Language_State_Reducer
    let account_state = state.End_User_Account_State_Reducer

    let response: any = await axios.post(`/api/authentication/login/email_password_account/notification`, {
        email_address: email_address,
        language: language_state.current_language.split(`-`)[0],
        region: language_state.current_language.split(`-`)[1],
        local_time: new Date().getTime() + (new Date().getTimezoneOffset() * 60000),
        location: Intl.DateTimeFormat().resolvedOptions().timeZone,
        date: new Date().toLocaleDateString(),
        user_agent: account_state.user_agent
    }).catch( async (error) => {
        return await new Promise((reject) => {

            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })

            setTimeout(() => {
                dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 8000)

            reject(error)

        })
    })

    if (response) {
        dispatch({
            type: UPDATE_NETWORK_ERROR_STATE, payload: {
                id: `Email-Account-Not-Registered`
            }
        })
    } else {
        dispatch({
            type: UPDATE_NETWORK_ERROR_STATE, payload: {
                id: `Email-Account-Already-Registered-Verification-Failed.`
            }
        })
    }
}

export const Notify_Email_Owner_About_Incorrect_Password_Attempt = (email_address: string) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {
    let state = getState()
    let language_state = state.Application_Language_State_Reducer
    let account_state = state.End_User_Account_State_Reducer

    let response: any = await axios.post(`/api/authentication/login/email_password_account/notification`, {
        email_address: email_address,
        language: language_state.current_language.split(`-`)[0],
        region: language_state.current_language.split(`-`)[1],
        local_time: new Date().getTime() + (new Date().getTimezoneOffset() * 60000),
        location: Intl.DateTimeFormat().resolvedOptions().timeZone,
        date: new Date().toLocaleDateString(),
        user_agent: account_state.user_agent
    }).catch(async (error) => {
        return await new Promise((reject) => {

            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })

            setTimeout(() => {
                dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 8000)

            reject(error)

        })
    })

    if (response) {
        dispatch({
            type: UPDATE_NETWORK_ERROR_STATE, payload: {
                id: `Email-Account-Not-Registered`
            }
        })
    } else {
        dispatch({
            type: UPDATE_NETWORK_ERROR_STATE, payload: {
                id: `Email-Account-Already-Registered-Verification-Failed.`
            }
        })
    }
}