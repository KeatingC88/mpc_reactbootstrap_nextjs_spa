import {
    UPDATE_NETWORK_ERROR_STATE, 
    UPDATE_END_USER_PROFILE_ACCOUNT_BIRTH_DAY,
    UPDATE_END_USER_PROFILE_ACCOUNT_BIRTH_MONTH,
    UPDATE_END_USER_PROFILE_ACCOUNT_BIRTH_YEAR,
    UPDATE_END_USER_PROFILE_ACCOUNT_ETHNICITY,
    UPDATE_END_USER_PROFILE_ACCOUNT_FIRST_NAME,
    UPDATE_END_USER_PROFILE_ACCOUNT_LAST_NAME,
    UPDATE_END_USER_PROFILE_ACCOUNT_MIDDLE_NAME,
    UPDATE_END_USER_PROFILE_ACCOUNT_MAIDEN_NAME,
    UPDATE_END_USER_PROFILE_ACCOUNT_GENDER,
    JWT_CLIENT_KEY, JWT_ISSUER_KEY, CLIENT_ADDRESS,
    DEFAULT_NETWORK_ERROR_STATE,
    DEFAULT_HOST_ERROR_STATE,
} from '@Constants'

import axios from 'axios'

import type { Current_Redux_State } from '@Redux_Thunk/Combined_Reducers'
import type { AppDispatch } from '@Redux_Thunk/Provider'
import { Get_Device_Information } from '@Redux_Thunk/Actions/Misc'

export const Default_End_User_Birthdate = () => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer
    let end_user_profile = state.End_User_Profile_State_Reducer

    if (end_user_account.account_type !== 0)
        await axios.put(`/api/user/identity/birth_date/default`, {
            id: `${end_user_account.id}`,
            account_type: `${end_user_account.account_type}`,
            login_type: `${end_user_account.login_type}`,
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
            device_ram_gb: `${Get_Device_Information().deviceMemory}`,
            ethnicity: `${end_user_profile.ethnicity}`,
            first_name: `${end_user_profile.first_name}`,
            last_name: `${end_user_profile.last_name}`,
            middle_name: `${end_user_profile.middle_name}`,
            maiden_name: `${end_user_profile.maiden_name}`,
            gender: `${end_user_profile.gender}`,
        }).catch(async (error) => {

            return await new Promise((reject) => {
                error.id = `Identity-BirthDate-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })

        })

    return await new Promise((resolve) => {
        dispatch({ type: UPDATE_END_USER_PROFILE_ACCOUNT_BIRTH_DAY, payload: { birth_day: null } })
        dispatch({ type: UPDATE_END_USER_PROFILE_ACCOUNT_BIRTH_MONTH, payload: { birth_month: null } })
        dispatch({ type: UPDATE_END_USER_PROFILE_ACCOUNT_BIRTH_YEAR, payload: { birth_year: null } })
        resolve({ day: null, month: null, year: null })
    })
}

export const Change_End_User_BirthDate = (dto: {
    Month: number
    Day: number
    Year: number
}) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let end_user_profile = state.End_User_Profile_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer

    if (dto.Year > 0 && dto.Month > 0 && dto.Day > 0) {
        if (end_user_account.account_type !== 0)
            await axios.put(`/api/user/identity/birth_date/set`, {
                day: `${dto.Day}`,
                month: `${dto.Month}`,
                year: `${dto.Year}`,
                id: `${end_user_account.id}`,
                account_type: `${end_user_account.account_type}`,
                login_type: `${end_user_account.login_type}`,
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
                device_ram_gb: `${Get_Device_Information().deviceMemory}`,
                ethnicity: `${end_user_profile.ethnicity}`,
                first_name: `${end_user_profile.first_name}`,
                last_name: `${end_user_profile.last_name}`,
                middle_name: `${end_user_profile.middle_name}`,
                maiden_name: `${end_user_profile.maiden_name}`,
                gender: `${end_user_profile.gender}`,
            }).catch(async (error) => {

                return await new Promise((reject) => {
                    error.id = `Identity-BirthDate-Failed`
                    dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                    setTimeout(() => {
                        dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                        dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                    }, 1000)
                    reject(error)
                })

            })

        return await new Promise((resolve) => {
            dispatch({ type: UPDATE_END_USER_PROFILE_ACCOUNT_BIRTH_DAY, payload: { birth_day: dto.Day } })
            dispatch({ type: UPDATE_END_USER_PROFILE_ACCOUNT_BIRTH_MONTH, payload: { birth_month: dto.Month } })
            dispatch({ type: UPDATE_END_USER_PROFILE_ACCOUNT_BIRTH_YEAR, payload: { birth_year: dto.Year } })
            resolve({ day: dto.Day, month: dto.Month, year: dto.Year })
        })
    }
}

export const Change_End_User_Ethnicity = (value: string) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let end_user_profile = state.End_User_Profile_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer

    if (end_user_account.account_type !== 0)
        await axios.put(`/api/user/identity/ethnicity`, {
            ethnicity: `${value}`,
            id: `${end_user_account.id}`,
            account_type: `${end_user_account.account_type}`,
            login_type: `${end_user_account.login_type}`,
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
            device_ram_gb: `${Get_Device_Information().deviceMemory}`,
            first_name: `${end_user_profile.first_name}`,
            last_name: `${end_user_profile.last_name}`,
            middle_name: `${end_user_profile.middle_name}`,
            maiden_name: `${end_user_profile.maiden_name}`,
            gender: `${end_user_profile.gender}`,
            birth_date: `${end_user_profile.birth_month}/${end_user_profile.birth_day}/${end_user_profile.birth_year}`
        }).catch(async (error) => {

            return await new Promise((reject) => {
                error.id = `Identity-Ethnicity-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })

        })
    return await new Promise((resolve) => {
        dispatch({ type: UPDATE_END_USER_PROFILE_ACCOUNT_ETHNICITY, payload: { ethnicity: value } })
        resolve(value)
    })
}

export const Change_End_User_First_Name = (value: string) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let end_user_profile = state.End_User_Profile_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer

    if (end_user_account.account_type !== 0)
        await axios.put(`/api/user/identity/first_name`, {
            first_name: `${value}`,
            id: `${end_user_account.id}`,
            account_type: `${end_user_account.account_type}`,
            login_type: `${end_user_account.login_type}`,
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
            device_ram_gb: `${Get_Device_Information().deviceMemory}`,
            ethnicity: `${end_user_profile.ethnicity}`,
            last_name: `${end_user_profile.last_name}`,
            middle_name: `${end_user_profile.middle_name}`,
            maiden_name: `${end_user_profile.maiden_name}`,
            gender: `${end_user_profile.gender}`,
            birth_date: `${end_user_profile.birth_month}/${end_user_profile.birth_day}/${end_user_profile.birth_year}`,
        }).catch(async (error) => {

            return await new Promise((reject) => {
                error.id = `Identity-FirstName-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })

        })

    return await new Promise((resolve) => {
        dispatch({ type: UPDATE_END_USER_PROFILE_ACCOUNT_FIRST_NAME, payload: { first_name: value } })
        resolve(value)
    })
}

export const Change_End_User_Gender = (value: number) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let end_user_profile = state.End_User_Profile_State_Reducer

    let current_language_state = state.Application_Language_State_Reducer

    if (end_user_account.account_type !== 0)
        await axios.put(`/api/user/identity/gender`, {
            gender: `${value}`,
            id: `${end_user_account.id}`,
            account_type: `${end_user_account.account_type}`,
            login_type: `${end_user_account.login_type}`,
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
            device_ram_gb: `${Get_Device_Information().deviceMemory}`,
            ethnicity: `${end_user_profile.ethnicity}`,
            last_name: `${end_user_profile.last_name}`,
            middle_name: `${end_user_profile.middle_name}`,
            maiden_name: `${end_user_profile.maiden_name}`,
            first_name: `${end_user_profile.first_name}`,
            birth_date: `${end_user_profile.birth_month}/${end_user_profile.birth_day}/${end_user_profile.birth_year}`,
        }).catch(async (error) => {

            return await new Promise((reject) => {
                error.id = `Identity-Gender-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })

        })

    return await new Promise((resolve) => {
        dispatch({ type: UPDATE_END_USER_PROFILE_ACCOUNT_GENDER, payload: { gender: value } })
        resolve(value)
    })
}

export const Change_End_User_Last_Name = (value: string) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let end_user_profile = state.End_User_Profile_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer

    if (end_user_account.account_type !== 0)
        await axios.put(`/api/user/identity/last_name`, {
            last_name: `${value}`,
            id: `${end_user_account.id}`,
            account_type: `${end_user_account.account_type}`,
            login_type: `${end_user_account.login_type}`,
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
            device_ram_gb: `${Get_Device_Information().deviceMemory}`,
            ethnicity: `${end_user_profile.ethnicity}`,
            gender: `${end_user_profile.gender}`,
            middle_name: `${end_user_profile.middle_name}`,
            maiden_name: `${end_user_profile.maiden_name}`,
            first_name: `${end_user_profile.first_name}`,
            birth_date: `${end_user_profile.birth_month}/${end_user_profile.birth_day}/${end_user_profile.birth_year}`,
        }).catch( async (error) => {

            return await new Promise((reject) => {
                error.id = `Identity-LastName-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })

        })      
    
    return await new Promise((resolve) => {
        dispatch({ type: UPDATE_END_USER_PROFILE_ACCOUNT_LAST_NAME, payload: { last_name: value } })
        resolve(value)
    })
}

export const Change_End_User_Middle_Name = (value: string) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let end_user_profile = state.End_User_Profile_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer

    if (end_user_account.account_type !== 0)
        await axios.put(`/api/user/identity/middle_name`, {
            middle_name: `${value}`,
            id: `${end_user_account.id}`,
            account_type: `${end_user_account.account_type}`,
            login_type: `${end_user_account.login_type}`,
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
            device_ram_gb: `${Get_Device_Information().deviceMemory}`,
            ethnicity: `${end_user_profile.ethnicity}`,
            gender: `${end_user_profile.gender}`,
            last_name: `${end_user_profile.last_name}`,
            maiden_name: `${end_user_profile.maiden_name}`,
            first_name: `${end_user_profile.first_name}`,
            birth_date: `${end_user_profile.birth_month}/${end_user_profile.birth_day}/${end_user_profile.birth_year}`,
        }).catch( async (error) => {

            return await new Promise((reject) => {
                error.id = `Identity-MiddleName-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })

        })

    return await new Promise((resolve) => {
        dispatch({ type: UPDATE_END_USER_PROFILE_ACCOUNT_MIDDLE_NAME, payload: { middle_name: value } })
        resolve(value)            
    })

}

export const Change_End_User_Maiden_Name = (value: string) => async (dispatch: AppDispatch, getState: () => Current_Redux_State) => {

    let state = getState()
    let end_user_account = state.End_User_Account_State_Reducer
    let end_user_profile = state.End_User_Profile_State_Reducer
    let current_language_state = state.Application_Language_State_Reducer

    if (end_user_account.account_type !== 0)
        await axios.put(`/api/user/identity/maiden_name`, {
            maiden_name: `${value}`,
            id: `${end_user_account.id}`,
            account_type: `${end_user_account.account_type}`,
            login_type: `${end_user_account.login_type}`,
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
            device_ram_gb: `${Get_Device_Information().deviceMemory}`,
            ethnicity: `${end_user_profile.ethnicity}`,
            gender: `${end_user_profile.gender}`,
            last_name: `${end_user_profile.last_name}`,
            middle_name: `${end_user_profile.middle_name}`,
            first_name: `${end_user_profile.first_name}`,
            birth_date: `${end_user_profile.birth_month}/${end_user_profile.birth_day}/${end_user_profile.birth_year}`,
        }).catch(async (error) => {

            return await new Promise((reject) => {
                error.id = `Identity-MaidenNamed-Failed`
                dispatch({ type: UPDATE_NETWORK_ERROR_STATE, payload: error })
                setTimeout(() => {
                    dispatch({ type: DEFAULT_HOST_ERROR_STATE })
                    dispatch({ type: DEFAULT_NETWORK_ERROR_STATE })
                }, 1000)
                reject(error)
            })

        })

    return await new Promise((resolve) => {
        dispatch({ type: UPDATE_END_USER_PROFILE_ACCOUNT_MAIDEN_NAME, payload: { maiden_name: value } })
        resolve(value)
    })

}