import {
    USERS_SERVER_ADDRESS, MAIL_SERVER_ADDRESS, UPDATE_NETWORK_ERROR_STATE, UPDATE_END_USER_ACCOUNT_STATE,
    CLIENT_ADDRESS, JWT_ISSUER_KEY, JWT_CLIENT_KEY,
    DEFAULT_NETWORK_ERROR_STATE, DEFAULT_HOST_ERROR_STATE, UPDATE_APPLICATION_LANGUAGE_CURRENT_VALUE, 
    UPDATE_HOST_ERROR_STATE, USERS_CACHE_SERVER_ADDRESS
} from '@Constants'

import { Encrypt } from '@AES/Encryptor'
import { Decrypt } from '@AES/Decryptor'
import { JWT_Decoder } from '@JWT/Decoder'

import axios from 'axios'

import { Get_Device_Information, Map_GUI_Values_For_Database_Storage } from '@Redux_Thunk/Actions/Misc'
import { Load_All_Community_Users } from '@Redux_Thunk/Actions/Load'

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
                    region: await Encrypt(current_language_state.current_language.split(`-`)[1]),
                    client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
                    location: await Encrypt(Intl.DateTimeFormat().resolvedOptions().timeZone),
                    jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
                    jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
                    jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
                    user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
                    orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
                    screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
                    screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
                    color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
                    pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
                    window_width: await Encrypt(`${Get_Device_Information().window_width}`),
                    window_height: await Encrypt(`${Get_Device_Information().window_height}`),
                    connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
                    down_link: await Encrypt(`${Get_Device_Information().downlink}`),
                    rtt: await Encrypt(`${Get_Device_Information().rtt}`),
                    data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
                    device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
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
    
    await axios.post(`${MAIL_SERVER_ADDRESS}/Send/Notification/Email`, {
        email_address: await Encrypt(email_address),
        language: await Encrypt(current_language_state.current_language.split(`-`)[0]),
        region: await Encrypt(current_language_state.current_language.split(`-`)[1]),
        client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
        location: await Encrypt(Intl.DateTimeFormat().resolvedOptions().timeZone),
        user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
        orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
        screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
        screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
        color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
        pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
        window_width: await Encrypt(`${Get_Device_Information().window_width}`),
        window_height: await Encrypt(`${Get_Device_Information().window_height}`),
        connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
        down_link: await Encrypt(`${Get_Device_Information().downlink}`),
        rtt: await Encrypt(`${Get_Device_Information().rtt}`),
        data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
        device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
    }).catch( async (error) => {

        return await new Promise(async (reject) => {

            await dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })

            setTimeout(() => {
                dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1000)
            reject(error)

        })

    }).then(async (response: any) => {

        let error = {
            id: ``
        }

        if (response.data === true) {
            error.id = `Email-Account-Already-Registered`
            await dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
        } else if (response.data === false) {
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
        }).catch(async (error) => {
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

        await axios.post(`${USERS_SERVER_ADDRESS}/Email/Confirmation`, {
            email_address: await Encrypt(dto.email_address),
            code: dto.code,
            language: await Encrypt(current_language_state.current_language.split(`-`)[0]),
            region: await Encrypt(current_language_state.current_language.split(`-`)[1]),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(Intl.DateTimeFormat().resolvedOptions().timeZone),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch(async (error) => {
            error.id = `Email-Confirmation-Update-Failed.`
            await dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1000)
        }).then( async (response: any) => {

            if (!state.Network_Error_State_Reducer.id) {

                if (response.status != 200) {
                    let error = {
                        id: ``
                    }
                    error.id = `Email-Second-Verification-Code-Failed.`
                    await dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                } else if (response.status === 200 && dto.email_address === response.data.Email_Address) {
                    await dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                    await dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                }

            }
        })
        
    }
}

export const Validate_Email_With_Users_Server = (email_address: string) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
    dispatch({ type: DEFAULT_HOST_ERROR_STATE })

    let state = getState()

    if (!state.Network_Error_State_Reducer.id) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.post(`${USERS_SERVER_ADDRESS}/Email/Exists`, {
            email_address: await Encrypt(email_address),
            language: await Encrypt(current_language_state.current_language.split(`-`)[0]),
            region: await Encrypt(current_language_state.current_language.split(`-`)[1]),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(Intl.DateTimeFormat().resolvedOptions().timeZone),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).catch( async (error) => {

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
}) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
    dispatch({ type: DEFAULT_HOST_ERROR_STATE })

    let state = getState()

    if (!state.Network_Error_State_Reducer.id && typeof window !== 'undefined') {

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

        axios.post(`${USERS_SERVER_ADDRESS}/Email/Submit`, {
            email_address: await Encrypt(dto.email_address),
            name: await Encrypt(`${dto.name}`),
            password: await Encrypt(dto.password),
            code: dto.code,
            theme: await Encrypt(`${collected_end_user_data.theme}`),
            alignment: await Encrypt(`${converted_to_numerical_values.alignment}`),
            nav_lock: await Encrypt(`${collected_end_user_data.nav_lock}`),
            text_alignment: await Encrypt(`${converted_to_numerical_values.text_alignment}`),
            grid_type: await Encrypt(`${collected_end_user_data.grid_type}`),
            language: await Encrypt(`${collected_end_user_data.language}`),
            region: await Encrypt(`${collected_end_user_data.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(Intl.DateTimeFormat().resolvedOptions().timeZone),
            jwt_issuer_key: await Encrypt(`${JWT_ISSUER_KEY}`),
            jwt_client_key: await Encrypt(`${JWT_CLIENT_KEY}`),
            jwt_client_address: await Encrypt(`${CLIENT_ADDRESS}`),
            user_agent: await Encrypt(`${Get_Device_Information().userAgent}`),
            orientation: await Encrypt(`${Get_Device_Information().orientation_type}`),
            screen_width: await Encrypt(`${Get_Device_Information().screen_width}`),
            screen_height: await Encrypt(`${Get_Device_Information().screen_height}`),
            color_depth: await Encrypt(`${Get_Device_Information().color_depth}`),
            pixel_depth: await Encrypt(`${Get_Device_Information().pixel_depth}`),
            window_width: await Encrypt(`${Get_Device_Information().window_width}`),
            window_height: await Encrypt(`${Get_Device_Information().window_height}`),
            connection_type: await Encrypt(`${Get_Device_Information().effectiveType}`),
            down_link: await Encrypt(`${Get_Device_Information().downlink}`),
            rtt: await Encrypt(`${Get_Device_Information().rtt}`),
            data_saver: await Encrypt(`${Get_Device_Information().saveData}`),
            device_ram_gb: await Encrypt(`${Get_Device_Information().deviceMemory}`),
        }).then( async (response) => {

            return await new Promise( async (resolve) => {

                let jwt_data = JWT_Decoder(response.data.token)

                let jwt_client_issuer_match = false

                const fetch_key = Object.keys(jwt_data) as Array<keyof typeof jwt_data>

                await Decrypt(`${jwt_data[fetch_key[7]]}`) === JWT_ISSUER_KEY &&
                await Decrypt(`${jwt_data[fetch_key[8]]}`) === JWT_CLIENT_KEY ? (jwt_client_issuer_match = true) : (jwt_client_issuer_match = false)

                if (!jwt_client_issuer_match) {

                    await dispatch({ type: UPDATE_HOST_ERROR_STATE, payload: { id: `JWT-Mismatch` } })

                } else {

                    await dispatch({
                        type: UPDATE_APPLICATION_LANGUAGE_CURRENT_VALUE, payload: {
                            current_language: `${await Decrypt(response.data.language)}-${await Decrypt(response.data.region)}`
                        }
                    })

                    await dispatch({
                        type: UPDATE_END_USER_ACCOUNT_STATE, payload: {
                            account_type: (await parseInt(Decrypt(`${jwt_data[fetch_key[0]]}`)) === await parseInt(Decrypt(response.data.account_type))) ? parseInt(Decrypt(response.data.account_type)) : null,
                            created_on: await parseInt(Decrypt(response.data.created_on)),
                            email_address: (await Decrypt(`${jwt_data[fetch_key[5]]}`) === await Decrypt(response.data.email_address)) ? Decrypt(response.data.email_address) : null,
                            id: (await parseInt(Decrypt(`${jwt_data[fetch_key[1]]}`)) === await parseInt(Decrypt(response.data.id))) ? parseInt(Decrypt(response.data.id)) : null,
                            login_on: await parseInt(Decrypt(response.data.login_on)),
                            token: response.data.token,
                            name: await Decrypt(`${response.data.name}`),
                            roles: (await Decrypt(`${jwt_data[fetch_key[2]]}`) === await Decrypt(response.data.roles).slice(1, -1)) ? Decrypt(response.data.roles).slice(1, -1) : null,
                            client_address: (await Decrypt(`${jwt_data[fetch_key[4]]}`) === CLIENT_ADDRESS) ? CLIENT_ADDRESS : null,
                            groups: (await Decrypt(`${jwt_data[fetch_key[3]]}`) === await Decrypt(response.data.groups).slice(1, -1)) ? Decrypt(response.data.groups).slice(1, -1) : null,
                            login_type: await Decrypt(`${response.data.login_type}`),
                            online_status: await Decrypt(`${response.data.online_status}`)
                        }
                    })
                    
                    await axios.post(`${USERS_CACHE_SERVER_ADDRESS}/set/user`, {
                        token: response.data.token,
                        id: response.data.id,
                        online_status: response.data.online_status,
                        custom_lbl: response.data.custom_lbl ? response.data.custom_lbl : await Encrypt(``),
                        name: response.data.name,
                        created_on: response.data.created_on,
                        avatar_url_path: response.data.avatar_url_path ? response.data.avatar_url_path : await Encrypt(``),
                        avatar_title: response.data.avatar_title ? response.data.avatar_title : await Encrypt(``),
                        language_code: Encrypt(`${collected_end_user_data.language}`),
                        region_code: Encrypt(`${collected_end_user_data.region}`),
                        login_on: response.data.login_on ? response.data.login_on : await Encrypt(``),
                        logout_on: response.data.logout_on ? response.data.logout_on : await Encrypt(``),
                        login_type: Encrypt(`EMAIL`),
                        account_type: response.data.account_type
                    })

                    dispatch(Load_All_Community_Users())

                    resolve(true)
                }
            })

        })
    }
}