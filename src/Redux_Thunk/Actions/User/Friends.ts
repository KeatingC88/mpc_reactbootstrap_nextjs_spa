import {
    UPDATE_NETWORK_ERROR_STATE,
    JWT_ISSUER_KEY,
    JWT_CLIENT_KEY,
    CLIENT_ADDRESS,
    DEFAULT_HOST_ERROR_STATE,
    DEFAULT_NETWORK_ERROR_STATE,
    UPDATE_END_USER_FRIENDS_PERMISSION_STATE,
    UPDATE_END_USER_FRIENDS_RECEIVED_PERMISSION_STATE,
    UPDATE_END_USER_FRIENDS_BLOCKED_PERMISSION_STATE,
    UPDATE_END_USER_FRIENDS_APPROVED_PERMISSION_STATE,
    UPDATE_END_USER_FRIENDS_REPORTED_PERMISSION_STATE
} from '@Constants'
import axios from 'axios'

import type { Current_Redux_State } from '@Redux_Thunk/Combined_Reducers'
import type { AppDispatch } from '@Redux_Thunk/Provider'
import { Get_Device_Information } from '@Redux_Thunk/Actions/Misc'

export const Load_End_User_Friend_Permissions = () => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {
    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer

    await axios.post(`/api/user/social/connection/friends/permissions`, {
        end_user_id: `${end_user_account.id}`,
        account_type: `${end_user_account.account_type}`,
        login_type: `${end_user_account.login_type}`,
        language: `${current_language_state.language}`,
        region: `${current_language_state.region}`,
        client_time: `${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`,
        location: `${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
        jwt_issuer_key: `${JWT_ISSUER_KEY}`,
        jwt_client_key: `${JWT_CLIENT_KEY}`,
        jwt_client_address: `${CLIENT_ADDRESS}`,
        user_agent: `${Get_Device_Information().userAgent}`,
        orientation: `${Get_Device_Information().orientation_type}`,
        screen_width: `${Get_Device_Information().screen_width}`,
        screen_height: `${Get_Device_Information().screen_height}`,
        color_depth: `${Get_Device_Information().color_depth}`,
        pixel_depth: `${Get_Device_Information().pixel_depth}`,
        window_width: `${Get_Device_Information().window_width}`,
        window_height: `${Get_Device_Information().window_height}`,
        connection_type: `${Get_Device_Information().effectiveType}`,
        down_link: `${Get_Device_Information().downlink}`,
        rtt: `${Get_Device_Information().rtt}`,
        data_saver: `${Get_Device_Information().saveData}`,
        device_ram_gb: `${Get_Device_Information().deviceMemory}`,
    }).catch( async (error) => {
        return await new Promise((reject) => {
            error.id = `Contact-Us-Submission-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1)
            reject(error)
        })
    }).then(async (response: any) => {
        if (response?.data) {
            dispatch({
                type: UPDATE_END_USER_FRIENDS_PERMISSION_STATE,
                payload: {
                    sent_requests: response.data.sent_permissions,
                    received_requests: response.data.received_permissions,
                    time_stamped: response.data.time_stamped
                }
            })

            return await new Promise((resolve) => {
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1)
                resolve(true)
            })
        }
    })
}

export const Approve_Friend = (value: BigInt) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {
    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer
    let current_end_user_friend_list_state = state.End_User_Friends_State_Reducer

    await axios.put(`/api/user/social/connection/friend/approve`, {
        end_user_id: `${end_user_account.id.toString()}`,
        participant_id: `${value.toString()}`,
        account_type: `${end_user_account.account_type}`,
        login_type: `${end_user_account.login_type}`,
        language: `${current_language_state.language}`,
        region: `${current_language_state.region}`,
        client_time: `${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`,
        location: `${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
        jwt_issuer_key: `${JWT_ISSUER_KEY}`,
        jwt_client_key: `${JWT_CLIENT_KEY}`,
        jwt_client_address: `${CLIENT_ADDRESS}`,
        user_agent: `${Get_Device_Information().userAgent}`,
        orientation: `${Get_Device_Information().orientation_type}`,
        screen_width: `${Get_Device_Information().screen_width}`,
        screen_height: `${Get_Device_Information().screen_height}`,
        color_depth: `${Get_Device_Information().color_depth}`,
        pixel_depth: `${Get_Device_Information().pixel_depth}`,
        window_width: `${Get_Device_Information().window_width}`,
        window_height: `${Get_Device_Information().window_height}`,
        connection_type: `${Get_Device_Information().effectiveType}`,
        down_link: `${Get_Device_Information().downlink}`,
        rtt: `${Get_Device_Information().rtt}`,
        data_saver: `${Get_Device_Information().saveData}`,
        device_ram_gb: `${Get_Device_Information().deviceMemory}`,
    }).catch(async (error) => {
        return await new Promise((reject) => {
            error.id = `Approved-Friend-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1)
            reject(error)
        })
    }).then(async (response: any) => {
        delete current_end_user_friend_list_state.received_requests[value.toString()]

        if (!current_end_user_friend_list_state.friends) {
            let approved = []
            approved.push(value)
            dispatch({ type: UPDATE_END_USER_FRIENDS_APPROVED_PERMISSION_STATE, payload: { approved: approved } })
        } else {
            current_end_user_friend_list_state.approved.push(value)
            dispatch({ type: UPDATE_END_USER_FRIENDS_APPROVED_PERMISSION_STATE, payload: { approved: current_end_user_friend_list_state.approved } })
        }

        return await new Promise((resolve) => {
            resolve(response.data)
        })
    })
}

export const Block_Friend = (value: BigInt) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {
    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer
    let current_end_user_friend_list_state = state.End_User_Friends_State_Reducer

    await axios.put(`/api/user/social/connection/friend/block`, {
        end_user_id: `${end_user_account.id.toString()}`,
        participant_id: `${value.toString()}`,
        account_type: `${end_user_account.account_type}`,
        login_type: `${end_user_account.login_type}`,
        language: `${current_language_state.language}`,
        region: `${current_language_state.region}`,
        client_time: `${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`,
        location: `${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
        jwt_issuer_key: `${JWT_ISSUER_KEY}`,
        jwt_client_key: `${JWT_CLIENT_KEY}`,
        jwt_client_address: `${CLIENT_ADDRESS}`,
        user_agent: `${Get_Device_Information().userAgent}`,
        orientation: `${Get_Device_Information().orientation_type}`,
        screen_width: `${Get_Device_Information().screen_width}`,
        screen_height: `${Get_Device_Information().screen_height}`,
        color_depth: `${Get_Device_Information().color_depth}`,
        pixel_depth: `${Get_Device_Information().pixel_depth}`,
        window_width: `${Get_Device_Information().window_width}`,
        window_height: `${Get_Device_Information().window_height}`,
        connection_type: `${Get_Device_Information().effectiveType}`,
        down_link: `${Get_Device_Information().downlink}`,
        rtt: `${Get_Device_Information().rtt}`,
        data_saver: `${Get_Device_Information().saveData}`,
        device_ram_gb: `${Get_Device_Information().deviceMemory}`,
    }).catch(async (error) => {
        return await new Promise((reject) => {
            error.id = `Block-Friend-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1)
            reject(error)
        })
    }).then( async (response: any) => {
        delete current_end_user_friend_list_state.received_requests[value.toString()]

        if (!current_end_user_friend_list_state.blocked) {
            let blocked = []
            blocked.push(value)
            dispatch({ type: UPDATE_END_USER_FRIENDS_BLOCKED_PERMISSION_STATE, payload: { blocked: blocked } })
        } else {
            current_end_user_friend_list_state.blocked.push(value)
            dispatch({ type: UPDATE_END_USER_FRIENDS_BLOCKED_PERMISSION_STATE, payload: { blocked: current_end_user_friend_list_state.blocked } })
        }

        return await new Promise((resolve) => {
            resolve(response.data)
        })
    })
}

export const Request_Friend = (value: BigInt) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {
    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer
    let current_end_user_friend_list_state = state.End_User_Friends_State_Reducer

    await axios.post(`/api/user/social/connection/friend/request`, {
        end_user_id: `${end_user_account.id.toString()}`,
        participant_id: `${value.toString()}`,
        account_type: `${end_user_account.account_type}`,
        login_type: `${end_user_account.login_type}`,
        language: `${current_language_state.language}`,
        region: `${current_language_state.region}`,
        client_time: `${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`,
        location: `${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
        jwt_issuer_key: `${JWT_ISSUER_KEY}`,
        jwt_client_key: `${JWT_CLIENT_KEY}`,
        jwt_client_address: `${CLIENT_ADDRESS}`,
        user_agent: `${Get_Device_Information().userAgent}`,
        orientation: `${Get_Device_Information().orientation_type}`,
        screen_width: `${Get_Device_Information().screen_width}`,
        screen_height: `${Get_Device_Information().screen_height}`,
        color_depth: `${Get_Device_Information().color_depth}`,
        pixel_depth: `${Get_Device_Information().pixel_depth}`,
        window_width: `${Get_Device_Information().window_width}`,
        window_height: `${Get_Device_Information().window_height}`,
        connection_type: `${Get_Device_Information().effectiveType}`,
        down_link: `${Get_Device_Information().downlink}`,
        rtt: `${Get_Device_Information().rtt}`,
        data_saver: `${Get_Device_Information().saveData}`,
        device_ram_gb: `${Get_Device_Information().deviceMemory}`,
    }).catch( async (error) => {
        return await new Promise((reject) => {
            error.id = `Request-Friend-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1)
            reject(error)
        })
    }).then( async (response:any) => {
        current_end_user_friend_list_state.sent_requests[value.toString()] = {...JSON.parse(response.data.data)}
        return await new Promise((resolve) => {
            dispatch({ type: UPDATE_END_USER_FRIENDS_RECEIVED_PERMISSION_STATE, payload: { sent_requests: current_end_user_friend_list_state.sent_requests } })
            resolve(response.data.data)
        })
    })
}

export const Reject_Friend = (value: BigInt) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {
    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer
    let current_end_user_friend_list_state = state.End_User_Friends_State_Reducer

    await axios.put(`/api/user/social/connection/friend/reject`, {
        end_user_id: `${end_user_account.id.toString()}`,
        participant_id: `${value.toString()}`,
        account_type: `${end_user_account.account_type}`,
        login_type: `${end_user_account.login_type}`,
        language: `${current_language_state.language}`,
        region: `${current_language_state.region}`,
        client_time: `${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`,
        location: `${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
        jwt_issuer_key: `${JWT_ISSUER_KEY}`,
        jwt_client_key: `${JWT_CLIENT_KEY}`,
        jwt_client_address: `${CLIENT_ADDRESS}`,
        user_agent: `${Get_Device_Information().userAgent}`,
        orientation: `${Get_Device_Information().orientation_type}`,
        screen_width: `${Get_Device_Information().screen_width}`,
        screen_height: `${Get_Device_Information().screen_height}`,
        color_depth: `${Get_Device_Information().color_depth}`,
        pixel_depth: `${Get_Device_Information().pixel_depth}`,
        window_width: `${Get_Device_Information().window_width}`,
        window_height: `${Get_Device_Information().window_height}`,
        connection_type: `${Get_Device_Information().effectiveType}`,
        down_link: `${Get_Device_Information().downlink}`,
        rtt: `${Get_Device_Information().rtt}`,
        data_saver: `${Get_Device_Information().saveData}`,
        device_ram_gb: `${Get_Device_Information().deviceMemory}`,
    }).catch( async (error) => {
        return await new Promise((reject) => {
            error.id = `Reject-Friend-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1)
            reject(error)
        })
    }).then( async (response: any) => {
        delete current_end_user_friend_list_state.received_requests[value.toString()]
        return await new Promise((resolve) => {
            dispatch({ type: UPDATE_END_USER_FRIENDS_RECEIVED_PERMISSION_STATE, payload: { recieved_requests: current_end_user_friend_list_state.received_requests } })
            resolve(response.data)
        })
    })
}

export const Report_Friend = (value: string) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {
    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer
    let current_end_user_friend_list_state = state.End_User_Friends_State_Reducer

    await axios.post(`/api/user/social/connection/friend/report`, {
        account_type: `${end_user_account.account_type}`,
        login_type: `${end_user_account.login_type}`,
        report_type: `${value}`,
        language: `${current_language_state.language}`,
        region: `${current_language_state.region}`,
        client_time: `${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`,
        location: `${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
        jwt_issuer_key: `${JWT_ISSUER_KEY}`,
        jwt_client_key: `${JWT_CLIENT_KEY}`,
        jwt_client_address: `${CLIENT_ADDRESS}`,
        user_agent: `${Get_Device_Information().userAgent}`,
        orientation: `${Get_Device_Information().orientation_type}`,
        screen_width: `${Get_Device_Information().screen_width}`,
        screen_height: `${Get_Device_Information().screen_height}`,
        color_depth: `${Get_Device_Information().color_depth}`,
        pixel_depth: `${Get_Device_Information().pixel_depth}`,
        window_width: `${Get_Device_Information().window_width}`,
        window_height: `${Get_Device_Information().window_height}`,
        connection_type: `${Get_Device_Information().effectiveType}`,
        down_link: `${Get_Device_Information().downlink}`,
        rtt: `${Get_Device_Information().rtt}`,
        data_saver: `${Get_Device_Information().saveData}`,
        device_ram_gb: `${Get_Device_Information().deviceMemory}`,
    }).catch( async (error) => {
        return await new Promise((reject) => {
            error.id = `Report-Friend-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1)
            reject(error)
        })
    }).then( async (response: any) => {
        if (!current_end_user_friend_list_state.reported) {
            let reported = []
            reported.push(value)
            dispatch({ type: UPDATE_END_USER_FRIENDS_REPORTED_PERMISSION_STATE, payload: { reported: reported } })
        } else {
            current_end_user_friend_list_state.reported.push(value)
            dispatch({ type: UPDATE_END_USER_FRIENDS_REPORTED_PERMISSION_STATE, payload: { reported: current_end_user_friend_list_state.reported } })
        }

        return await new Promise((resolve) => {
            resolve(response.data)
        })
    })
}