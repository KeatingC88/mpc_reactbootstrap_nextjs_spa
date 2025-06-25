import {
    USERS_SERVER_ADDRESS,
    UPDATE_NETWORK_ERROR_STATE,
    UPDATE_APPLICATION_COMMUNITY_STATE,
    UPDATE_APPLICATION_PROFILE_VIEWER_STATE,
    DEFAULT_HOST_ERROR_STATE,
    CLIENT_ADDRESS, JWT_ISSUER_KEY, JWT_CLIENT_KEY, UPDATE_END_USER_ACCOUNT_TOKEN, DEFAULT_NETWORK_ERROR_STATE, UPDATE_HOST_ERROR_STATE
} from '@Constants'

import { Encrypt } from '@AES/Encryptor'
import { Decrypt } from '@AES/Decryptor'
import { JWT_Decoder } from '@JWT/Decoder'

import { Get_Device_Information, Map_GUI_Values_For_Database_Storage } from '@Redux_Thunk/Actions/Misc'
import type { Current_Redux_State } from '@Redux_Thunk/Combined_Reducers'
import type { AppDispatch } from '@Redux_Thunk/Provider'

import axios from 'axios'

export const Load_New_Token = () => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.post(`${USERS_SERVER_ADDRESS}/Load/Token`, {
            id: await Encrypt(`${end_user_account.id}`),
            token: end_user_account.token,
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            account_groups: await Encrypt(`${end_user_account.groups}`),
            account_roles: await Encrypt(`${end_user_account.roles}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
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
        }).catch((error) => {

            return new Promise( async (reject) => {
                error.id = `Load-Token-Failed`
                await dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })

        }).then( async (response: any) => {

            if (!state.Network_Error_State_Reducer.id) {

                let jwt_data = JWT_Decoder(response.data.token)

                let jwt_client_issuer_match = false

                const fetch_key = Object.keys(jwt_data) as Array<keyof typeof jwt_data>

                Decrypt(`${jwt_data[fetch_key[7]]}`) === JWT_ISSUER_KEY &&
                    Decrypt(`${jwt_data[fetch_key[8]]}`) === JWT_CLIENT_KEY ? (jwt_client_issuer_match = true) : (jwt_client_issuer_match = false)

                if (!jwt_client_issuer_match) {

                    dispatch({ type: UPDATE_HOST_ERROR_STATE, payload: { id: `Client-Mismatch` } })

                } else {

                    return await new Promise( async (resolve) => {
                        await dispatch({
                            type: UPDATE_END_USER_ACCOUNT_TOKEN, payload: {
                                token: response.data.token,
                                token_expire: response.data.token,
                                token_expire_notification: false
                            }
                        })

                        resolve({token: response.data.token, token_expire: response.data.token })
                    })
                }
            }
        })
    }
}

export const Load_Profile_Viewer_Data = (value: BigInt) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {


    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer

    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.post(`${USERS_SERVER_ADDRESS}/Load/User/Profile`, {
            token: end_user_account.token,
            id: await Encrypt(`${end_user_account.id}`),
            profile_id: await Encrypt(`${value}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
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
                error.id = `Load-User-Profile-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })

        }).then( async (response: any) => {

            return await new Promise( async (resolve) => {
                await dispatch({ type: UPDATE_APPLICATION_PROFILE_VIEWER_STATE, payload: response.data })
                resolve(response.data)
            })

        })

    }
}

export const Load_All_Community_Users = () => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer


    if (end_user_account.id !== null &&
        end_user_account.token !== null &&
        end_user_account.account_type !== null) {

        let current_language_state = state.Application_Language_State_Reducer

        await axios.post(`${USERS_SERVER_ADDRESS}/Load/All_Users`, {
            id: await Encrypt(`${end_user_account.id}`),
            token: end_user_account.token,
            language: await Encrypt(`${current_language_state.language}`),
            region: await Encrypt(`${current_language_state.region}`),
            account_type: await Encrypt(`${end_user_account.account_type}`),
            login_type: await Encrypt(`${end_user_account.login_type}`),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(`${Intl.DateTimeFormat().resolvedOptions().timeZone}`),
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
                error.id = `Load-All-Users-Failed`
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })

        }).then( async (response: any) => {

            return await new Promise(async (resolve) => {
                await dispatch({ type: UPDATE_APPLICATION_COMMUNITY_STATE, payload: { users: response.data } })
                resolve(response.data)
            })

        })

    }
}