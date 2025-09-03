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
    UPDATE_END_USER_TWITCH_CHANNEL_STATE,
    UPDATE_END_USER_TWITCH_FOLLOWERS_STATE,
    UPDATE_END_USER_TWITCH_STREAM_STATE
} from '@Constants'

import type { Current_Redux_State } from '@Redux_Thunk/Combined_Reducers'
import type { AppDispatch } from '@Redux_Thunk/Provider'

import {
    Get_Device_Information,
    Map_GUI_Values_For_Database_Storage
} from '@Redux_Thunk/Actions/Misc'

import axios from 'axios'

export const Login_End_User_Twitch_Account = () => (dispatch: AppDispatch, getState: () => Current_Redux_State): Promise<unknown> | undefined => {
    try {

        const url = new URL(window.location.href)
        const code = url.searchParams.get("code")
        let state = getState()

        let current_language_state = state.Application_Language_State_Reducer
        let current_settings_state = state.Application_Settings_State_Reducer
        let current_end_user_state = state.End_User_Account_State_Reducer

        let collected_end_user_data = {
            nav_lock: current_settings_state.nav_lock,
            theme: current_settings_state.theme,
            grid_type: current_settings_state.grid_type,
            language: current_language_state.language,
            region: current_language_state.region
        }

        let converted_to_numerical_values = Map_GUI_Values_For_Database_Storage({
            alignment: current_settings_state.alignment,
            text_alignment: current_settings_state.text_alignment
        })

        if (code && !current_end_user_state.id) {

            axios.post(`/api/authentication/login/twitch_account`, {
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
                    error.id = `Application-Twitch-Login-Call-Failed`
                    await dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                    setTimeout(() => {
                        dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                        dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                    }, 1000)
                    reject(error)
                })
            }).then( async (response: any) => {
                
                if (response.data && response.data.twitch_data && response.data.mpc_data) {

                    let twitch_data = response.data.twitch_data
                    let mpc_data = response.data.mpc_data
                    const twitch_id: bigint = BigInt(twitch_data.user.id)
                    
                    return await new Promise((resolve) => {

                        dispatch({
                            type: UPDATE_END_USER_TWITCH_ACCOUNT_STATE, payload: {
                                id: parseInt(`${twitch_id}`),
                                display_name: twitch_data.user.display_name,
                                email_address: twitch_data.user.email,
                                login: twitch_data.user.login,
                                profile_image_url: twitch_data.user.profile_image_url
                            }
                        })

                        dispatch({
                            type: UPDATE_END_USER_TWITCH_CHANNEL_STATE, payload: {
                                channel_id: twitch_data.channel.twitch_channel_id,
                                login: twitch_data.channel.twitch_login,
                                display_name: twitch_data.channel.twitch_display_name,
                                type: twitch_data.channel.twitch_type,
                                broadcaster_type: twitch_data.channel.twitch_broadcaster_type,
                                description: twitch_data.channel.twitch_description,
                                profile_image_url: twitch_data.channel.twitch_profile_image_url,
                                offline_image_url: twitch_data.channel.twitch_offline_image_url,
                                current_view_count: twitch_data.channel.twitch_current_view_count,
                                created_at: twitch_data.channel.twitch_created_at
                            }
                        })

                        dispatch({
                            type: UPDATE_END_USER_TWITCH_FOLLOWERS_STATE, payload: {
                                total: twitch_data.follower_count
                            }
                        })

                        dispatch({
                            type: UPDATE_END_USER_TWITCH_STREAM_STATE, payload: {
                                id: twitch_data.stream.id,
                                user_id: twitch_data.stream.user_id,
                                game_id: twitch_data.stream.game_id,
                                viewer_count: twitch_data.stream.viewer_count,
                                started_at: twitch_data.stream.started_at,
                                user_login: twitch_data.stream.user_login,
                                user_name: twitch_data.stream.user_name,
                                game_name: twitch_data.stream.game_name,
                                type: twitch_data.stream.type,
                                title: twitch_data.stream.title,
                                language: twitch_data.stream.language,
                                thumbnail_url: twitch_data.stream.thumbnail_url,
                                tag_ids: twitch_data.stream.tag_ids,
                                tags: twitch_data.stream.tags,
                                is_mature: twitch_data.stream.is_mature,
                            }
                        })

                        dispatch({
                            type: UPDATE_APPLICATION_LANGUAGE_CURRENT_VALUE, payload: {
                                current_language: `${mpc_data.language}-${mpc_data.region}`
                            }
                        })

                        dispatch({
                            type: UPDATE_END_USER_ACCOUNT_STATE, payload: {
                                account_type: parseInt(mpc_data.account_type),
                                created_on: parseInt(mpc_data.created_on),
                                email_address: twitch_data.user.email,
                                id: parseInt(mpc_data.id),
                                login_on: parseInt(mpc_data.login_on),
                                token: mpc_data.token,
                                name: twitch_data.user.display_name + mpc_data.name,
                                roles: mpc_data.roles,
                                client_address: CLIENT_ADDRESS,
                                groups: mpc_data.groups,
                                login_type: mpc_data.login_type,
                                online_status: parseInt(mpc_data.online_status),
                                avatar_title: twitch_data.user.display_name,
                                avatar_url_path: twitch_data.user.profile_image_url
                            }
                        })

                        resolve({ twitch_data: twitch_data, mpc_data: mpc_data })
                    })
                }
            })

        } else if (code && current_end_user_state.id) {

            axios.post(`/api/integrate/twitch`, {
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
                    error.id = `Application-Twitch-Login-Call-Failed`
                    await dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                    setTimeout(() => {
                        dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                        dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                    }, 1000)
                    reject(error)
                })
            }).then( async (response: any) => {

                if (response.data && response.data.twitch_data) {

                    let twitch_data = response.data.twitch_data
                    const twitch_id: bigint = BigInt(twitch_data.user.id)

                    return await new Promise((resolve) => {

                        dispatch({
                            type: UPDATE_END_USER_TWITCH_ACCOUNT_STATE, payload: {
                                id: parseInt(`${twitch_id}`),
                                display_name: twitch_data.user.display_name,
                                email_address: twitch_data.user.email,
                                login: twitch_data.user.login,
                                profile_image_url: twitch_data.user.profile_image_url
                            }
                        })

                        dispatch({
                            type: UPDATE_END_USER_TWITCH_CHANNEL_STATE, payload: {
                                channel_id: twitch_data.channel.twitch_channel_id,
                                login: twitch_data.channel.twitch_login,
                                display_name: twitch_data.channel.twitch_display_name,
                                type: twitch_data.channel.twitch_type,
                                broadcaster_type: twitch_data.channel.twitch_broadcaster_type,
                                description: twitch_data.channel.twitch_description,
                                profile_image_url: twitch_data.channel.twitch_profile_image_url,
                                offline_image_url: twitch_data.channel.twitch_offline_image_url,
                                current_view_count: twitch_data.channel.twitch_current_view_count,
                                created_at: twitch_data.channel.twitch_created_at
                            }
                        })

                        dispatch({
                            type: UPDATE_END_USER_TWITCH_FOLLOWERS_STATE, payload: {
                                total: twitch_data.follower_count
                            }
                        })

                        dispatch({
                            type: UPDATE_END_USER_TWITCH_STREAM_STATE, payload: {
                                id: twitch_data.stream.id,
                                user_id: twitch_data.stream.user_id,
                                game_id: twitch_data.stream.game_id,
                                viewer_count: twitch_data.stream.viewer_count,
                                started_at: twitch_data.stream.started_at,
                                user_login: twitch_data.stream.user_login,
                                user_name: twitch_data.stream.user_name,
                                game_name: twitch_data.stream.game_name,
                                type: twitch_data.stream.type,
                                title: twitch_data.stream.title,
                                language: twitch_data.stream.language,
                                thumbnail_url: twitch_data.stream.thumbnail_url,
                                tag_ids: twitch_data.stream.tag_ids,
                                tags: twitch_data.stream.tags,
                                is_mature: twitch_data.stream.is_mature,
                            }
                        })

                        resolve({ twitch_data: twitch_data })
                    })
                }
            })
        }
    } catch (error: any) {
        return new Promise(async (reject) => {
            console.error(error)
            error.id = `Application-Twitch-Login-Process-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1000)
            reject(error)
        })
    }
}