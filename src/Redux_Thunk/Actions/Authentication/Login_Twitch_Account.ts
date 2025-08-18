import {
    UPDATE_END_USER_TWITCH_ACCOUNT_STATE,
    UPDATE_NETWORK_ERROR_STATE,
    DEFAULT_HOST_ERROR_STATE,
    DEFAULT_NETWORK_ERROR_STATE,
    CLIENT_ADDRESS,
    JWT_ISSUER_KEY,
    JWT_CLIENT_KEY,
    UPDATE_APPLICATION_LANGUAGE_CURRENT_VALUE,
    UPDATE_END_USER_ACCOUNT_STATE,
} from '@Constants'

import type { Current_Redux_State } from '@Redux_Thunk/Combined_Reducers'
import type { AppDispatch } from '@Redux_Thunk/Provider'

import { Get_Device_Information, Map_GUI_Values_For_Database_Storage } from '@Redux_Thunk/Actions/Misc'

import axios from 'axios'

export const Login_End_User_Twitch_Account = () => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    const url = new URL(window.location.href)
    const code = url.searchParams.get("code")
    let state = getState()

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

    if (code) {
        await axios.post(`/api/authentication/login/twitch_account`, {
            code: code,
            language: `${current_language_state.current_language.split(`-`)[0]}`,
            region: `${current_language_state.current_language.split(`-`)[1]}`,
            client_time: `${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`,
            location: `${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
            theme: `${collected_end_user_data.theme}`,
            alignment: `${converted_to_numerical_values.alignment}`,
            nav_lock: `${collected_end_user_data.nav_lock}`,
            text_alignment: `${converted_to_numerical_values.text_alignment}`,
            grid_type: `${collected_end_user_data.grid_type}`,
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
            },
            withCredentials: true,
        }).catch((error) => {
            return new Promise(async (reject) => {
                error.id = `Application-Twitch-Login-Failed`
                await dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })
        }).then( async (response: any) => {
            let twitch_data = response.twitch_data
            let mpc_data = response.mpc_data
            const twitch_id: bigint = BigInt(twitch_data.id)

            return await new Promise(async (resolve) => {

                await dispatch({
                    type: UPDATE_END_USER_TWITCH_ACCOUNT_STATE, payload: {
                        id: parseInt(`${twitch_id}`),
                        display_name: twitch_data.display_name,
                        email_address: twitch_data.email,
                        login: twitch_data.login,
                        profile_image_url: twitch_data.profile_image_url
                    }
                })

                await dispatch({
                    type: UPDATE_APPLICATION_LANGUAGE_CURRENT_VALUE, payload: {
                        current_language: `${mpc_data.language}-${mpc_data.region}`
                    }
                })

                await dispatch({
                    type: UPDATE_END_USER_ACCOUNT_STATE, payload: {
                        account_type: parseInt(mpc_data.account_type),
                        created_on: parseInt(mpc_data.created_on),
                        email_address: twitch_data.email,
                        id: parseInt(mpc_data.id),
                        login_on: parseInt(mpc_data.login_on),
                        token: mpc_data.token,
                        name: twitch_data.display_name + mpc_data.name,
                        roles: mpc_data.roles,
                        client_address: CLIENT_ADDRESS,
                        groups: mpc_data.groups,
                        login_type: mpc_data.login_type,
                        online_status: parseInt(mpc_data.online_status)
                    }
                })
            })
        })
    }
}