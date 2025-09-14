import {
    UPDATE_APPLICATION_COMMUNITY_STATE,
    UPDATE_APPLICATION_PROFILE_VIEWER_STATE,
    DEFAULT_HOST_ERROR_STATE,
    DEFAULT_NETWORK_ERROR_STATE,
    UPDATE_NETWORK_ERROR_STATE,
    JWT_ISSUER_KEY,
    JWT_CLIENT_KEY,
    CLIENT_ADDRESS
} from '@Constants'

import type { Current_Redux_State } from '@Redux_Thunk/Combined_Reducers'
import type { AppDispatch } from '@Redux_Thunk/Provider'

import axios from 'axios'

import { Get_Device_Information } from '@Redux_Thunk/Actions/Misc'

export const Load_Profile_Viewer_Data = (value: BigInt) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {
    await axios.post(
        `/api/community/profile_viewer`,
        { id: `${value}` },
        { withCredentials: true }
    ).catch( async (error) => {
        return await new Promise( async (reject) => {
            error.id = `Application-Community-User-Load-Profile-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1000)
            reject(error)
        })
    }).then(async (response: any) => {
        console.log(response.data.obj)
        return await new Promise((resolve) => {
            dispatch({ type: UPDATE_APPLICATION_PROFILE_VIEWER_STATE, payload: response.data.obj })
            resolve(response)
        })
    })
}

export const Load_All_Community_Users = () => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let current_language_state = state.Application_Language_State_Reducer
    let current_end_user_state = state.End_User_Account_State_Reducer

    await axios.post(`/api/community/members`, {
        login_type: current_end_user_state.login_type,
        language: `${current_language_state.current_language.split(`-`)[0]}`,
        region: `${current_language_state.current_language.split(`-`)[1]}`,
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
        device_ram_gb: `${Get_Device_Information().deviceMemory}`
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).catch((error: any) => {
        return new Promise(async (reject) => {
            error.id = `Application-Community-Users-Load-Failed`
            await dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
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