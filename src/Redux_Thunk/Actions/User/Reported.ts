import {
    UPDATE_NETWORK_ERROR_STATE,
    DEFAULT_NETWORK_ERROR_STATE,
    UPDATE_END_USER_FRIENDS_PERMISSION_STATE,
    UPDATE_END_USER_REPORTED_USER_STATE,
    CLIENT_ADDRESS,
    JWT_ISSUER_KEY,
    JWT_CLIENT_KEY
} from '@Constants'

import { Get_Device_Information } from '@Redux_Thunk/Actions/Misc'
import { Remove_Friend_Permissions_From_State_Reducer } from '@Redux_Thunk/Actions/User/Friends'

import type { Current_Redux_State } from '@Redux_Thunk/Combined_Reducers'
import type { AppDispatch } from '@Redux_Thunk/Provider'
import axios from 'axios'

export const Build_Required_Report_Object = (dto: {
    report_type: string,
    end_user_id: BigInt,
    account_type: string
    language: string,
    region: string,
    login_type: string
    participant_id: BigInt,
    report_reason: string | undefined
}) => {
    return {
        report_reason: `${dto.report_reason}`,
        report_type: `${dto.report_type}`,
        participant_id: `${dto.participant_id}`,
        end_user_id: `${dto.end_user_id}`,
        account_type: `${dto.account_type}`,
        login_type: `${dto.login_type}`,
        language: `${dto.language}`,
        region: `${dto.region}`,
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
    }
}

export const Report_Spam_Content = (dto: { participant_id: BigInt, reason: string | undefined }) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = getState().End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer
    let current_reported = state.End_User_Reported_User_State_Reducer
    let current_friends = state.End_User_Friends_State_Reducer

    await axios.post('/api/user/reported', Build_Required_Report_Object({
        report_type: "SPAM",
        end_user_id: end_user_account.id,
        account_type: `${end_user_account.account_type}`,
        language: current_language_state.language,
        region: current_language_state.region,
        login_type: end_user_account.login_type ? end_user_account.login_type : `n/a`,
        participant_id: dto.participant_id,
        report_reason: dto.reason
    })).catch((error) => {

        return new Promise((reject) => {
            error.id = `Report-Spam-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1)
            reject(error)
        })

    }).then( async (response: any) => {
        return await new Promise(() => {

            Remove_Friend_Permissions_From_State_Reducer(dto.participant_id)

            dispatch({
                type: UPDATE_END_USER_FRIENDS_PERMISSION_STATE,
                payload: {
                    blocked: current_friends.blocked.user_ids.push(dto.participant_id),
                    time_stamped: response.data.time_stamped
                }
            })

            dispatch({
                type: UPDATE_END_USER_REPORTED_USER_STATE,
                payload: {
                    reported: current_reported.reported.user_ids.push(dto.participant_id)
                }
            })

        })
    })
}

export const Report_Abusive_Content = (dto:{ participant_id: BigInt, reason: string | undefined }) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer
    let current_reported = state.End_User_Reported_User_State_Reducer
    let current_friends = state.End_User_Friends_State_Reducer

    await axios.post('/api/user/reported', Build_Required_Report_Object({
        report_type: "ABUSE",
        end_user_id: end_user_account.id,
        account_type: `${end_user_account.account_type}`,
        language: current_language_state.language,
        region: current_language_state.region,
        login_type: end_user_account.login_type ? end_user_account.login_type : `n/a`,
        participant_id: dto.participant_id,
        report_reason: dto.reason
    })).catch((error) => {

        return new Promise((reject) => {
            error.id = `Report-Abuse-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1)
            reject(error)
        })

    }).then(async (response: any) => {
        return await new Promise(() => {

            Remove_Friend_Permissions_From_State_Reducer(dto.participant_id)

            dispatch({
                type: UPDATE_END_USER_FRIENDS_PERMISSION_STATE,
                payload: {
                    blocked: current_friends.blocked.user_ids.push(dto.participant_id),
                    time_stamped: response.data.time_stamped
                }
            })

            dispatch({
                type: UPDATE_END_USER_REPORTED_USER_STATE,
                payload: {
                    reported: current_reported.reported.user_ids.push(dto.participant_id)
                }
            })

        })
    })
}

export const Report_Disruptive_Behavior = (dto:{ participant_id: BigInt, reason: string | undefined }) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer
    let current_reported = state.End_User_Reported_User_State_Reducer
    let current_friends = state.End_User_Friends_State_Reducer

    await axios.post('/api/user/reported', Build_Required_Report_Object({
        report_type: "DISRUPTIVE",
        end_user_id: end_user_account.id,
        account_type: `${end_user_account.account_type}`,
        language: current_language_state.language,
        region: current_language_state.region,
        login_type: end_user_account.login_type ? end_user_account.login_type : `n/a`,
        participant_id: dto.participant_id,
        report_reason: dto.reason
    })).catch((error) => {

        return new Promise((reject) => {
            error.id = `WebSocket-Report-Disruptive-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1)
            reject(error)
        })

    })
}

export const Report_Self_Harm_Content = (dto:{ participant_id: BigInt, reason: string | undefined }) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer
    let current_reported = state.End_User_Reported_User_State_Reducer
    let current_friends = state.End_User_Friends_State_Reducer

    await axios.post('/api/user/reported', Build_Required_Report_Object({
        report_type: "SELF_HARM",
        end_user_id: end_user_account.id,
        account_type: `${end_user_account.account_type}`,
        language: current_language_state.language,
        region: current_language_state.region,
        login_type: end_user_account.login_type ? end_user_account.login_type : `n/a`,
        participant_id: dto.participant_id,
        report_reason: dto.reason
    })).catch((error) => {

        return new Promise((reject) => {
            error.id = `WebSocket-Report-Self-Harm-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1)
            reject(error)
        })

    })
}

export const Report_Illegal_Content = (dto:{ participant_id: BigInt, reason: string | undefined }) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer
    let current_reported = state.End_User_Reported_User_State_Reducer
    let current_friends = state.End_User_Friends_State_Reducer

    await axios.post('/api/user/reported', Build_Required_Report_Object({
        report_type: "ILLEGAL",
        end_user_id: end_user_account.id,
        account_type: `${end_user_account.account_type}`,
        language: current_language_state.language,
        region: current_language_state.region,
        login_type: end_user_account.login_type ? end_user_account.login_type : `n/a`,
        participant_id: dto.participant_id,
        report_reason: dto.reason
    })).catch((error) => {

        return new Promise((reject) => {
            error.id = `WebSocket-Report-Illegal-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1)
            reject(error)
        })

    }).then(async (response: any) => {
        return await new Promise(() => {

            Remove_Friend_Permissions_From_State_Reducer(dto.participant_id)

            dispatch({
                type: UPDATE_END_USER_FRIENDS_PERMISSION_STATE,
                payload: {
                    blocked: current_friends.blocked.user_ids.push(dto.participant_id),
                    time_stamped: response.data.time_stamped
                }
            })

            dispatch({
                type: UPDATE_END_USER_REPORTED_USER_STATE,
                payload: {
                    reported: current_reported.reported.user_ids.push(dto.participant_id)
                }
            })

        })
    })
}

export const Report_Harrass_Chat = (dto:{ participant_id: BigInt, reason: string | undefined }) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer
    let current_reported = state.End_User_Reported_User_State_Reducer
    let current_friends = state.End_User_Friends_State_Reducer


    await axios.post('/api/user/reported', Build_Required_Report_Object({
        report_type: "HARASS",
        end_user_id: end_user_account.id,
        account_type: `${end_user_account.account_type}`,
        language: current_language_state.language,
        region: current_language_state.region,
        login_type: end_user_account.login_type ? end_user_account.login_type : `n/a`,
        participant_id: dto.participant_id,
        report_reason: dto.reason
    })).catch((error) => {

        return new Promise((reject) => {
            error.id = `WebSocket-Report-Harrass-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1)
            reject(error)
        })

    }).then(async (response: any) => {
        return await new Promise(() => {

            Remove_Friend_Permissions_From_State_Reducer(dto.participant_id)

            dispatch({
                type: UPDATE_END_USER_FRIENDS_PERMISSION_STATE,
                payload: {
                    blocked: current_friends.blocked.user_ids.push(dto.participant_id),
                    time_stamped: response.data.time_stamped
                }
            })

            dispatch({
                type: UPDATE_END_USER_REPORTED_USER_STATE,
                payload: {
                    reported: current_reported.reported.user_ids.push(dto.participant_id)
                }
            })

        })
    })
}

export const Report_Misleading_Chat = (dto:{ participant_id: BigInt, reason: string | undefined }) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer
    let current_reported = state.End_User_Reported_User_State_Reducer
    let current_friends = state.End_User_Friends_State_Reducer

    await axios.post('/api/user/reported', Build_Required_Report_Object({
        report_type: "MISLEADING",
        end_user_id: end_user_account.id,
        account_type: `${end_user_account.account_type}`,
        language: current_language_state.language,
        region: current_language_state.region,
        login_type: end_user_account.login_type ? end_user_account.login_type : `n/a`,
        participant_id: dto.participant_id,
        report_reason: dto.reason
    })).catch((error) => {

        return new Promise((reject) => {
            error.id = `WebSocket-Report-Self-Harm-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1)
            reject(error)
        })

    }).then(async (response: any) => {
        return await new Promise(() => {

            Remove_Friend_Permissions_From_State_Reducer(dto.participant_id)

            dispatch({
                type: UPDATE_END_USER_FRIENDS_PERMISSION_STATE,
                payload: {
                    blocked: current_friends.blocked.user_ids.push(dto.participant_id),
                    time_stamped: response.data.time_stamped
                }
            })

            dispatch({
                type: UPDATE_END_USER_REPORTED_USER_STATE,
                payload: {
                    reported: current_reported.reported.user_ids.push(dto.participant_id)
                }
            })

        })
    })
}

export const Report_Threat_Chat = (dto:{ participant_id: BigInt, reason: string | undefined }) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer
    let current_reported = state.End_User_Reported_User_State_Reducer
    let current_friends = state.End_User_Friends_State_Reducer

    await axios.post('/api/user/reported', Build_Required_Report_Object({
        report_type: "THREAT",
        end_user_id: end_user_account.id,
        account_type: `${end_user_account.account_type}`,
        language: current_language_state.language,
        region: current_language_state.region,
        login_type: end_user_account.login_type ? end_user_account.login_type : `n/a`,
        participant_id: dto.participant_id,
        report_reason: dto.reason
    })).catch((error) => {

        return new Promise((reject) => {
            error.id = `WebSocket-Report-Threat-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1)
            reject(error)
        })

    }).then(async (response: any) => {
        return await new Promise(() => {

            Remove_Friend_Permissions_From_State_Reducer(dto.participant_id)

            dispatch({
                type: UPDATE_END_USER_FRIENDS_PERMISSION_STATE,
                payload: {
                    blocked: current_friends.blocked.user_ids.push(dto.participant_id),
                    time_stamped: response.data.time_stamped
                }
            })

            dispatch({
                type: UPDATE_END_USER_REPORTED_USER_STATE,
                payload: {
                    reported: current_reported.reported.user_ids.push(dto.participant_id)
                }
            })

        })
    })
}

export const Report_Nudity_Content = (dto:{ participant_id: BigInt, reason: string | undefined }) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer
    let current_reported = state.End_User_Reported_User_State_Reducer
    let current_friends = state.End_User_Friends_State_Reducer

    await axios.post('/api/user/reported', Build_Required_Report_Object({
        report_type: "NUDITY",
        end_user_id: end_user_account.id,
        account_type: `${end_user_account.account_type}`,
        language: current_language_state.language,
        region: current_language_state.region,
        login_type: end_user_account.login_type ? end_user_account.login_type : `n/a`,
        participant_id: dto.participant_id,
        report_reason: dto.reason
    })).catch((error) => {

        return new Promise((reject) => {
            error.id = `WebSocket-Report-Nudity-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1)
            reject(error)
        })

    }).then(async (response: any) => {
        return await new Promise(() => {

            Remove_Friend_Permissions_From_State_Reducer(dto.participant_id)

            dispatch({
                type: UPDATE_END_USER_FRIENDS_PERMISSION_STATE,
                payload: {
                    blocked: current_friends.blocked.user_ids.push(dto.participant_id),
                    time_stamped: response.data.time_stamped
                }
            })

            dispatch({
                type: UPDATE_END_USER_REPORTED_USER_STATE,
                payload: {
                    reported: current_reported.reported.user_ids.push(dto.participant_id)
                }
            })

        })
    })
}

export const Report_Fake_Account = (dto:{ participant_id: BigInt, reason: string | undefined }) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer
    let current_reported = state.End_User_Reported_User_State_Reducer
    let current_friends = state.End_User_Friends_State_Reducer

    await axios.post('/api/user/reported', Build_Required_Report_Object({
        report_type: "FAKE_ACCOUNT",
        end_user_id: end_user_account.id,
        account_type: `${end_user_account.account_type}`,
        language: current_language_state.language,
        region: current_language_state.region,
        login_type: end_user_account.login_type ? end_user_account.login_type : `n/a`,
        participant_id: dto.participant_id,
        report_reason: dto.reason
    })).catch((error) => {

        return new Promise((reject) => {
            error.id = `WebSocket-Report-Fake-Account-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1)
            reject(error)
        })

    }).then(async (response: any) => {
        return await new Promise(() => {

            Remove_Friend_Permissions_From_State_Reducer(dto.participant_id)

            dispatch({
                type: UPDATE_END_USER_FRIENDS_PERMISSION_STATE,
                payload: {
                    blocked: current_friends.blocked.user_ids.push(dto.participant_id),
                    time_stamped: response.data.time_stamped
                }
            })

            dispatch({
                type: UPDATE_END_USER_REPORTED_USER_STATE,
                payload: {
                    reported: current_reported.reported.user_ids.push(dto.participant_id)
                }
            })

        })
    })
}

export const Report_Hate_Content = (dto:{ participant_id: BigInt, reason: string | undefined }) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer
    let current_reported = state.End_User_Reported_User_State_Reducer
    let current_friends = state.End_User_Friends_State_Reducer

    await axios.post('/api/user/reported', Build_Required_Report_Object({
        report_type: "HATE_SPEECH",
        end_user_id: end_user_account.id,
        account_type: `${end_user_account.account_type}`,
        language: current_language_state.language,
        region: current_language_state.region,
        login_type: end_user_account.login_type ? end_user_account.login_type : `n/a`,
        participant_id: dto.participant_id,
        report_reason: dto.reason
    })).catch((error) => {
        return new Promise((reject) => {
            error.id = `WebSocket-Report-Hate-Speech-Failed`
            dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
            setTimeout(() => {
                dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
            }, 1)
            reject(error)
        })
    }).then(async (response: any) => {
        return await new Promise(() => {

            Remove_Friend_Permissions_From_State_Reducer(dto.participant_id)

            dispatch({
                type: UPDATE_END_USER_FRIENDS_PERMISSION_STATE,
                payload: {
                    blocked: current_friends.blocked.user_ids.push(dto.participant_id),
                    time_stamped: response.data.time_stamped
                }
            })

            dispatch({
                type: UPDATE_END_USER_REPORTED_USER_STATE,
                payload: {
                    reported: current_reported.reported.user_ids.push(dto.participant_id)
                }
            })

        })
    })
}