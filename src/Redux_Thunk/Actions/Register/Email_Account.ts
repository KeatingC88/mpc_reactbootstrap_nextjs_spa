import {
    USERS_SERVER_ADDRESS,
    MAIL_SERVER_ADDRESS,
    UPDATE_NETWORK_ERROR_STATE,
    UPDATE_END_USER_ACCOUNT_STATE,
    CLIENT_ADDRESS,
    DEFAULT_NETWORK_ERROR_STATE,
    DEFAULT_HOST_ERROR_STATE,
    UPDATE_APPLICATION_LANGUAGE_CURRENT_VALUE
} from '@Constants'

import axios from 'axios'

import { Encrypt } from '@AES/Encryptor'

import { DTO } from '@JS/Required_DTO_Properties'
import { Map_GUI_Values_For_Database_Storage } from '@Redux_Thunk/Actions/Misc'

import type { Current_Redux_State } from '@Redux_Thunk/Combined_Reducers'
import type { AppDispatch } from '@Redux_Thunk/Provider'

export const Attempt_To_Register_The_End_User_An_Email_Account = (email_address: string) => async (dispatch: AppDispatch, getState: ()=> Current_Redux_State) => {

    let state = getState()

    if (!state.Network_Error_State_Reducer.id) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.post(`${MAIL_SERVER_ADDRESS}/Send/Confirmation/Email/`, {
            email_address: await Encrypt(email_address),
            language: await Encrypt(current_language_state.current_language.split(`-`)[0]),
            region: await Encrypt(current_language_state.current_language.split(`-`)[1])
        }).catch( async (error) => {

            return await new Promise( async (reject) => {
                error.id = `Send-Confirmation-Failed`
                await dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 3000)
                reject(error)
            })

        }).then( async (response: any) => {

            if (!state.Network_Error_State_Reducer.id && typeof window !== 'undefined') {

                await axios.post(`${USERS_SERVER_ADDRESS}/Email/Register`, {
                    email_address: await Encrypt(email_address),
                    code: response.data.code,
                    language: await Encrypt(current_language_state.current_language.split(`-`)[0]),
                    region: await Encrypt(current_language_state.current_language.split(`-`)[1])
                }).catch( async (error) => {
                    
                    return await new Promise(async (reject) => {
                        error.id = `Email-Registration-Failed`
                        await dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                        setTimeout(() => {
                            dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                            dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                        }, 1)
                        reject(error)
                    })

                }).then( async () => {

                    return await new Promise(async (resolve) => {
                        resolve(`Registration-Complete`)
                    })

                })

            }

        })
    }
}

export const Notify_Attempted_Registration_To_Same_Email_Account_By_Email_Message = (email_address: string) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
    dispatch({ type: DEFAULT_HOST_ERROR_STATE })

    let current_language_state = getState().Application_Language_State_Reducer
    
    await axios.post(`${MAIL_SERVER_ADDRESS}/Send/Notification/Email`, DTO({
        email_address: await Encrypt(email_address),
        language: await Encrypt(current_language_state.current_language.split(`-`)[0]),
        region: await Encrypt(current_language_state.current_language.split(`-`)[1])
    })).catch( async (error) => {

        return await new Promise(async (reject) => {

            await dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })

            setTimeout(() => {
                dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1000)
            reject(error)

        })

    }).then( async (response: any) => {

        let error = {
            id: ``
        }

        if (response.data) {
            error.id = `Email-Account-Already-Registered`
            await dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
        } else if (!response.data) {
            error.id = `Email-Account-Already-Registered-Failed.`
            await dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
        }

    })
    
}

export const Validate_Email_Confirmation_Code_With_Email_Server = (dto: {
    email_address: string
    code: string
}) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    if (!getState().Network_Error_State_Reducer.id) {

        await axios.post(`${MAIL_SERVER_ADDRESS}/Received/Confirmation/Email/`, {
            email_address: Encrypt(dto.email_address),
            code: dto.code
        }).catch( async (error) => {
            error.id = `Email-Verification-Code-Failed.`
            await dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1000)
        })

    }

}

export const Validate_Email_Confirmation_Code_With_User_Server = (dto: {
    email_address: string
    code: string
}) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()

    if (!state.Network_Error_State_Reducer.id) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.post(`${USERS_SERVER_ADDRESS}/Email/Confirmation`, DTO({
            email_address: await Encrypt(dto.email_address),
            code: dto.code,
            language: await Encrypt(current_language_state.current_language.split(`-`)[0]),
            region: await Encrypt(current_language_state.current_language.split(`-`)[1])
        })).catch(async (error) => {
            error.id = `Email-Confirmation-Update-Failed.`
            await dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1000)
        })
    }
}

export const Validate_Email_With_Users_Server = (email_address: string) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
    dispatch({ type: DEFAULT_HOST_ERROR_STATE })

    let state = getState()

    if (!state.Network_Error_State_Reducer.id) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.post(`${USERS_SERVER_ADDRESS}/Email/Exists`, DTO({
            email_address: await Encrypt(email_address),
            language: await Encrypt(current_language_state.current_language.split(`-`)[0]),
            region: await Encrypt(current_language_state.current_language.split(`-`)[1])
        })).catch( async (error) => {

            return await new Promise((reject) => {

                error.id = `Validate-With-Email-Server-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                
                reject(error)

                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000) 
                
            })

        }).then( async () => {

            if (!state.Network_Error_State_Reducer.id) {

                return await new Promise((resolve) => {
                    resolve(``)
                })

            }

        })

    }
}

export const Create_End_User_Email_Account = (dto: {
    email_address: string
    password: string
    code: string
    name: string
}) => async (dispatch: AppDispatch, getState: () => Current_Redux_State): Promise<void> => {

    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
    dispatch({ type: DEFAULT_HOST_ERROR_STATE })

    let state = getState()

    if (!state.Network_Error_State_Reducer.id) {

        let current_end_user_state = state.End_User_Account_State_Reducer
        let current_language_state = state.Application_Language_State_Reducer
        let current_settings_state = state.Application_Settings_State_Reducer

        let collected_end_user_data = {
            nav_lock: current_settings_state.nav_lock,
            theme: current_settings_state.theme,
            language: current_language_state.current_language.split(`-`)[0],
            region: current_language_state.current_language.split(`-`)[1],
            grid_type: current_settings_state.grid_type
        }

        let converted_to_numerical_values = Map_GUI_Values_For_Database_Storage({
            alignment: current_settings_state.alignment,
            text_alignment: current_settings_state.text_alignment
        })

        await axios.post("/api/register/email_account", DTO({
            email_address: dto.email_address,
            name: dto.name,
            password: dto.password,
            code: dto.code,
            theme: collected_end_user_data.theme,
            alignment: converted_to_numerical_values.alignment,
            nav_lock: collected_end_user_data.nav_lock,
            text_alignment: converted_to_numerical_values.text_alignment,
            grid_type: collected_end_user_data.grid_type,
            language: collected_end_user_data.language,
            region: collected_end_user_data.region
        }), {
            withCredentials: true
        }).then( async (response: any) => { 
            
            if (response.data && response.status === 200 && response.data.status !== 204) {

                return await new Promise(async (resolve) => {

                    dispatch({
                        type: UPDATE_APPLICATION_LANGUAGE_CURRENT_VALUE, payload: {
                            current_language: `${response.data.language}-${response.data.region}`
                        }
                    })

                    dispatch({
                        type: UPDATE_END_USER_ACCOUNT_STATE, payload: {
                            account_type: parseInt(response.data.account_type),
                            created_on: parseInt(response.data.created_on),
                            email_address: response.data.email_address,
                            id: parseInt(response.data.id),
                            login_on: parseInt(response.data.login_on),
                            name: response.data.name,
                            roles: response.data.roles,
                            client_address: CLIENT_ADDRESS,
                            groups: response.data.groups,
                            login_type: response.data.login_type,
                            online_status: parseInt(response.data.online_status)
                        }
                    })

                    resolve({
                        account_type: parseInt(response.data.account_type),
                        created_on: parseInt(response.data.created_on),
                        email_address: response.data.email_address,
                        id: parseInt(response.data.id),
                        login_on: parseInt(response.data.login_on),
                        name: response.data.name,
                        roles: response.data.roles,
                        client_address: CLIENT_ADDRESS,
                        groups: response.data.groups,
                        login_type: response.data.login_type,
                        online_status: parseInt(response.data.online_status)
                    })

                })

            }
        })
    }
}