import {
    UPDATE_NETWORK_ERROR_STATE,
    JWT_ISSUER_KEY,
    JWT_CLIENT_KEY,
    CLIENT_ADDRESS,
    DEFAULT_HOST_ERROR_STATE,
    DEFAULT_NETWORK_ERROR_STATE,
    UPDATE_END_USER_FRIENDS_PERMISSION_STATE,
    UPDATE_END_USER_FRIENDS_RECEIVED_PERMISSION_STATE,
    UPDATE_END_USER_FRIENDS_APPROVED_PERMISSION_STATE
} from '@Constants'
import axios from 'axios'

import type { Current_Redux_State } from '@Redux_Thunk/Combined_Reducers'
import type { AppDispatch } from '@Redux_Thunk/Provider'
import { Get_Device_Information } from '@Redux_Thunk/Actions/Misc'

export const Load_End_User_Friends = () => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {
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
            error.id = `Load-End-User-Permissions-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1)
            reject(error)
        })
    }).then( async (response: any) => {
        return await new Promise( async (resolve) => {

            let approved_user_ids: BigInt[] = []
            let approved_user_data: {
                [user_id: string]: {
                    account: {
                        user_id: BigInt | null,
                        avatar_title: string | null,
                        avatar_url_path: string | null,
                        created_on: BigInt | null,
                        custom_lbl: string | null,
                        email_address: string | null,
                        login_on: BigInt | null,
                        login_type: string | null,
                        name: string | null,
                        public_id: string | null,
                        online_status: string | null,
                        account_type: number | null,
                        roles: string | null,
                        groups: string | null,
                    },
                    identity: {
                        first_name: string | null,
                        last_name: string |  null,
                        middle_name: string | null,
                        maiden_name: string | null,
                        gender: number | null,
                        birth_month: number | null,
                        birth_day: number | null,
                        birth_year: number | null,
                        ethnicity: string |  null,
                    },
                    twitch: {
                        twitch_id: BigInt | null,
                        display_name: string | null,
                        login: string | null,
                        email_address: string | null,
                        profile_image_url: string | null,
                    },
                }
            } = { }

            let blocking_user_ids: BigInt[] = []
            let blocking_users_data: {
                [user_id: string]: {
                    account: {
                        user_id: BigInt | null,
                        avatar_title: string | null,
                        avatar_url_path: string | null,
                        created_on: BigInt | null,
                        custom_lbl: string | null,
                        email_address: string | null,
                        login_on: BigInt | null,
                        login_type: string | null,
                        name: string | null,
                        public_id: string | null,
                        online_status: string | null,
                        account_type: number | null,
                        roles: string | null,
                        groups: string | null,
                    },
                    identity: {
                        first_name: string | null,
                        last_name: string | null,
                        middle_name: string | null,
                        maiden_name: string | null,
                        gender: number | null,
                        birth_month: number | null,
                        birth_day: number | null,
                        birth_year: number | null,
                        ethnicity: string | null,
                    },
                    twitch: {
                        twitch_id: BigInt | null,
                        display_name: string | null,
                        login: string | null,
                        email_address: string | null,
                        profile_image_url: string | null,
                    },
                }
            } = {}

            let sent_request_ids: BigInt[] = []
            let recieved_request_ids: BigInt[] = []
            let blocked_by_other_user_ids: BigInt[] = []

            let sent_permission_user_ids = Object.keys(response?.data.sent_permissions)
            let received_permissions_user_ids = Object.keys(response?.data.received_permissions)

            if (received_permissions_user_ids.length > 0) {
                for (let id of received_permissions_user_ids) {
                    switch (true) {
                        case response?.data.received_permissions[id].approve === true:
                            approved_user_ids.push(BigInt(id))
                            break
                        case response?.data.received_permissions[id].block === true:
                            if (response?.data.received_permissions[id].record_updated_by === end_user_account.id) {
                                blocking_user_ids.push(BigInt(id))
                            } else {
                                blocked_by_other_user_ids.push(BigInt(id))
                            }
                            break
                        case response?.data.received_permissions[id].request === true:
                            recieved_request_ids.push(BigInt(id))
                            break
                    }
                }
            }

            if (sent_permission_user_ids.length > 0) {
                for (let id of sent_permission_user_ids) {
                    switch (true) {
                        case response?.data.sent_permissions[id].approve === true:
                            approved_user_ids.push(BigInt(id))
                            break
                        case response?.data.sent_permissions[id].block === true:
                            if (response?.data.sent_permissions[id].record_updated_by === end_user_account.id) {
                                blocking_user_ids.push(BigInt(id))
                            } else {
                                blocked_by_other_user_ids.push(BigInt(id))
                            }
                            break
                        case response?.data.sent_permissions[id].request === true:
                            sent_request_ids.push(BigInt(id))
                            break
                    }
                }
            }

            for (let user_id of approved_user_ids) {

                await axios.post(`/api/community/member`, {
                    user_id: user_id.toString(),
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
                    device_ram_gb: `${Get_Device_Information().deviceMemory}`
                }).then( async (response: any) => {

                    const user_id = String(response.data.user_data.id)

                    approved_user_data[user_id] = {
                        account: {
                            user_id: response.data.user_data.id,
                            avatar_title: response.data.user_data.avatar_title ?? null,
                            avatar_url_path: response.data.user_data.avatar_url_path ?? null,
                            created_on: response.data.user_data.created_on ?? null,
                            custom_lbl: response.data.user_data.custom_lbl ?? null,
                            email_address: response.data.user_data.email_address ?? null,
                            login_on: response.data.user_data.login_on ?? null,
                            login_type: response.data.user_data.login_type ?? null,
                            name: response.data.user_data.name ?? null,
                            public_id: response.data.user_data.public_id ?? null,
                            online_status: response.data.user_data.online_status ?? null,
                            account_type: response.data.user_data.account_type ?? null,
                            roles: response.data.user_data.roles ?? null,
                            groups: response.data.user_data.groups ?? null,
                        },
                        identity: {
                            first_name: response.data.user_profile_data.first_name ?? null,
                            last_name: response.data.user_profile_data.last_name ?? null,
                            middle_name: response.data.user_profile_data.middle_name ?? null,
                            maiden_name: response.data.user_profile_data.maiden_name ?? null,
                            gender: response.data.user_profile_data.gender ?? null,
                            birth_month: response.data.user_profile_data.birth_month ?? null,
                            birth_day: response.data.user_profile_data.birth_day ?? null,
                            birth_year: response.data.user_profile_data.birth_year ?? null,
                            ethnicity: response.data.user_profile_data.ethnicity ?? null,
                        },
                        twitch: {
                            twitch_id: response.data.user_twitch_data.twitch_id ?? null,
                            display_name: response.data.user_twitch_data.display_name ?? null,
                            login: response.data.user_twitch_data.twitch_login ?? null,
                            email_address: response.data.user_twitch_data.twitch_email_address ?? null,
                            profile_image_url: response.data.user_twitch_data.profile_image_url ?? null,
                        },
                    }
                })
            }

            for (let user_id of blocking_user_ids) {

                await axios.post(`/api/community/member`, {
                    user_id: user_id.toString(),
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
                    device_ram_gb: `${Get_Device_Information().deviceMemory}`
                }).then(async (response: any) => {

                    const user_id = String(response.data.user_data.id)

                    blocking_users_data[user_id] = {
                        account: {
                            user_id: response.data.user_data.id,
                            avatar_title: response.data.user_data.avatar_title ?? null,
                            avatar_url_path: response.data.user_data.avatar_url_path ?? null,
                            created_on: response.data.user_data.created_on ?? null,
                            custom_lbl: response.data.user_data.custom_lbl ?? null,
                            email_address: response.data.user_data.email_address ?? null,
                            login_on: response.data.user_data.login_on ?? null,
                            login_type: response.data.user_data.login_type ?? null,
                            name: response.data.user_data.name ?? null,
                            public_id: response.data.user_data.public_id ?? null,
                            online_status: response.data.user_data.online_status ?? null,
                            account_type: response.data.user_data.account_type ?? null,
                            roles: response.data.user_data.roles ?? null,
                            groups: response.data.user_data.groups ?? null,
                        },
                        identity: {
                            first_name: response.data.user_profile_data.first_name ?? null,
                            last_name: response.data.user_profile_data.last_name ?? null,
                            middle_name: response.data.user_profile_data.middle_name ?? null,
                            maiden_name: response.data.user_profile_data.maiden_name ?? null,
                            gender: response.data.user_profile_data.gender ?? null,
                            birth_month: response.data.user_profile_data.birth_month ?? null,
                            birth_day: response.data.user_profile_data.birth_day ?? null,
                            birth_year: response.data.user_profile_data.birth_year ?? null,
                            ethnicity: response.data.user_profile_data.ethnicity ?? null,
                        },
                        twitch: {
                            twitch_id: response.data.user_twitch_data.twitch_id ?? null,
                            display_name: response.data.user_twitch_data.display_name ?? null,
                            login: response.data.user_twitch_data.twitch_login ?? null,
                            email_address: response.data.user_twitch_data.twitch_email_address ?? null,
                            profile_image_url: response.data.user_twitch_data.profile_image_url ?? null,
                        },
                    }
                })
            }

            dispatch({
                type: UPDATE_END_USER_FRIENDS_PERMISSION_STATE,
                payload: {
                    approved: {
                        user_ids: approved_user_ids,
                        users_data: approved_user_data,
                    },
                    blocked: {
                        by_other_user_ids: blocked_by_other_user_ids,
                        user_ids: blocking_user_ids,
                        users_data: blocking_users_data,
                    },
                    sent_requests: sent_request_ids,
                    received_requests: recieved_request_ids,
                    time_stamped: response.data.time_stamped
                }
            })

            resolve(true)
        })
    })
}

export const Approve_Friend = (participant_id: BigInt) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {
    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer
    let current_friends = state.End_User_Friends_State_Reducer

    await axios.put(`/api/user/social/connection/friend/approve`, {
        end_user_id: `${end_user_account.id.toString()}`,
        participant_id: `${participant_id.toString()}`,
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
            error.id = `Approved-Friend-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1)
            reject(error)
        })
    }).then(async (response: any) => {
        return await new Promise((resolve) => {
            var if_value_in_received_requests_remove_it = current_friends.received_requests.indexOf(participant_id)
            if (if_value_in_received_requests_remove_it != -1) {
                current_friends.received_requests.splice(if_value_in_received_requests_remove_it, 1)
            }
            dispatch({ type: UPDATE_END_USER_FRIENDS_RECEIVED_PERMISSION_STATE, payload: { received_requests: current_friends.received_requests } })
            current_friends.approved.push(participant_id)
            dispatch({ type: UPDATE_END_USER_FRIENDS_APPROVED_PERMISSION_STATE, payload: { approved: current_friends.approved } })
            resolve(response.data)
        })
    })
}

export const Unfriend = (participant_id: BigInt) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {
    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer
    let current_friends = state.End_User_Friends_State_Reducer

    await axios.put(`/api/user/social/connection/friend/unfriend`, {
        end_user_id: `${end_user_account.id.toString()}`,
        participant_id: `${participant_id.toString()}`,
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
    }).then( async (response: any) => {
        return await new Promise((resolve) => {
            current_friends.approved.splice(current_friends.approved.indexOf(participant_id), 1)
            dispatch({ type: UPDATE_END_USER_FRIENDS_APPROVED_PERMISSION_STATE, payload: { approved: current_friends.approved } })
            resolve(response.data)
        })
    })
}

export const Block_Friend = (participant_id: BigInt) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {
    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer
    let current_friends = state.End_User_Friends_State_Reducer

    await axios.put(`/api/user/social/connection/friend/block`, {
        end_user_id: `${end_user_account.id.toString()}`,
        participant_id: `${participant_id.toString()}`,
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
            error.id = `Block-Friend-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1)
            reject(error)
        })
    }).then( async (response: any) => {
        return await new Promise((resolve) => {
            Remove_Friend_Permissions_From_State_Reducer(participant_id)
            current_friends.blocked.user_ids.push(participant_id)

            dispatch({
                type: UPDATE_END_USER_FRIENDS_PERMISSION_STATE,
                payload: {
                    approved: current_friends.approved,
                    blocked: current_friends.blocked,
                    sent_requests: current_friends.sent_requests,
                    received_requests: current_friends.received_requests,
                    time_stamped: response.data.time_stamped
                }
            })
            resolve(response.data)
        })
    })
}

export const Unblock_Friend = (participant_id: BigInt) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {
    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer
    let current_friends = state.End_User_Friends_State_Reducer

    await axios.put(`/api/user/social/connection/friend/unblock`, {
        end_user_id: `${end_user_account.id.toString()}`,
        participant_id: `${participant_id.toString()}`,
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
        return await new Promise((resolve) => {
            var remove_blocked_id = current_friends.sent_requests.indexOf(participant_id)
            current_friends.blocked.user_ids.splice(remove_blocked_id, 1)

            dispatch({
                type: UPDATE_END_USER_FRIENDS_PERMISSION_STATE,
                payload: {
                    approved: current_friends.approved,
                    blocked: current_friends.blocked,
                    sent_requests: current_friends.sent_requests,
                    received_requests: current_friends.received_requests,
                    time_stamped: response.data.time_stamped
                }
            })
            resolve(response.data)
        })
    })
}

export const Request_Friend = (value: BigInt) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {
    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer
    let current_friends = state.End_User_Friends_State_Reducer

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
    }).then(async (response: any) => {
        return await new Promise((resolve) => {
            dispatch({
                type: UPDATE_END_USER_FRIENDS_RECEIVED_PERMISSION_STATE,
                payload: { sent_requests: current_friends.sent_requests.push(value) }
            })
            resolve(response.data)
        })
    })
}

export const Reject_Friend = (value: BigInt) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {
    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer
    let current_friends = state.End_User_Friends_State_Reducer

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
        return await new Promise((resolve) => {
            dispatch({
                type: UPDATE_END_USER_FRIENDS_RECEIVED_PERMISSION_STATE,
                payload: {
                    recieved_requests: current_friends.received_requests.splice(current_friends.received_requests.indexOf(value), 1)
                }
            })
            resolve(response.data)
        })
    })
}

export const Report_Friend = (dto: { participant_id: BigInt, type: string, reason: string | undefined }) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {
    let state = getState()
    let current_friends = state.End_User_Friends_State_Reducer

    Remove_Friend_Permissions_From_State_Reducer(dto.participant_id)

    return await new Promise(() => {

        current_friends.blocked.user_ids.push(dto.participant_id)

        dispatch({
            type: UPDATE_END_USER_FRIENDS_PERMISSION_STATE,
            payload: {
                approved: current_friends.approved,
                blocked: current_friends.blocked,
                sent_requests: current_friends.sent_requests,
                received_requests: current_friends.received_requests,
            }
        })

    })
}

export const Remove_Friend_Permissions_From_State_Reducer = (participant_id: BigInt) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {
    let state = getState()
    let current_friends = state.End_User_Friends_State_Reducer

    var if_value_in_received_requests_remove_it = current_friends.received_requests.indexOf(participant_id)
    if (if_value_in_received_requests_remove_it != -1) {
        current_friends.received_requests.splice(if_value_in_received_requests_remove_it, 1)
    }

    var if_value_in_sent_requests_remove_it = current_friends.sent_requests.indexOf(participant_id)
    if (if_value_in_sent_requests_remove_it != -1) {
        current_friends.sent_requests.splice(if_value_in_sent_requests_remove_it, 1)
    }

    var if_value_in_approved_then_remove_it = current_friends.approved.indexOf(participant_id)
    if (if_value_in_approved_then_remove_it != -1) {
        current_friends.approved.splice(if_value_in_approved_then_remove_it, 1)
    }
}