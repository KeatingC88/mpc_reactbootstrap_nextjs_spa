import {
    UPDATE_END_USER_TWITCH_ACCOUNT_STATE,
    USERS_SERVER_ADDRESS,
    UPDATE_NETWORK_ERROR_STATE,
    DEFAULT_HOST_ERROR_STATE,
    DEFAULT_NETWORK_ERROR_STATE,
    CLIENT_ADDRESS,
    JWT_ISSUER_KEY,
    JWT_CLIENT_KEY,
    UPDATE_HOST_ERROR_STATE,
    UPDATE_APPLICATION_LANGUAGE_CURRENT_VALUE,
    UPDATE_END_USER_ACCOUNT_STATE,
    USERS_CACHE_SERVER_ADDRESS
} from '@Constants'

import type { Current_Redux_State } from '@Redux_Thunk/Combined_Reducers'
import type { AppDispatch } from '@Redux_Thunk/Provider'

import { Encrypt } from '@AES/Encryptor'
import { Decrypt } from '@AES/Decryptor'
import { JWT_Email_Validation } from '@JWT/Decoder'
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
        axios.post(`${USERS_SERVER_ADDRESS}/Twitch/Login`, {
            code: code,
            language: await Encrypt(current_language_state.current_language.split(`-`)[0]),
            region: await Encrypt(current_language_state.current_language.split(`-`)[1]),
            client_time: await Encrypt(`${new Date().getTime() + (new Date().getTimezoneOffset() * 60000)}`),
            location: await Encrypt(Intl.DateTimeFormat().resolvedOptions().timeZone),
            theme: await Encrypt(`${collected_end_user_data.theme}`),
            alignment: await Encrypt(`${converted_to_numerical_values.alignment}`),
            nav_lock: await Encrypt(`${collected_end_user_data.nav_lock}`),
            text_alignment: await Encrypt(`${converted_to_numerical_values.text_alignment}`),
            grid_type: await Encrypt(`${collected_end_user_data.grid_type}`),
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
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (response: any) => {

            let twitch_data = JSON.parse(Decrypt(response.data)).twitch_data
            let mpc_data = JSON.parse(JSON.parse(Decrypt(response.data)).mpc_data)
            const twitch_id: bigint = BigInt(twitch_data.id)
            
            return await new Promise(async (resolve) => {

                if (JWT_Email_Validation({ token: mpc_data.token, comparable_data: mpc_data })) {
                    
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

                    await axios.post(`${USERS_CACHE_SERVER_ADDRESS}/set/user`, {
                        token: mpc_data.token,
                        id: await Encrypt(`${mpc_data.id}`),
                        online_status: await Encrypt(`${mpc_data.online_status}`),
                        custom_lbl: mpc_data.custom_lbl ? await Encrypt(`${mpc_data.custom_lbl}`) : await Encrypt(``),
                        name: await Encrypt(`${mpc_data.name}`),
                        created_on: await Encrypt(`${mpc_data.created_on}`),
                        avatar_url_path: mpc_data.avatar_url_path ? await Encrypt(`${mpc_data.avatar_url_path}`) : await Encrypt(``),
                        avatar_title: mpc_data.avatar_title ? await Encrypt(`${mpc_data.avatar_title}`) : await Encrypt(``),
                        language_code: await Encrypt(`${collected_end_user_data.language}`),
                        region_code: await Encrypt(`${collected_end_user_data.region}`),
                        login_on: mpc_data.login_on ? await Encrypt(`${mpc_data.login_on}`) : await Encrypt(``),
                        logout_on: mpc_data.logout_on ? await Encrypt(`${mpc_data.logout_on}`) : await Encrypt(``),
                        login_type: await Encrypt(`TWITCH`),
                        account_type: await Encrypt(`${mpc_data.account_type}`),
                        email_address: twitch_data.email === mpc_data.email_address ? await Encrypt(`${twitch_data.email}`) : await Encrypt(``)
                    })

                    resolve(true)
                }
            })
        })
    }
}