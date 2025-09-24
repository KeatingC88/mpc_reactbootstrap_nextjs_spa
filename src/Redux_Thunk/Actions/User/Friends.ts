import {
    UPDATE_NETWORK_ERROR_STATE,
    JWT_ISSUER_KEY,
    JWT_CLIENT_KEY,
    CLIENT_ADDRESS,
    DEFAULT_HOST_ERROR_STATE,
    DEFAULT_NETWORK_ERROR_STATE
} from '@Constants'
import axios from 'axios'

import type { Current_Redux_State } from '@Redux_Thunk/Combined_Reducers'
import type { AppDispatch } from '@Redux_Thunk/Provider'
import { Get_Device_Information } from '@Redux_Thunk/Actions/Misc'

import { Encrypt } from '@AES/Encryptor'

export const Load_End_User_Approved_Friends = () => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {
    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer

    await axios.post(`/api/user/social/connection/friends/approved`, {
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
    }).then( async (response) => {
        console.log(response)
/*        return await new Promise((resolve) => {
            
        })*/
    })
}

export const Load_End_User_Blocked_Friends = () => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {
    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer

    await axios.post(`/api/user/social/connection/friends/blocked`, {
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
            error.id = `Contact-Us-Submission-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1)
            reject(error)
        })
    }).then(async (response) => {
        console.log(response)
        /*        return await new Promise((resolve) => {
                    
                })*/
    })
}

export const Load_End_User_Reported_Friends = () => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {
    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer

    await axios.post(`/api/user/social/connection/friends/reported`, {
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
            error.id = `Contact-Us-Submission-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1)
            reject(error)
        })
    }).then(async (response) => {
        console.log(response)
        /*        return await new Promise((resolve) => {
                    
                })*/
    })
}

export const Load_End_User_Rejected_Friends = () => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {
    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer

    await axios.post(`/api/user/social/connection/friends/rejected`, {
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
            error.id = `Contact-Us-Submission-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1)
            reject(error)
        })
    }).then(async (response) => {
        console.log(response)
        /*        return await new Promise((resolve) => {
                    
                })*/
    })
}

export const Load_End_User_Requested_Friends = () => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {
    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer

    await axios.post(`/api/user/social/connection/friends/requested`, {
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
            error.id = `Contact-Us-Submission-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1)
            reject(error)
        })
    }).then(async (response) => {
        console.log(response)
        /*        return await new Promise((resolve) => {
                    
                })*/
    })
}

export const Approve_Friend = () => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {
    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer

    await axios.post(`/api/user/social/connection/friend/approve`, {
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
            error.id = `Contact-Us-Submission-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1)
            reject(error)
        })
    }).then(async (response) => {
        console.log(response)
        /*        return await new Promise((resolve) => {
                    
                })*/
    })
}

export const Block_Friend = () => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {
    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer

    await axios.post(`/api/user/social/connection/friend/block`, {
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
            error.id = `Contact-Us-Submission-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1)
            reject(error)
        })
    }).then(async (response) => {
        console.log(response)
        /*        
            return await new Promise((resolve) => {
                    
            })
        */
    })
}

export const Request_Friend = (value: number) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {
    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer

    await axios.post(`/api/user/social/connection/friend/request`, {
        participant_id: `${value}`,
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
            error.id = `Contact-Us-Submission-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1)
            reject(error)
        })
    }).then(async (response) => {
        console.log(response)
        /*
            return await new Promise((resolve) => {
                    
            })
        */
    })
}

export const Reject_Friend = () => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {
    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer

    await axios.post(`/api/user/social/connection/friend/reject`, {
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
            error.id = `Contact-Us-Submission-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1)
            reject(error)
        })
    }).then(async (response) => {
        console.log(response)
        /*
            return await new Promise((resolve) => {
                    
            })
        */
    })
}

export const Report_Friend = () => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {
    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer

    await axios.post(`/api/user/social/connection/friend/report`, {
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
            error.id = `Contact-Us-Submission-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1)
            reject(error)
        })
    }).then(async (response) => {
        console.log(response)
        /*  return await new Promise((resolve) => {
                    
            })
        */
    })
}